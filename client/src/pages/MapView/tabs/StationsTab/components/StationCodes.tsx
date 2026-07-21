import { Flex, type FlexProps } from '@lifeforge/ui'

import { getLineColor } from '@/utils/getLineColor'
import { filterStationCode } from '@/utils/filterStationCode'

import LineBadge from '../../../components/LineBadge'

function StationCodes({
  codes,
  lines,
  wrap,
  display,
  lineFilter
}: {
  codes?: string[]
  lines: { code: string; color: string }[]
  wrap?: boolean
  display?: FlexProps['display']
  lineFilter?: string | null
}) {
  if (!codes || codes.length === 0) return null

  const filtered = lineFilter
    ? filterStationCode(codes, lineFilter)
    : codes

  if (filtered.length === 0) return null

  return (
    <Flex display={display} gap="xs" wrap={wrap ? 'wrap' : undefined}>
      {filtered.map(code => (
        <LineBadge key={code} code={code} color={getLineColor(code, lines)} />
      ))}
    </Flex>
  )
}

export default StationCodes
