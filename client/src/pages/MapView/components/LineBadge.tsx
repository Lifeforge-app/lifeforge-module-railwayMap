import tinycolor from 'tinycolor2'

import { COLORS } from '@lifeforge/ui'

function LineBadge({ code, color }: { code: string; color: string }) {
  return (
    <svg
      height={26}
      style={{ display: 'inline-block', overflow: 'visible' }}
      width={Math.max(28, code.length * 8.4 + 16) + 4}
    >
      <path
        d={(() => {
          const w = Math.max(28, code.length * 8.4 + 16)
          const h = 22
          const r = 4.0
          const d = 1.6
          const x = 2
          const y = 2

          return `M ${x + r},${y} L ${x + w - r},${y} C ${x + w + d},${y}, ${x + w + d},${y + h}, ${x + w - r},${y + h} L ${x + r},${y + h} C ${x - d},${y + h}, ${x - d},${y}, ${x + r},${y} Z`
        })()}
        fill={color}
      />
      <text
        dominantBaseline="middle"
        fill={
          tinycolor(color).isDark() ? COLORS['bg-100'] : COLORS['bg-800']
        }
        fontFamily="LTAIdentityMedium"
        fontSize="12px"
        textAnchor="middle"
        x={Math.max(28, code.length * 8.4 + 16) / 2 + 2}
        y={14.2}
      >
        {code}
      </text>
    </svg>
  )
}

export default LineBadge
