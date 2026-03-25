import { fonts } from '../theme'

interface GrandCruBadgeProps {
  size?: 'sm' | 'md'
}

export default function GrandCruBadge({ size = 'md' }: GrandCruBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'linear-gradient(135deg, #7A3B4E, #9E5A6E)',
        color: '#F8F5F0',
        fontSize: size === 'sm' ? '10px' : '11px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        padding: size === 'sm' ? '3px 8px' : '4px 12px',
        borderRadius: '100px',
        fontFamily: fonts.ui,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
      }}
    >
      ✦ Grand Cru
    </span>
  )
}
