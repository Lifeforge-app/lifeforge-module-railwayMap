import { forgeController, forgeRouter } from '@functions/routes'
import { ClientError } from '@functions/routes/utils/response'
import z from 'zod'

import dijkstraWithTransfers from './utils/pathFinding'

const getLines = forgeController
  .query()
  .description({
    en: 'Get all railway lines',
    ms: 'Dapatkan semua laluan kereta api',
    'zh-CN': '获取所有铁路线路',
    'zh-TW': '獲取所有鐵路線路'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('railway_map__lines').execute()
  )

const getStations = forgeController
  .query()
  .description({
    en: 'Get all railway stations',
    ms: 'Dapatkan semua stesen kereta api',
    'zh-CN': '获取所有火车站',
    'zh-TW': '獲取所有火車站'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('railway_map__stations').execute()
  )

const getShortestPath = forgeController
  .query()
  .description({
    en: 'Calculate shortest route between stations',
    ms: 'Kira laluan terpendek antara stesen',
    'zh-CN': '计算站点之间的最短路线',
    'zh-TW': '計算站點之間的最短路線'
  })
  .input({
    query: z.object({
      start: z.string(),
      end: z.string()
    })
  })
  .callback(async ({ pb, query: { start, end } }) => {
    const allStations = await pb.getFullList
      .collection('railway_map__stations')
      .execute()

    if (
      ![start, end].every(station => allStations.some(s => s.id === station))
    ) {
      throw new ClientError('Invalid start or end station')
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
      throw new Error('No path found')
    }

    return path
      .map(station => allStations.find(s => s.name === station))
      .filter(s => !!s)
  })

export default forgeRouter({
  getLines,
  getStations,
  getShortestPath
})
