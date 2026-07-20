import { Flex, type FlexProps } from '@lifeforge/ui'

import { getLineColor } from '@/utils/getLineColor'

import LineBadge from '../../../../../components/LineBadge'

function StationCodes({
  codes,
  lines,
  wrap,
  display
}: {
  codes?: string[]
  lines: { code: string; color: string }[]
  wrap?: boolean
  display?: FlexProps['display']
}) {
  if (!codes || codes.length === 0) return null

  return (
    <Flex gap="xs" wrap={wrap ? 'wrap' : undefined} display={display}>
      {codes.map(code => (
        <LineBadge key={code} code={code} color={getLineColor(code, lines)} />
      ))}
    </Flex>
  )
}

export default StationCodes
