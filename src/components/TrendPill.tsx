import { colors, fonts } from '../theme'

interface TrendPillProps {
  value: number | string
  positive?: boolean
  suffix?: string
}

export default function TrendPill({ value, positive, suffix = '%' }: TrendPillProps) {
  const isPositive = positive !== undefined ? positive : Number(value) >= 0
  const displayVal = typeof value === 'number' ? `${Math.abs(value)}${suffix}` : value

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: isPositive ? colors.positiveBg : colors.negativeBg,
        color: isPositive ? colors.positiveText : colors.negativeText,
        fontSize: '12px',
        padding: '3px 8px',
        borderRadius: '100px',
        fontFamily: fonts.mono,
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {isPositive ? '↑' : '↓'} {displayVal}
    </span>
  )
}
