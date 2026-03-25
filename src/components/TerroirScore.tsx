import { Scores } from '../data/properties'
import { colors, fonts, radius } from '../theme'

interface TerroirScoreProps {
  scores: Scores
  primaryStrategy: 'LTR' | 'STR' | 'FLIP'
  primaryScore: number
  compact?: boolean
  showCustomize?: boolean
  onCustomize?: () => void
}

const strategyConfig = {
  LTR: { label: 'Long Term Rental', color: colors.vineyardGreen },
  STR: { label: 'Short-Term Rental', color: colors.araratHaze },
  FLIP: { label: 'Flip Potential', color: colors.sandstone },
}

const strategyOrder: Array<'LTR' | 'STR' | 'FLIP'> = ['LTR', 'STR', 'FLIP']

export default function TerroirScore({
  scores,
  primaryStrategy,
  primaryScore,
  compact = false,
  showCustomize = false,
  onCustomize,
}: TerroirScoreProps) {
  const primary = strategyConfig[primaryStrategy]
  const secondaries = strategyOrder.filter((s) => s !== primaryStrategy)

  if (compact) {
    return (
      <div style={{ padding: '12px 0 0' }}>
        {/* Label row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Terroir Score
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {secondaries.map((s) => (
              <span
                key={s}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontFamily: fonts.mono,
                  color: colors.basalt,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: strategyConfig[s].color,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {scores[s.toLowerCase() as keyof Scores]} {s}
              </span>
            ))}
          </div>
        </div>

        {/* Primary score + bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '20px',
              fontFamily: fonts.mono,
              fontWeight: 600,
              color: primary.color,
              lineHeight: 1,
              flexShrink: 0,
              minWidth: '28px',
            }}
          >
            {primaryScore}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 500, color: colors.obsidian }}>
                {primary.label}
              </span>
            </div>
            {/* Progress bar */}
            <div
              style={{
                height: '5px',
                borderRadius: '100px',
                background: colors.stone,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${primaryScore}%`,
                  borderRadius: '100px',
                  background: primary.color,
                  transition: 'width 600ms ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div
      style={{
        background: colors.parchment,
        borderRadius: radius.card,
        padding: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '15px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
          Terroir Score
        </p>
        {showCustomize && (
          <button
            onClick={onCustomize}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              fontFamily: fonts.ui,
              color: colors.grapeCrush,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            Customize →
          </button>
        )}
      </div>

      {/* Primary score */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '36px',
              fontFamily: fonts.mono,
              fontWeight: 700,
              color: primary.color,
              lineHeight: 1,
            }}
          >
            {primaryScore}
          </span>
          <span style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
            {primary.label}
          </span>
        </div>
        <div
          style={{
            height: '8px',
            borderRadius: '100px',
            background: colors.stone,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${primaryScore}%`,
              borderRadius: '100px',
              background: primary.color,
              transition: 'width 600ms ease',
            }}
          />
        </div>
      </div>

      {/* All three strategies */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {strategyOrder.map((s) => {
          const cfg = strategyConfig[s]
          const score = scores[s.toLowerCase() as keyof Scores]
          const isPrimary = s === primaryStrategy
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '130px', flexShrink: 0 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: cfg.color,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: fonts.ui,
                    color: isPrimary ? colors.obsidian : colors.basalt,
                    fontWeight: isPrimary ? 600 : 400,
                  }}
                >
                  {cfg.label}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  height: '5px',
                  borderRadius: '100px',
                  background: colors.stone,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${score}%`,
                    borderRadius: '100px',
                    background: cfg.color,
                    opacity: isPrimary ? 1 : 0.7,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: fonts.mono,
                  fontWeight: isPrimary ? 600 : 500,
                  color: isPrimary ? cfg.color : colors.basalt,
                  width: '26px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {score}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
