import { useQuery } from '@tanstack/react-query'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import { useState } from 'react'
import { Link } from 'react-router'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  Card,
  EmptyStateScreen,
  Flex,
  Grid,
  Icon,
  ModuleHeader,
  SearchInput,
  Text,
  WithQuery,
  useModalStore
} from '@lifeforge/ui'

import ModifyMapModal from '@/components/modals/ModifyMapModal'
import { forgeAPI } from '@/manifest'
import MapPreview from '@/pages/MapList/components/MapPreview'

countries.registerLocale(english)

function MapList() {
  const { t } = useModuleTranslation()
  const { open } = useModalStore()
  const mapsQuery = useQuery(forgeAPI.listMaps.queryOptions())
  const [query, setQuery] = useState('')

  return (
    <>
      <ModuleHeader
        actionButton={
          <Button
            display={{ base: 'none', md: 'flex' }}
            icon="tabler:plus"
            tProps={{
              item: t('items.map')
            }}
            onClick={() => open(ModifyMapModal, {})}
          >
            new
          </Button>
        }
        totalItems={mapsQuery.data?.length}
      />
      <SearchInput
        mb="lg"
        searchTarget="map"
        value={query}
        onChange={setQuery}
      />
      <WithQuery query={mapsQuery}>
        {maps =>
          maps.length > 0 ? (
            <Grid gap="md" templateCols="repeat(auto-fill, minmax(280px, 1fr))">
              {maps.map(map => (
                <Card
                  key={map.id}
                  isInteractive
                  as={Link}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                  to={`/railway-map/map/${map.id}`}
                >
                  <MapPreview lines={map.lines} stations={map.stations} />
                  <Flex align="center" gap="md">
                    <Icon icon={`circle-flags:${map.country}`} size="2.5em" />
                    <Box>
                      <Text as="p" color="primary" weight="medium">
                        {countries.getName(map.country.toUpperCase(), 'en', {
                          select: 'official'
                        })}
                      </Text>
                      <Text as="p" size="lg" weight="medium">
                        {map.name}
                      </Text>
                      <Text as="p" color="muted">
                        {t('misc.counts', {
                          lineCount: map.lineCount,
                          stationCount: map.stationCount
                        })}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              ))}
            </Grid>
          ) : (
            <EmptyStateScreen
              icon="tabler:map-off"
              message={{
                id: 'map'
              }}
            />
          )
        }
      </WithQuery>
    </>
  )
}

export default MapList
