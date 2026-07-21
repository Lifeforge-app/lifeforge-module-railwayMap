import { Flex } from '@lifeforge/ui'

import type { MapStation } from '@/providers/RailwayMapProvider'

import StationListItem from './StationListItem'

function ListView({ stations }: { stations: MapStation[] }) {
  return (
    <Flex direction="column" gap="sm" mb="lg" pr="sm">
      {stations.map(station => (
        <StationListItem key={station.id} station={station} />
      ))}
    </Flex>
  )
}

export default ListView
