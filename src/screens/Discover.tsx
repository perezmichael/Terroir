import { colors, fonts, spacing, radius } from '../theme'

export default function Discover() {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        background: colors.warmWhite,
        paddingTop: 'max(env(safe-area-inset-top), 48px)',
        paddingBottom: '88px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ padding: `0 ${spacing.pagePad}px`, marginBottom: '0' }}>
        <h1 style={{ fontSize: '24px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark }}>
          Discover
        </h1>
      </div>

      {/* Main empty state */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 32px 64px',
          textAlign: 'center',
        }}
      >
        {/* Illustration */}
        <div style={{ marginBottom: '28px', position: 'relative' }}>
          {/* Outer ring */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: colors.parchment,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, rgba(122,59,78,0.12), rgba(90,124,82,0.12))`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={colors.grapeCrush} strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" fill={colors.grapeCrush} />
                <path
                  d="M12 3V5.5M12 18.5V21M3 12H5.5M18.5 12H21"
                  stroke={colors.grapeCrush}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.34 6.34L8.11 8.11M15.89 15.89L17.66 17.66M6.34 17.66L8.11 15.89M15.89 8.11L17.66 6.34"
                  stroke={colors.sandstone}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Floating accent dots */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '-4px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: colors.sandstone,
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '-8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.araratHaze,
              opacity: 0.6,
            }}
          />
        </div>

        <h2
          style={{
            fontSize: '20px',
            fontFamily: fonts.ui,
            fontWeight: 700,
            color: colors.vineyardDark,
            marginBottom: '12px',
            lineHeight: 1.3,
          }}
        >
          Market Intelligence
          <br />Coming Soon
        </h2>

        <p
          style={{
            fontSize: '14px',
            fontFamily: fonts.ui,
            color: colors.basalt,
            lineHeight: 1.65,
            maxWidth: '290px',
          }}
        >
          Browse MLS listings, find comps near your properties, and discover Grand Cru opportunities in your target markets.
        </p>

        {/* Feature preview chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '28px', maxWidth: '320px' }}>
          {['MLS Listings', 'Comp Analysis', 'Deal Score', 'Neighborhood Data', 'Grand Cru Finder'].map((feat) => (
            <span
              key={feat}
              style={{
                padding: '7px 14px',
                borderRadius: '100px',
                background: colors.parchment,
                border: `1px solid ${colors.stone}`,
                fontSize: '13px',
                fontFamily: fonts.ui,
                color: colors.basalt,
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Notify CTA */}
        <button
          style={{
            marginTop: '32px',
            padding: '14px 32px',
            borderRadius: '100px',
            background: colors.vineyardDark,
            border: 'none',
            color: '#F8F5F0',
            fontSize: '15px',
            fontFamily: fonts.ui,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.2px',
          }}
        >
          Notify me when it's ready
        </button>
      </div>

      {/* Bottom teaser */}
      <div
        style={{
          margin: '0 16px 16px',
          background: colors.parchment,
          borderRadius: radius.card,
          padding: '16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.grapeCrush}, ${colors.araratHaze})`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          ✦
        </div>
        <div>
          <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px' }}>
            3 Grand Cru deals near your LA properties
          </p>
          <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui }}>
            Available when Discover launches
          </p>
        </div>
      </div>
    </div>
  )
}
