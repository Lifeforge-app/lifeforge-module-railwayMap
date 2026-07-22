import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import type { InferOutput } from '@lifeforge/api'
import { WithQuery, toast } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

type MapData = InferOutput<typeof forgeAPI.maps.get>
type MapLine = MapData['lines'][number]
type MapStation = MapData['stations'][number]

export type { MapLine, MapStation }

interface IRailwayMapData {
  map: MapData
  routeMapSVGRef: React.RefObject<SVGSVGElement | null>
  routeMapGRef: React.RefObject<SVGGElement | null>
  selectedStation: MapStation | null
  setSelectedStation: React.Dispatch<React.SetStateAction<MapStation | null>>
  centerStation: MapStation | undefined
}

export const RailwayMapContext = createContext<IRailwayMapData | undefined>(
  undefined
)

export default function RailwayMapProvider({
  children
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const routeMapSVGRef = useRef<SVGSVGElement>(null)
  const routeMapGRef = useRef<SVGGElement>(null)

  const [selectedStation, setSelectedStation] = useState<MapStation | null>(
    null
  )

  const mapQuery = useQuery(
    forgeAPI.maps.get.input({ id: id! }).queryOptions({ enabled: !!id })
  )

  return (
    <WithQuery
      query={mapQuery}
      onNotFound={() => {
        toast.error('Map ID not found')
        navigate(-1)
      }}
    >
      {data => {
        const stations = data.stations

        const centerStation =
          stations.length > 0
            ? stations.find(s => s.name === 'Novena') || stations[0]
            : undefined

        return (
          <RailwayMapContext
            value={{
              map: data,
              routeMapSVGRef,
              routeMapGRef,
              selectedStation,
              setSelectedStation,
              centerStation
            }}
          >
            {children}
          </RailwayMapContext>
        )
      }}
    </WithQuery>
  )
}

export function useRailwayMapContext(): IRailwayMapData {
  const context = useContext(RailwayMapContext)

  if (context === undefined) {
    throw new Error(
      'useRailwayMapContext must be used within a RailwayMapProvider'
    )
  }

  return context
}
