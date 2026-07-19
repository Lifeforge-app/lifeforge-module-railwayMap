import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import {
  Box,
  Card,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Scrollbar,
  SearchInput,
  Stack,
  Text,
  useModalStore
} from '@lifeforge/ui'

import ManageStationSignModal from '@/components/modals/ManageStationSignModal'
import { forgeAPI } from '@/manifest'
import { useRailwayMapContext } from '@/providers/RailwayMapProvider'

import LineBadge from './components/LineBadge'
import { getLineColor } from '@/utils/getLineColor'

function StationsTab() {
  const { map } = useRailwayMapContext()
  const { open } = useModalStore()

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

  const stations = map.stations || []
  const lines = map.lines || []

  const [query, setQuery] = useState('')

  const sorted = [...stations]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      s => query === '' || s.name.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <>
      <SearchInput
        mb="lg"
        searchTarget="station"
        value={query}
        onChange={setQuery}
      />
      <Scrollbar>
        <Flex direction="column" gap="sm" mb="lg" pr="sm">
          {sorted.map(station => {
            const stationCode = station.codes?.[0] || ''
            const signs = stationSignMap.get(stationCode)

            return (
              <Card key={station.id}>
                <Flex align="center" gap="md" justify="between" wrap="wrap">
                  <Flex flex="1" align="center" gap="md">
                    {signs && signs.length > 0 && (
                      <Stack width="auto">
                        {signs.map(sign => (
                          <Box
                            overflow="hidden"
                            r="sm"
                            key={sign.id}
                            width="auto"
                            height="2.5rem"
                          >
                            <img
                              alt=""
                              src={
                                forgeAPI.getMedia({
                                  collectionId: sign.collectionId,
                                  recordId: sign.id,
                                  fieldId: sign.cropped_image
                                }) || undefined
                              }
                              style={{
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>
                    )}
                    <Text
                      display="block"
                      whiteSpace="nowrap"
                      size="xl"
                      weight="medium"
                    >
                      {station.name.replace(/\\n/, ' ')}
                    </Text>
                  </Flex>
                  <Flex align="center" gap="md">
                    {station.codes && station.codes.length > 0 && (
                      <Flex gap="xs" wrap="wrap">
                        {station.codes.map(code => (
                          <LineBadge
                            key={code}
                            code={code}
                            color={getLineColor(code, lines)}
                          />
                        ))}
                      </Flex>
                    )}
                    <ContextMenu>
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
              </Card>
            )
          })}
        </Flex>
      </Scrollbar>
    </>
  )
}

export default StationsTab
