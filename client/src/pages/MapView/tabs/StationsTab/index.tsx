import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import {
  Flex,
  Listbox,
  ListboxOption,
  Scrollbar,
  SearchInput,
  Text
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { useRailwayMapContext } from '@/providers/RailwayMapProvider'

import LineBadge from '../../components/LineBadge'
import StationItem from './components/SignItem'

function StationsTab() {
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

  const stations = map.stations || []
  const lines = map.lines || []

  const [query, setQuery] = useState('')
  const [lineFilter, setLineFilter] = useState<string | null>(null)

  const sorted = [...stations]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(
      s =>
        (query === '' ||
          s.name
            .replace(/\n/g, ' ')
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (lineFilter === null || s.lines.includes(lineFilter))
    )

  return (
    <>
      <Flex direction={{ base: 'column', md: 'row' }} gap="md">
        <Listbox
          minWidth="20em"
          value={lineFilter}
          onChange={setLineFilter}
          renderContent={value => {
            if (value === null) {
              return <Text truncate>All Lines</Text>
            }

            const line = lines.find(l => l.code === value)

            return (
              <Flex minWidth="0" gap="md" centered>
                <LineBadge code={value} color={line?.color ?? '#888'} />
                <Text truncate align="left">
                  {line?.name}
                </Text>
              </Flex>
            )
          }}
        >
          <ListboxOption value={null} label="All Lines" />
          {lines.map(line => (
            <ListboxOption
              key={line.code}
              value={line.code}
              label={line.name}
              renderColorAndIcon={() => (
                <Flex centered width="5em">
                  <LineBadge code={line.code} color={line.color} />
                </Flex>
              )}
            />
          ))}
        </Listbox>
        <SearchInput
          mb="lg"
          searchTarget="station"
          value={query}
          onChange={setQuery}
        />
      </Flex>
      <Scrollbar>
        <Flex direction="column" gap="sm" mb="lg" pr="sm">
          {sorted.map(station => (
            <StationItem
              key={station.id}
              station={station}
              stationSignMap={stationSignMap}
              lines={lines}
              mapId={map.id}
            />
          ))}
        </Flex>
      </Scrollbar>
    </>
  )
}

export default StationsTab
