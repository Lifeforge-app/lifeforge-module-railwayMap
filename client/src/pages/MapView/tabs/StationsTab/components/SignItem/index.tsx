import type { InferOutput } from '@lifeforge/api'
import {
  Card,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Text,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import EditStationNameModal from '@/pages/MapView/components/EditStationNameModal'
import ManageStationSignModal from '@/pages/MapView/components/ManageStationSignModal'
import type { MapStation } from '@/providers/RailwayMapProvider'

import SignImages from './components/SignImages'
import StationCodes from './components/StationCodes'

type StationSign = InferOutput<typeof forgeAPI.signs.list>[number]

function StationItem({
  station,
  stationSignMap,
  lines,
  mapId
}: {
  station: MapStation
  stationSignMap: Map<string, StationSign[]>
  lines: { code: string; color: string }[]
  mapId: string
}) {
  const { open } = useModalStore()

  const signs = (station.codes ?? []).flatMap(
    code => stationSignMap.get(code) ?? []
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

export default StationItem
