import { execFile } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import z from 'zod'

import forge from '../forge'
import schema from '../schema'

function validateCoords(
  coords: { x: number; y: number }[],
  imgW: number,
  imgH: number
): string | null {
  for (const p of coords) {
    if (p.x < 0 || p.x > imgW || p.y < 0 || p.y > imgH) {
      return 'Points must be within image bounds'
    }
  }

  const cross = (o: number, a: number, b: number) =>
    (coords[a].x - coords[o].x) * (coords[b].y - coords[o].y) -
    (coords[a].y - coords[o].y) * (coords[b].x - coords[o].x)

  const signs = [cross(0, 1, 2), cross(1, 2, 3), cross(2, 3, 0), cross(3, 0, 1)]
  const pos = signs.every(s => s > 0)
  const neg = signs.every(s => s < 0)

  if (!pos && !neg) {
    return 'Points must form a convex quadrilateral'
  }

  const area = Math.abs(
    (coords[0].x * coords[1].y -
      coords[1].x * coords[0].y +
      coords[1].x * coords[2].y -
      coords[2].x * coords[1].y +
      coords[2].x * coords[3].y -
      coords[3].x * coords[2].y +
      coords[3].x * coords[0].y -
      coords[0].x * coords[3].y) /
      2
  )

  if (area < imgW * imgH * 0.01) {
    return 'Selected area is too small'
  }

  return null
}

function dist(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
}

async function applyPerspectiveCorrection(
  srcPath: string,
  coords: {
    topLeft: { x: number; y: number }
    topRight: { x: number; y: number }
    bottomRight: { x: number; y: number }
    bottomLeft: { x: number; y: number }
  }
): Promise<{ croppedBuf: Buffer; imgW: number; imgH: number }> {
  const identifyResult = await new Promise<{ stdout: string }>(
    (resolve, reject) => {
      execFile(
        'magick',
        ['identify', '-format', '%w %h', srcPath],
        (err, stdout) => {
          if (err) reject(err)
          else resolve({ stdout })
        }
      )
    }
  )

  const [imgW, imgH] = identifyResult.stdout.trim().split(' ').map(Number) as [
    number,
    number
  ]

  const dstW = 512

  const srcWidth =
    (dist(coords.topLeft, coords.topRight) +
      dist(coords.bottomLeft, coords.bottomRight)) /
    2
  const srcHeight =
    (dist(coords.topLeft, coords.bottomLeft) +
      dist(coords.topRight, coords.bottomRight)) /
    2

  const dstH = Math.max(
    1,
    Math.round(dstW * (srcHeight / Math.max(1, srcWidth)))
  )

  const outputPath = path.join(
    os.tmpdir(),
    `railway-sign-cropped-${Date.now()}.png`
  )

  const perspectiveArgs = [
    `${coords.topLeft.x},${coords.topLeft.y} 0,0`,
    `${coords.topRight.x},${coords.topRight.y} ${dstW - 1},0`,
    `${coords.bottomRight.x},${coords.bottomRight.y} ${dstW - 1},${dstH - 1}`,
    `${coords.bottomLeft.x},${coords.bottomLeft.y} 0,${dstH - 1}`
  ]

  await new Promise<void>((resolve, reject) => {
    execFile(
      'magick',
      [
        srcPath,
        '-set',
        'option:distort:viewport',
        `${dstW}x${dstH}+0+0`,
        '-distort',
        'Perspective',
        perspectiveArgs.join(' '),
        '-strip',
        outputPath
      ],
      err => {
        if (err) reject(err)
        else resolve()
      }
    )
  })

  const croppedBuf = fs.readFileSync(outputPath)

  fs.unlinkSync(outputPath)

  return { croppedBuf, imgW, imgH }
}

export const upload = forge
  .mutation({
    description: 'Upload station sign photo with perspective correction',
    media: { image: { optional: false } },
    input: {
      body: z.object({
        station_code: z.string().min(1),
        coords: z.object({
          topLeft: z.object({ x: z.number(), y: z.number() }),
          topRight: z.object({ x: z.number(), y: z.number() }),
          bottomRight: z.object({ x: z.number(), y: z.number() }),
          bottomLeft: z.object({ x: z.number(), y: z.number() })
        })
      })
    },
    output: {
      CREATED: schema.station_sign_collection,
      BAD_REQUEST: z.string()
    }
  })
  .callback(
    async ({
      pb,
      body: { station_code, coords },
      media: { image },
      response
    }) => {
      if (!image || typeof image === 'string') {
        return response.badRequest('Image is required')
      }

      const { croppedBuf, imgW, imgH } = await applyPerspectiveCorrection(
        image.path,
        coords
      )

      const srcPoints = [
        coords.topLeft,
        coords.topRight,
        coords.bottomRight,
        coords.bottomLeft
      ]

      const validationError = validateCoords(srcPoints, imgW, imgH)

      if (validationError) {
        fs.unlinkSync(image.path)

        return response.badRequest(validationError)
      }

      const srcBuf = fs.readFileSync(image.path)

      const croppedFile = new File([croppedBuf as any], 'cropped.png', {
        type: 'image/png'
      })
      const originalFile = new File([srcBuf], image.originalname, {
        type: image.mimetype
      })

      const record = await pb.create
        .collection('station_sign_collection')
        .data({
          station_code,
          image: originalFile,
          cropped_image: croppedFile,
          crop_coords: coords
        })
        .execute()

      fs.unlinkSync(image.path)

      return response.created(record)
    }
  )

export const update = forge
  .mutation({
    description: 'Update station sign with new perspective coords',
    media: { image: { optional: false } },
    input: {
      query: z.object({ id: z.string() }),
      body: z.object({
        coords: z.object({
          topLeft: z.object({ x: z.number(), y: z.number() }),
          topRight: z.object({ x: z.number(), y: z.number() }),
          bottomRight: z.object({ x: z.number(), y: z.number() }),
          bottomLeft: z.object({ x: z.number(), y: z.number() })
        })
      })
    },
    existenceCheck: { query: { id: 'station_sign_collection' } },
    output: {
      CREATED: schema.station_sign_collection,
      BAD_REQUEST: z.string(),
      NOT_FOUND: true
    }
  })
  .callback(
    async ({
      pb,
      query: { id },
      body: { coords },
      media: { image },
      response
    }) => {
      if (!image || typeof image === 'string') {
        return response.badRequest('Image is required')
      }

      const { croppedBuf, imgW, imgH } = await applyPerspectiveCorrection(
        image.path,
        coords
      )

      const srcPoints = [
        coords.topLeft,
        coords.topRight,
        coords.bottomRight,
        coords.bottomLeft
      ]

      const validationError = validateCoords(srcPoints, imgW, imgH)

      if (validationError) {
        fs.unlinkSync(image.path)

        return response.badRequest(validationError)
      }

      const srcBuf = fs.readFileSync(image.path)

      const croppedFile = new File([croppedBuf as any], 'cropped.png', {
        type: 'image/png'
      })
      const originalFile = new File([srcBuf], image.originalname, {
        type: image.mimetype
      })

      const record = await pb.update
        .collection('station_sign_collection')
        .id(id)
        .data({
          image: originalFile,
          cropped_image: croppedFile,
          crop_coords: coords
        })
        .execute()

      fs.unlinkSync(image.path)

      return response.created(record)
    }
  )

export const remove = forge
  .mutation({
    description: 'Delete a station sign',
    input: {
      query: z.object({ id: z.string() })
    },
    existenceCheck: { query: { id: 'station_sign_collection' } },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    await pb.delete.collection('station_sign_collection').id(id).execute()

    return response.noContent()
  })

export const list = forge
  .query({
    description: 'Get all station signs',
    output: {
      OK: z.array(schema.station_sign_collection)
    }
  })
  .callback(async ({ pb, response }) =>
    response.ok(
      await pb.getFullList.collection('station_sign_collection').execute()
    )
  )
