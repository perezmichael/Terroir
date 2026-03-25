import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { properties, portfolioHistory, formatCurrency } from '../data/properties'
import { colors, fonts, radius, chartColors } from '../theme'
import GrandCruBadge from '../components/GrandCruBadge'
import Sparkline from '../components/Sparkline'

const TIME_PERIODS = ['3M', '6M', '1Y', 'All'] as const
type TimePeriod = (typeof TIME_PERIODS)[number]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: colors.parchment,
          border: `1px solid ${colors.stone}`,
          borderRadius: 10,
          padding: '8px 12px',
          boxShadow: '0 4px 16px rgba(30,28,25,0.12)',
        }}
      >
        <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>
          {formatCurrency(payload[0].value, true)}
        </p>
      </div>
    )
  }
  return null
}

// Allocation by type
const typeAllocation = [
  { name: 'Multi-family', value: properties.filter((p) => p.type === 'Multi-family').reduce((s, p) => s + p.value, 0), color: chartColors[0] },
  { name: 'Single-family', value: properties.filter((p) => p.type === 'Single-family').reduce((s, p) => s + p.value, 0), color: chartColors[1] },
]

// Allocation by market
const marketAllocation = [
  { name: 'Los Angeles', value: properties.filter((p) => p.market === 'Los Angeles').reduce((s, p) => s + p.value, 0), color: chartColors[0] },
  { name: 'Chicago', value: properties.filter((p) => p.market === 'Chicago').reduce((s, p) => s + p.value, 0), color: chartColors[1] },
  { name: 'Phoenix', value: properties.filter((p) => p.market === 'Phoenix').reduce((s, p) => s + p.value, 0), color: chartColors[2] },
]

const totalValue = properties.reduce((s, p) => s + p.value, 0)

// Properties ranked by cap rate
const rankedProperties = [...properties].sort((a, b) => b.capRate - a.capRate)

const DonutCenter = ({ total, label }: { total: number; label: string }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <p style={{ fontSize: '15px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian, lineHeight: 1.2 }}>
      {formatCurrency(total, true)}
    </p>
    <p style={{ fontSize: '10px', color: colors.basalt, fontFamily: fonts.ui, marginTop: '2px' }}>{label}</p>
  </div>
)

export default function Analytics() {
  const [period, setPeriod] = useState<TimePeriod>('1Y')

  const periodMap: Record<TimePeriod, number> = { '3M': 3, '6M': 6, '1Y': 12, All: 12 }
  const sliceCount = periodMap[period]
  const filteredHistory = portfolioHistory.slice(portfolioHistory.length - sliceCount)

  const portfolioChange = filteredHistory.length >= 2
    ? ((filteredHistory[filteredHistory.length - 1].value - filteredHistory[0].value) / filteredHistory[0].value * 100).toFixed(1)
    : '0'

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
      <div style={{ padding: '0 16px' }}>

        {/* Header + Time Period Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark }}>
            Analytics
          </h1>
          <div
            style={{
              display: 'flex',
              background: colors.parchment,
              borderRadius: '100px',
              padding: '3px',
              gap: '2px',
            }}
          >
            {TIME_PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '100px',
                  border: 'none',
                  background: period === p ? colors.vineyardDark : 'transparent',
                  color: period === p ? '#F8F5F0' : colors.basalt,
                  fontSize: '12px',
                  fontFamily: fonts.ui,
                  fontWeight: period === p ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'background 180ms ease, color 180ms ease',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Performance Chart */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
              Portfolio Value
            </h2>
            <span
              style={{
                fontSize: '13px',
                fontFamily: fonts.mono,
                color: Number(portfolioChange) >= 0 ? colors.positiveText : colors.negativeText,
                background: Number(portfolioChange) >= 0 ? colors.positiveBg : colors.negativeBg,
                padding: '3px 8px',
                borderRadius: '100px',
              }}
            >
              {Number(portfolioChange) >= 0 ? '+' : ''}{portfolioChange}%
            </span>
          </div>
          <div
            style={{
              background: colors.parchment,
              borderRadius: radius.card,
              padding: '16px 8px 12px 0',
            }}
          >
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={filteredHistory} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.vineyardGreen} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={colors.vineyardGreen} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fontFamily: fonts.ui, fill: colors.basalt }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={colors.vineyardGreen}
                  strokeWidth={2.5}
                  fill="url(#portfolioGradient)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>

          {/* By Type */}
          <div
            style={{
              background: colors.parchment,
              borderRadius: radius.card,
              padding: '16px 12px',
            }}
          >
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
              By Type
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                <PieChart width={110} height={110}>
                  <Pie data={typeAllocation} cx={50} cy={50} innerRadius={32} outerRadius={50} dataKey="value" strokeWidth={0}>
                    {typeAllocation.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
                <DonutCenter total={totalValue} label="total" />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              {typeAllocation.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, flex: 1 }}>{item.name}</span>
                  <span style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.obsidian }}>
                    {Math.round(item.value / totalValue * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By Market */}
          <div
            style={{
              background: colors.parchment,
              borderRadius: radius.card,
              padding: '16px 12px',
            }}
          >
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
              By Market
            </p>
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                <PieChart width={110} height={110}>
                  <Pie data={marketAllocation} cx={50} cy={50} innerRadius={32} outerRadius={50} dataKey="value" strokeWidth={0}>
                    {marketAllocation.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
                <DonutCenter total={totalValue} label="total" />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              {marketAllocation.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.obsidian }}>
                    {Math.round(item.value / totalValue * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property Performance Ranking */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>
              By Cap Rate
            </h2>
            <span style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui }}>
              {properties.length} properties
            </span>
          </div>

          <div
            style={{
              background: colors.parchment,
              borderRadius: radius.card,
              overflow: 'hidden',
            }}
          >
            {rankedProperties.map((p, index) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '13px 16px',
                  borderBottom: index < rankedProperties.length - 1 ? `1px solid ${colors.stone}` : 'none',
                }}
              >
                {/* Rank */}
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: fonts.mono,
                    color: index < 2 ? colors.grapeCrush : colors.stone,
                    fontWeight: 600,
                    width: '18px',
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1px' }}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontFamily: fonts.ui,
                        fontWeight: 500,
                        color: colors.obsidian,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name}
                    </p>
                    {p.isGrandCru && <GrandCruBadge size="sm" />}
                  </div>
                  <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui }}>
                    {p.market}
                  </p>
                </div>

                {/* Sparkline */}
                <div style={{ width: '52px', height: '28px', flexShrink: 0 }}>
                  <Sparkline
                    data={p.monthlyIncomeHistory}
                    color={p.trend >= 0 ? colors.vineyardGreen : colors.negativeText}
                    height={28}
                    fixedWidth={52}
                  />
                </div>

                {/* Cap Rate */}
                <span
                  style={{
                    fontSize: '15px',
                    fontFamily: fonts.mono,
                    fontWeight: 600,
                    color: index < 2 ? colors.vineyardGreen : colors.obsidian,
                    width: '42px',
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {p.capRate}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
