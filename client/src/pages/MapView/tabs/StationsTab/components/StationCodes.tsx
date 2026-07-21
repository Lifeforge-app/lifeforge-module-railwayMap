import { Flex, type FlexProps } from '@lifeforge/ui'

import { getLineColor } from '@/utils/getLineColor'

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
    ? codes.filter(code => {
        const cleanCode = code.split(/\d/)[0].toLowerCase()
        const cleanFilter = lineFilter.split(/\d/)[0].toLowerCase()
        return (
          cleanCode.startsWith(cleanFilter) || cleanFilter.startsWith(cleanCode)
        )
      })
    : codes

  if (filtered.length === 0) return null

  return (
    <Flex gap="xs" wrap={wrap ? 'wrap' : undefined} display={display}>
      {filtered.map(code => (
        <LineBadge key={code} code={code} color={getLineColor(code, lines)} />
      ))}
    </Flex>
  )
}

export default StationCodes
