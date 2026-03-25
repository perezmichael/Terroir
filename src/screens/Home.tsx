import { colors, fonts, spacing, radius } from '../theme'
import {
  properties,
  portfolioHistory,
  recentActivity,
  formatCurrency,
  getTotalValue,
  getTotalMonthlyIncome,
  getAvgCapRate,
  getAvgOccupancy,
} from '../data/properties'
import GrandCruBadge from '../components/GrandCruBadge'
import TrendPill from '../components/TrendPill'
import MetricCard from '../components/MetricCard'
import Sparkline from '../components/Sparkline'

const grandCruSpotlight = properties.find((p) => p.isGrandCru && p.id === 'normandie')!

const activityIcons: Record<string, string> = {
  payment: '💳',
  lease: '📄',
  maintenance: '🔧',
}

export default function Home() {
  const totalValue = getTotalValue()
  const monthlyIncome = getTotalMonthlyIncome()
  const avgCap = getAvgCapRate()
  const avgOcc = getAvgOccupancy()
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
            <p style={{ fontSize: '13px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '2px' }}>
              Good morning,
            </p>
            <h1
              style={{
                fontSize: '24px',
                fontFamily: fonts.ui,
                fontWeight: 700,
                color: colors.vineyardDark,
                lineHeight: 1.2,
              }}
            >
              Michael
            </h1>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.grapeCrush}, ${colors.araratHaze})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#F8F5F0', fontFamily: fonts.ui, fontWeight: 700, fontSize: '16px' }}>M</span>
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
            <p
              style={{
                fontSize: '32px',
                fontFamily: fonts.mono,
                fontWeight: 600,
                color: '#F8F5F0',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              {formatCurrency(totalValue, true)}
            </p>
            <TrendPill value="8.4" positive={true} />
          </div>
          <p
            style={{
              fontSize: '14px',
              fontFamily: fonts.mono,
              color: colors.vineyardGreen,
              marginBottom: '16px',
            }}
          >
            +{formatCurrency(monthlyIncome, true)}/mo cash flow
          </p>

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
          <MetricCard
            label="Occupancy"
            value={`${avgOcc}%`}
            sub="avg across all"
            accentColor={colors.vineyardGreen}
          />
          <MetricCard
            label="Avg Cap Rate"
            value={`${avgCap}%`}
            sub="portfolio avg"
          />
          <MetricCard
            label="Properties"
            value={`${properties.length}`}
            sub="3 markets"
          />
        </div>

        {/* Grand Cru Spotlight */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
              Grand Cru Spotlight
            </h2>
          </div>

          <div
            style={{
              background: colors.parchment,
              borderRadius: radius.card,
              overflow: 'hidden',
              marginBottom: spacing.sectionGap,
            }}
          >
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img
                src={grandCruSpotlight.image}
                alt={grandCruSpotlight.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(43,58,46,0.15) 0%, rgba(43,58,46,0.6) 100%)',
                }}
              />
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
                <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Monthly</p>
                <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>
                  {formatCurrency(grandCruSpotlight.monthlyIncome, true)}
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

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '14px' }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentActivity.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '13px 0',
                  borderBottom: index < recentActivity.length - 1 ? `1px solid ${colors.stone}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: colors.parchment,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '16px',
                  }}
                >
                  {activityIcons[item.icon]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontFamily: fonts.ui, fontWeight: 500, color: colors.obsidian, marginBottom: '2px' }}>
                    {item.text}
                  </p>
                  <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.property}
                  </p>
                </div>
                <span style={{ fontSize: '12px', color: colors.stone, fontFamily: fonts.ui, flexShrink: 0 }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
