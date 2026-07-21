import { Grid } from '@lifeforge/ui'

import type { MapStation } from '@/providers/RailwayMapProvider'

import StationGridItem from './StationGridItem'

function GridView({ stations }: { stations: MapStation[] }) {
  return (
    <Grid
      as="ul"
      gap="md"
      mb="lg"
      pr="sm"
      templateCols={{
        base: 1,
        sm: 2,
        lg: 3,
        xl: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}
    >
      {stations.map(station => (
        <StationGridItem key={station.id} station={station} />
      ))}
    </Grid>
  )
}

export default GridView
