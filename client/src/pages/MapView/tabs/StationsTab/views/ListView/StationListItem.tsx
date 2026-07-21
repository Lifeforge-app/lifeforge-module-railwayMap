import {
  Card,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Text,
  useModalStore
} from '@lifeforge/ui'

import EditStationNameModal from '@/pages/MapView/components/EditStationNameModal'
import ManageStationSignModal from '@/pages/MapView/components/ManageStationSignModal'
import type { MapStation } from '@/providers/RailwayMapProvider'
import useFilter from '../../hooks/useFilter'
import { useStationsTabContext } from '../../contexts/StationsTabContext'
import SignImages from '../../components/SignImages'
import StationCodes from '../../components/StationCodes'

function StationListItem({ station }: { station: MapStation }) {
  const { open } = useModalStore()
  const { stationSignMap, lines, mapId } = useStationsTabContext()
  const { line: lineFilter } = useFilter()

  const signs = (station.codes ?? []).flatMap(
    code =>
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
    <Card key={station.id}>
      <Flex minWidth="0" align="center" gap="md" justify="between">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          minWidth="0"
          flex="1"
          align={{ base: 'start', md: 'center' }}
          gap="md"
        >
          {signs.length > 0 && (
            <SignImages
              hasMaxWidth
              signs={signs}
              lines={lines}
              display={{ md: 'flex', base: 'none' }}
            />
          )}
          <StationCodes
            display={{ base: 'flex', md: 'none' }}
            codes={station.codes}
            lines={lines}
            lineFilter={lineFilter}
          />
          <Text truncate display="block" size="xl" weight="medium">
            {station.name.replace(/\\n/g, ' ')}
          </Text>
        </Flex>
        <Flex align="center" gap="md">
          <StationCodes
            display={{ base: 'none', md: 'flex' }}
            codes={station.codes}
            lines={lines}
            lineFilter={lineFilter}
          />
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
      </Flex>
      {signs.length > 0 && (
        <SignImages
          signs={signs}
          lines={lines}
          mt="md"
          display={{ md: 'none', base: 'flex' }}
        />
      )}
    </Card>
  )
}

export default StationListItem
