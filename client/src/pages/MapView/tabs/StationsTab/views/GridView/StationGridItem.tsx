import {
  Card,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Stack,
  Text,
  useModalStore
} from '@lifeforge/ui'

import EditStationNameModal from '@/pages/MapView/components/EditStationNameModal'
import ManageStationSignModal from '@/pages/MapView/components/ManageStationSignModal'
import type { MapStation } from '@/providers/RailwayMapProvider'
import useFilter from '../../hooks/useFilter'

import SignImages from '../../components/SignImages'
import StationCodes from '../../components/StationCodes'
import { useStationsTabContext } from '../../contexts/StationsTabContext'

function StationGridItem({ station }: { station: MapStation }) {
  const { open } = useModalStore()
  const { stationSignMap, lines, mapId } = useStationsTabContext()
  const { line: lineFilter } = useFilter()

  const signs = (station.codes ?? []).flatMap(code =>
    (stationSignMap.get(code) ?? []).filter(s => {
      if (!lineFilter) return true

      const cleanCode = s.station_code.split(/\d/)[0].toLowerCase()
      const cleanFilter = lineFilter.toLowerCase()
      return (
        cleanCode.startsWith(cleanFilter) || cleanFilter.startsWith(cleanCode)
      )
    })
  )

  return (
    <Card as="li" direction="column" minWidth="0" gap="sm">
      <Flex minWidth="0" align="center" gap="md" justify="between">
        <Stack>
          <StationCodes codes={station.codes} lines={lines} wrap lineFilter={lineFilter} />
          <Text truncate display="block" size="lg" weight="medium">
            {station.name.replace(/\\n/g, ' ')}
          </Text>
        </Stack>
        <ContextMenu>
          <ContextMenuItem
            icon="tabler:pencil"
            label="rename"
            onClick={() =>
              open(EditStationNameModal, {
                mapId,
                station
              })
            }
          />
          <ContextMenuItem
            icon="tabler:sign-right"
            label="manage signs"
            onClick={() =>
              open(ManageStationSignModal, {
                stationCodes: station.codes || [],
                lines
              })
            }
          />
        </ContextMenu>
      </Flex>
      {signs.length > 0 && <SignImages signs={signs} lines={lines} mt="sm" />}
    </Card>
  )
}

export default StationGridItem
