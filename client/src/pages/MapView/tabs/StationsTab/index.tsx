import { useState } from 'react'

import { Card, Flex, Scrollbar, SearchInput, Text } from '@lifeforge/ui'

import { useRailwayMapContext } from '@/providers/RailwayMapProvider'

import LineBadge from './components/LineBadge'

function getLineColor(
  code: string,
  lines: { code: string; color: string }[]
): string | undefined {
  const cleanStationCode = code.split(/\d/)[0].toLowerCase()

  const line = lines.find(l => {
    const cleanLineCode = l.code.split(/\d/)[0].toLowerCase()

    return (
      cleanLineCode.startsWith(cleanStationCode) ||
      cleanStationCode.startsWith(cleanLineCode)
    )
  })

  return line?.color
}

function StationsTab() {
  const { map } = useRailwayMapContext()

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
          {sorted.map(station => (
            <Card key={station.id}>
              <Flex align="center" gap="md" justify="between" wrap="wrap">
                <Text size="lg" weight="medium">
                  {station.name.replace(/\\n/, ' ')}
                </Text>
                {station.codes && station.codes.length > 0 && (
                  <Flex gap="xs" wrap="wrap">
                    {station.codes.map(code => (
                      <LineBadge
                        key={code}
                        code={code}
                        color={getLineColor(code, lines) || '#666'}
                      />
                    ))}
                  </Flex>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      </Scrollbar>
    </>
  )
}

export default StationsTab
