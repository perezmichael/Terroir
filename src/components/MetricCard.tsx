import { colors, fonts, radius } from '../theme'

interface MetricCardProps {
  label: string
  value: string
  sub?: string
  accentColor?: string
}

export default function MetricCard({ label, value, sub, accentColor }: MetricCardProps) {
  return (
    <div
      style={{
        background: colors.parchment,
        borderRadius: radius.metric,
        padding: '12px 14px',
        flex: 1,
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontSize: '11px',
          color: colors.basalt,
          fontFamily: fonts.ui,
          fontWeight: 500,
          letterSpacing: '0.2px',
          marginBottom: '6px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '22px',
          fontFamily: fonts.mono,
          fontWeight: 500,
          color: accentColor || colors.obsidian,
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: '11px',
            color: colors.basalt,
            fontFamily: fonts.ui,
            marginTop: '3px',
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
