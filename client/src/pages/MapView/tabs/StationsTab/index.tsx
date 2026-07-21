import { useMemo } from 'react'

import {
  Flex,
  Listbox,
  ListboxOption,
  Scrollbar,
  SearchInput,
  Text,
  createViewMode
} from '@lifeforge/ui'

import { useRailwayMapContext } from '@/providers/RailwayMapProvider'
import useFilter from './hooks/useFilter'

import LineBadge from '../../components/LineBadge'
import {
  StationsTabProvider,
  useStationsTabContext
} from './contexts/StationsTabContext'
import GridView from './views/GridView'
import ListView from './views/ListView'

export const ViewMode = createViewMode({
  modes: [
    { icon: 'tabler:list', value: 'list' },
    { icon: 'tabler:grid-dots', value: 'grid' }
  ]
})

function StationsTabContent() {
  const { map } = useRailwayMapContext()
  const { lines } = useStationsTabContext()
  const { searchQuery, setSearchQuery, line: lineFilter, sort, updateFilter } = useFilter()

  const sorted = useMemo(() => {
    const stations = map.stations || []

    return [...stations]
      .sort((a, b) => {
        if (sort === 'code') {
          const aCode = a.codes?.[0] ?? ''
          const bCode = b.codes?.[0] ?? ''
          const [, aLetters = '', aNumStr = ''] = aCode.match(/^([A-Za-z]+)(\d*)/) ?? []
          const [, bLetters = '', bNumStr = ''] = bCode.match(/^([A-Za-z]+)(\d*)/) ?? []
          const letterCompare = aLetters.localeCompare(bLetters)
          if (letterCompare !== 0) return letterCompare
          return (parseInt(aNumStr) || 0) - (parseInt(bNumStr) || 0)
        }
        return a.name.localeCompare(b.name)
      })
      .filter(
        s =>
          (searchQuery === '' ||
            s.name
              .replace(/\n/g, ' ')
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (lineFilter === '' || s.lines.includes(lineFilter))
      )
  }, [map.stations, searchQuery, lineFilter, sort])

  return (
    <ViewMode.Root>
      <Flex mb="lg" direction={{ base: 'column', md: 'row' }} gap="md">
        <Listbox
          minWidth="20em"
          value={lineFilter || null}
          onChange={value => updateFilter('line', value ?? '')}
          renderContent={value => {
            if (value === null || value === '') {
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
        <Listbox
          minWidth="12em"
          value={sort}
          onChange={value => updateFilter('sort', value)}
        >
          <ListboxOption value="name" label="Name" />
          <ListboxOption value="code" label="Station Code" />
        </Listbox>
        <SearchInput
          flex="1"
          searchTarget="station"
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <ViewMode.Selector />
      </Flex>
      <Scrollbar>
        <ViewMode.When mode="list">
          <ListView stations={sorted} />
        </ViewMode.When>
        <ViewMode.When mode="grid">
          <GridView stations={sorted} />
        </ViewMode.When>
      </Scrollbar>
    </ViewMode.Root>
  )
}

function StationsTab() {
  return (
    <StationsTabProvider>
      <StationsTabContent />
    </StationsTabProvider>
  )
}

export default StationsTab
