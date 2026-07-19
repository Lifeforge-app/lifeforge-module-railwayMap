import { useQuery } from '@tanstack/react-query'

import type { InferOutput } from '@lifeforge/api'
import {
  Box,
  Button,
  EmptyStateScreen,
  Flex,
  ModalHeader,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import SignItem from './components/SignItem'
import UploadStationSignModal from './components/UploadStationSignModal'

export type Sign = InferOutput<typeof forgeAPI.signs.list>[number]

function ManageStationSignModal({
  onClose,
  data: { stationCodes, lines }
}: {
  onClose: () => void
  data: {
    stationCodes: string[]
    lines: { code: string; color: string }[]
  }
}) {
  const { open } = useModalStore()

  const signsQuery = useQuery(forgeAPI.signs.list.queryOptions())

  const signs =
    signsQuery.data?.filter(s => stationCodes.includes(s.station_code)) || []

  return (
    <Box minWidth="50vw">
      <ModalHeader
        headerActions={
          <Button
            icon="tabler:plus"
            variant="plain"
            onClick={() => {
              open(UploadStationSignModal, { stationCodes, lines })
            }}
          />
        }
        icon="tabler:sign-right"
        title="Manage Station Signs"
        onClose={onClose}
      />
      {signs.length > 0 ? (
        <Flex direction="column" gap="sm" mb="lg">
          {signs.map(sign => (
            <SignItem key={sign.id} lines={lines} sign={sign} />
          ))}
        </Flex>
      ) : (
        <Box py="lg">
          <EmptyStateScreen
            icon="tabler:photo-off"
            message={{
              id: 'sign'
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ManageStationSignModal
