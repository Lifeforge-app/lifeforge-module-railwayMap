import { Card } from '@lifeforge/ui'

import { useRailwayMapContext } from '@/providers/RailwayMapProvider'

import { useRailwayMapRenderer } from './hooks/useRailwayMapRenderer'

export default function MapTab() {
  const {
    routeMapSVGRef: svgRef,
    routeMapGRef: gRef,
    setSelectedStation
  } = useRailwayMapContext()

  useRailwayMapRenderer()

  const handleMapClick = () => {
    setSelectedStation(null)
  }

  return (
    <Card height="100%" mb="lg">
      <svg
        ref={svgRef}
        height="100%"
        style={{ touchAction: 'none', userSelect: 'none' }}
        width="100%"
        onClick={handleMapClick}
      >
        <g ref={gRef}></g>
      </svg>
    </Card>
  )
}
