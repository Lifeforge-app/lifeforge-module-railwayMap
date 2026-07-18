import z from 'zod'

import {
  createForge,
  forgeRouter,
  writeContractFileToClient
} from '@lifeforge/server-utils'

import schema from './schema'

const forge = createForge(schema)

const lineSchema = z.object({
  color: z.string(),
  name: z.string(),
  code: z.string(),
  path: z.array(z.array(z.number()))
})

const stationSchema = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  name: z.string(),
  lines: z.array(z.string()),
  type: z.enum(['station', 'interchange']),
  codes: z.array(z.string()).optional(),
  textOffsetX: z.number().optional(),
  textOffsetY: z.number().optional(),
  textAnchor: z.string().optional()
})

export const listMaps = forge
  .query({
    description: 'Get all railway maps',
    output: {
      OK: z.array(
        schema.map.pick({ id: true, name: true, country: true }).extend({
          lineCount: z.number(),
          stationCount: z.number(),
          lines: z.array(lineSchema),
          stations: z.array(stationSchema)
        })
      )
    }
  })
  .callback(async ({ pb, response }) =>
    response.ok(
      (await pb.getFullList.collection('map').sort(['name']).execute()).map(
        e => ({
          id: e.id,
          name: e.name,
          country: e.country,
          lineCount: e.lines.length,
          stationCount: e.stations.length,
          lines: e.lines as any,
          stations: e.stations as any
        })
      )
    )
  )

export const getMap = forge
  .query({
    description: 'Get railway map data by id',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: {
        id: 'map'
      }
    },
    output: {
      OK: schema.map
        .omit({
          lines: true,
          stations: true
        })
        .extend({
          lines: z.array(lineSchema),
          stations: z.array(stationSchema)
        }),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const map = await pb.getOne.collection('map').id(id).execute()

    return response.ok(map as any)
  })

export const createMap = forge
  .mutation({
    description: 'Create a new railway map',
    input: {
      body: z.object({
        name: z.string().min(1),
        country: z.string().min(1),
        lines: z.array(lineSchema),
        stations: z.array(stationSchema)
      })
    },
    output: {
      CREATED: schema.map
    }
  })
  .callback(
    async ({ pb, body: { name, country, lines, stations }, response }) =>
      response.created(
        await pb.create
          .collection('map')
          .data({ name, country, lines, stations })
          .execute()
      )
  )

const routes = forgeRouter({
  listMaps,
  getMap,
  createMap
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
