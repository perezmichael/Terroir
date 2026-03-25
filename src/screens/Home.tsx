import { colors, fonts, spacing, radius } from '../theme'
import {
  properties,
  portfolioHistory,
  marketAlerts,
  formatCurrency,
  getTotalValue,
  getTotalMonthlyIncome,
  getAvgCapRate,
  getAvgOccupancy,
  getPortfolioTerroirScore,
  MarketAlert,
} from '../data/properties'
import GrandCruBadge from '../components/GrandCruBadge'
import TrendPill from '../components/TrendPill'
import MetricCard from '../components/MetricCard'
import Sparkline from '../components/Sparkline'

const grandCruSpotlight = properties.find((p) => p.isGrandCru && p.id === 'normandie')!

function AlertIcon({ type }: { type: MarketAlert['type'] }) {
  const iconStyle = { flexShrink: 0 }
  switch (type) {
    case 'listing':
      return (
        <svg {...iconStyle} width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke={colors.vineyardGreen} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    case 'price':
      return (
        <svg {...iconStyle} width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={colors.negativeText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'legislative':
      return (
        <svg {...iconStyle} width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke={colors.araratHaze} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14 2V8H20M8 13H16M8 17H12" stroke={colors.araratHaze} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'score':
      return (
        <svg {...iconStyle} width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={colors.sandstone} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    case 'grandcru':
      return (
        <span style={{ fontSize: '16px', lineHeight: 1 }}>✦</span>
      )
  }
}

const alertBgMap: Record<MarketAlert['type'], string> = {
  listing: 'rgba(90,124,82,0.08)',
  price: 'rgba(158,59,47,0.08)',
  legislative: 'rgba(139,110,142,0.08)',
  score: 'rgba(194,149,107,0.08)',
  grandcru: 'rgba(122,59,78,0.08)',
}

export default function Home() {
  const totalValue = getTotalValue()
  const monthlyIncome = getTotalMonthlyIncome()
  const avgCap = getAvgCapRate()
  const avgOcc = getAvgOccupancy()
  const portfolioScore = getPortfolioTerroirScore()
  const sparkData = portfolioHistory.map((p) => p.value)

  return (
    <div
      className="scroll-container"
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: colors.warmWhite,
        paddingTop: 'max(env(safe-area-inset-top), 48px)',
        paddingBottom: '88px',
      }}
    >
      <div style={{ padding: `0 ${spacing.pagePad}px` }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <p style={{ fontSize: '13px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '2px' }}>Good morning,</p>
            <h1 style={{ fontSize: '24px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark, lineHeight: 1.2 }}>
              Shiraz
            </h1>
          </div>
          <div
            style={{
              width: 42, height: 42, borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.grapeCrush}, ${colors.araratHaze})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <span style={{ color: '#F8F5F0', fontFamily: fonts.ui, fontWeight: 700, fontSize: '16px' }}>S</span>
          </div>
        </div>

        {/* Portfolio Summary Card */}
        <div
          style={{
            background: colors.vineyardDark,
            borderRadius: radius.card,
            padding: '20px',
            marginBottom: spacing.cardGap,
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(248,245,240,0.6)', fontFamily: fonts.ui, marginBottom: '6px', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            Portfolio Value
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4px' }}>
            <p style={{ fontSize: '32px', fontFamily: fonts.mono, fontWeight: 600, color: '#F8F5F0', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
              {formatCurrency(totalValue, true)}
            </p>
            <TrendPill value="8.4" positive={true} />
          </div>

          {/* Cash flow + Portfolio Score row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', fontFamily: fonts.mono, color: colors.vineyardGreen }}>
              +{formatCurrency(monthlyIncome, true)}/mo cash flow
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(248,245,240,0.55)', fontFamily: fonts.ui }}>Portfolio Score</span>
              <span
                style={{
                  fontSize: '14px',
                  fontFamily: fonts.mono,
                  fontWeight: 600,
                  color: colors.sandstone,
                }}
              >
                {portfolioScore}
              </span>
            </div>
          </div>

          {/* Sparkline */}
          <div style={{ height: '44px', marginLeft: '-4px', marginRight: '-4px' }}>
            <Sparkline data={sparkData} color={colors.vineyardGreen} height={44} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(248,245,240,0.4)', fontFamily: fonts.ui }}>Apr</span>
            <span style={{ fontSize: '11px', color: 'rgba(248,245,240,0.4)', fontFamily: fonts.ui }}>Mar</span>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: spacing.sectionGap, overflowX: 'auto', paddingBottom: '2px' }}>
          <MetricCard label="Occupancy" value={`${avgOcc}%`} sub="avg across all" accentColor={colors.vineyardGreen} />
          <MetricCard label="Avg Cap Rate" value={`${avgCap}%`} sub="portfolio avg" />
          <MetricCard label="Properties" value={`${properties.length}`} sub="3 markets" />
        </div>

        {/* Grand Cru Spotlight */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
              Grand Cru Spotlight
            </h2>
          </div>

          <div style={{ background: colors.parchment, borderRadius: radius.card, overflow: 'hidden', marginBottom: spacing.sectionGap }}>
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img
                src={grandCruSpotlight.image}
                alt={grandCruSpotlight.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(43,58,46,0.15) 0%, rgba(43,58,46,0.6) 100%)' }} />
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <GrandCruBadge />
              </div>
              <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                <p style={{ fontSize: '15px', fontFamily: fonts.ui, fontWeight: 600, color: '#F8F5F0', marginBottom: '2px' }}>
                  {grandCruSpotlight.name}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(248,245,240,0.8)', fontFamily: fonts.ui }}>
                  {grandCruSpotlight.type} · {grandCruSpotlight.units} units
                </p>
              </div>
            </div>
            <div style={{ padding: '14px 16px 16px', display: 'flex', gap: '0' }}>
              <div style={{ flex: 1, borderRight: `1px solid ${colors.stone}`, paddingRight: '12px' }}>
                <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Cap Rate</p>
                <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.vineyardGreen }}>
                  {grandCruSpotlight.capRate}%
                </p>
              </div>
              <div style={{ flex: 1, paddingLeft: '12px', borderRight: `1px solid ${colors.stone}`, paddingRight: '12px' }}>
                <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Score</p>
                <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.vineyardGreen }}>
                  {grandCruSpotlight.primaryScore} {grandCruSpotlight.primaryStrategy}
                </p>
              </div>
              <div style={{ flex: 1, paddingLeft: '12px' }}>
                <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Occupancy</p>
                <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.vineyardGreen }}>
                  {grandCruSpotlight.occupancy}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Alerts */}
        <div>
          <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '14px' }}>
            Market Alerts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {marketAlerts.map((alert, index) => (
              <div
                key={alert.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '13px 0',
                  borderBottom: index < marketAlerts.length - 1 ? `1px solid ${colors.stone}` : 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: alertBgMap[alert.type],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  <AlertIcon type={alert.type} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontFamily: fonts.ui, fontWeight: 500, color: colors.obsidian, marginBottom: '3px', lineHeight: 1.3 }}>
                    {alert.title}
                  </p>
                  <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, lineHeight: 1.4 }}>
                    {alert.description}
                  </p>
                </div>

                {/* Time */}
                <span style={{ fontSize: '11px', color: colors.stone, fontFamily: fonts.ui, flexShrink: 0, marginTop: '2px' }}>
                  {alert.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
