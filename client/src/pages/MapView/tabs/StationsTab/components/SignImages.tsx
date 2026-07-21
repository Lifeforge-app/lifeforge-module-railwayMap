import type { InferOutput } from '@lifeforge/api'
import { Box, Flex, type FlexProps, Stack } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import { getLineColor } from '@/utils/getLineColor'

type SignImage = InferOutput<typeof forgeAPI.signs.list>[number]

function SignImages({
  signs,
  lines,
  hasMaxWidth,
  ...stackProps
}: {
  signs: SignImage[]
  lines: { code: string; color: string }[]
  hasMaxWidth?: boolean
} & FlexProps) {
  return (
    <Stack width="auto" {...stackProps}>
      {signs.map(sign => (
        <Flex
          gap="sm"
          key={sign.id}
          width={hasMaxWidth ? 'auto' : '100%'}
          maxWidth={hasMaxWidth ? '24em' : undefined}
          minHeight="2.5rem"
        >
          <Box
            r="full"
            width="4px"
            style={{
              backgroundColor: getLineColor(sign.station_code, lines),
              alignSelf: 'stretch'
            }}
          />
          <Box
            style={{
              alignSelf: 'stretch'
            }}
            r="sm"
            width="100%"
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
        </Flex>
      ))}
    </Stack>
  )
}

export default SignImages
