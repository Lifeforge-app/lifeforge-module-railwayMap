import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useMemo } from 'react'

import { forgeAPI } from '@/manifest'
import { useRailwayMapContext } from '@/providers/RailwayMapProvider'

interface StationsTabContextValue {
  stationSignMap: Map<string, MapStationSign[]>
  lines: { code: string; color: string; name: string }[]
  mapId: string
}

type MapStationSign = NonNullable<
  ReturnType<typeof forgeAPI.signs.list.queryOptions>['queryKey']
>[number] extends infer T
  ? T
  : never

const StationsTabContext = createContext<StationsTabContextValue | null>(null)

export function StationsTabProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { map } = useRailwayMapContext()

  const signsQuery = useQuery(forgeAPI.signs.list.queryOptions())

  const stationSignMap = useMemo(() => {
    const signs = signsQuery.data || []
    const map = new Map<string, typeof signs>()

    for (const s of signs) {
      const existing = map.get(s.station_code) || []
      existing.push(s)
      map.set(s.station_code, existing)
    }

    return map
  }, [signsQuery.data])

  const lines = map.lines || []
  const mapId = map.id

  return (
    <StationsTabContext
      value={{ stationSignMap, lines, mapId }}
    >
      {children}
    </StationsTabContext>
  )
}

export function useStationsTabContext() {
  const ctx = useContext(StationsTabContext)
  if (!ctx) {
    throw new Error(
      'useStationsTabContext must be used within a StationsTabProvider'
    )
  }
  return ctx
}
