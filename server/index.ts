import z from 'zod'

import {
  createForge,
  forgeRouter,
  writeContractFileToClient
} from '@lifeforge/server-utils'

import schema from './schema'
import dijkstraWithTransfers from './utils/pathFinding'

const forge = createForge(schema)

export const getLines = forge
  .query({
    description: 'Get all railway lines',
    output: {
      OK: z.array(schema.lines)
    }
  })
  .callback(async ({ pb, response }) =>
    response.ok(await pb.getFullList.collection('lines').execute())
  )

export const getStations = forge
  .query({
    description: 'Get all railway stations',
    output: {
      OK: z.array(schema.stations)
    }
  })
  .callback(async ({ pb, response }) =>
    response.ok(await pb.getFullList.collection('stations').execute())
  )

export const getShortestPath = forge
  .query({
    description: 'Calculate shortest route between stations',
    input: {
      query: z.object({
        start: z.string(),
        end: z.string()
      })
    },
    output: {
      OK: z.array(schema.stations),
      BAD_REQUEST: z.string(),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { start, end }, response }) => {
    const allStations = await pb.getFullList.collection('stations').execute()

    if (
      ![start, end].every(station => allStations.some(s => s.id === station))
    ) {
      return response.badRequest('Invalid start or end station')
    }

    const graphWithWeight = allStations.reduce<
      Record<string, Record<string, number>>
    >((acc, station) => {
      if (!station.distances) return acc
      acc[station.name] = Object.fromEntries(
        Object.entries(station.distances).map(([name, distance]) => [
          name,
          distance
        ])
      ) as Record<string, number>

      return acc
    }, {})

    const lines = allStations.reduce<Record<string, string[]>>(
      (acc, station) => {
        acc[station.name] = station.lines ?? []

        return acc
      },
      {}
    )

    const path = dijkstraWithTransfers(
      graphWithWeight,
      lines,
      allStations.find(s => s.id === start)?.name ?? '',
      allStations.find(s => s.id === end)?.name ?? ''
    )

    if (!path) {
      return response.notFound()
    }

    return response.ok(
      path
        .map(station => allStations.find(s => s.name === station))
        .filter(s => !!s)
    )
  })

const routes = forgeRouter({
  getLines,
  getStations,
  getShortestPath
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
