import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Property, MONTHS, formatCurrency } from '../data/properties'
import { colors, fonts, radius } from '../theme'
import GrandCruBadge from '../components/GrandCruBadge'
import TrendPill from '../components/TrendPill'
import TerroirScore from '../components/TerroirScore'
import InvestmentAnalysis from './InvestmentAnalysis'

interface PropertyDetailProps {
  property: Property
  onBack: () => void
}

const DetailMetric = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '12px 14px' }}>
    <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.2px' }}>
      {label}
    </p>
    <p style={{ fontSize: '16px', fontFamily: fonts.mono, fontWeight: 600, color: accent ? colors.vineyardGreen : colors.obsidian }}>
      {value}
    </p>
  </div>
)

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: colors.parchment, border: `1px solid ${colors.stone}`, borderRadius: 10, padding: '8px 12px', boxShadow: '0 4px 16px rgba(30,28,25,0.12)' }}>
        <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>{label}</p>
        <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)

  const incomeData = property.monthlyIncomeHistory.map((v, i) => ({ month: MONTHS[i], income: v }))
  const totalExpenses = property.expenses.reduce((s, e) => s + e.value, 0)
  const netIncome = property.monthlyIncome - totalExpenses

  const typeLabel =
    property.type === 'Multi-family' && property.units
      ? `Multi-family · ${property.units} units`
      : property.type

  if (showAnalysis) {
    return <InvestmentAnalysis onBack={() => setShowAnalysis(false)} property={property} />
  }

  return (
    <div
      className="scroll-container slide-in"
      style={{
        position: 'fixed',
        inset: 0,
        background: colors.warmWhite,
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 50,
        paddingBottom: '32px',
      }}
    >
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        <img
          src={property.image}
          alt={property.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 80%)' }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 'max(env(safe-area-inset-top), 48px)',
            left: '16px',
            width: 38, height: 38,
            borderRadius: '50%',
            background: 'rgba(248,245,240,0.92)',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={colors.obsidian} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {property.isGrandCru && (
          <div style={{ position: 'absolute', top: 'max(env(safe-area-inset-top), 48px)', right: '16px' }}>
            <GrandCruBadge />
          </div>
        )}

        <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16 }}>
          <h1 style={{ fontSize: '22px', fontFamily: fonts.ui, fontWeight: 700, color: '#F8F5F0', marginBottom: '4px', lineHeight: 1.2 }}>
            {property.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(248,245,240,0.85)', fontFamily: fonts.ui }}>
              {typeLabel} · {property.market}
            </p>
            <TrendPill value={property.trend} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px 0' }}>

        {/* Grand Cru explanation */}
        {property.isGrandCru && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(122,59,78,0.08), rgba(158,90,110,0.06))',
              border: `1px solid rgba(122,59,78,0.2)`,
              borderRadius: radius.metric,
              padding: '14px 16px',
              marginBottom: '16px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>✦</span>
            <div>
              <div style={{ marginBottom: '4px' }}><GrandCruBadge size="sm" /></div>
              <p style={{ fontSize: '13px', color: colors.basalt, fontFamily: fonts.ui, lineHeight: 1.5, marginTop: '6px' }}>
                This property ranks in the top 15% of your portfolio by cap rate, occupancy, and appreciation — earning Grand Cru status.
              </p>
            </div>
          </div>
        )}

        {/* Terroir Score section */}
        <div style={{ marginBottom: '24px' }}>
          <TerroirScore
            scores={property.scores}
            primaryStrategy={property.primaryStrategy}
            primaryScore={property.primaryScore}
            showCustomize
          />
        </div>

        {/* Key Metrics Grid */}
        <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
          Key Metrics
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <DetailMetric label="Purchase Price" value={formatCurrency(property.purchasePrice, true)} />
          <DetailMetric label="Est. Value" value={formatCurrency(property.value, true)} />
          <DetailMetric label="Monthly Income" value={formatCurrency(property.monthlyIncome)} />
          <DetailMetric label="Net Monthly" value={formatCurrency(netIncome)} accent={netIncome > 0} />
          <DetailMetric label="Cap Rate" value={`${property.capRate}%`} accent />
          <DetailMetric label="Cash-on-Cash" value={`${property.cashOnCash}%`} accent />
          <DetailMetric label="Annual Return" value={`${property.annualReturn}%`} accent />
          <DetailMetric label="Appreciation" value={`+${property.appreciation}%`} accent />
        </div>

        {/* Run Analysis button */}
        <button
          onClick={() => setShowAnalysis(true)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '100px',
            background: colors.parchment,
            border: `1px solid ${colors.stone}`,
            fontSize: '14px',
            fontFamily: fonts.ui,
            fontWeight: 600,
            color: colors.grapeCrush,
            cursor: 'pointer',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 19V13L5 9V5H19V9L15 13V19L12 21L9 19Z" stroke={colors.grapeCrush} strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          Run Investment Analysis
        </button>

        {/* Occupancy */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              background: property.occupancy === 100 ? colors.positiveBg : property.occupancy < 75 ? colors.negativeBg : colors.parchment,
              borderRadius: radius.metric,
              padding: '10px 16px',
            }}
          >
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px', textTransform: 'uppercase' }}>Occupancy</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <p style={{ fontSize: '24px', fontFamily: fonts.mono, fontWeight: 600, color: property.occupancy === 100 ? colors.positiveText : colors.obsidian }}>
                {property.occupancy}%
              </p>
              {property.units && (
                <p style={{ fontSize: '13px', color: colors.basalt, fontFamily: fonts.ui }}>
                  {Math.round(property.occupancy / 100 * property.units)}/{property.units} units
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Income Chart */}
        <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
          Income (12 months)
        </h2>
        <div style={{ background: colors.parchment, borderRadius: radius.card, padding: '16px 8px 12px 4px', marginBottom: '24px' }}>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={incomeData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`incomeGradient-${property.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.vineyardGreen} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.vineyardGreen} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: fonts.ui, fill: colors.basalt }} axisLine={false} tickLine={false} interval={2} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" stroke={colors.vineyardGreen} strokeWidth={2} fill={`url(#incomeGradient-${property.id})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
          Monthly Expenses
        </h2>
        <div style={{ background: colors.parchment, borderRadius: radius.card, padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
              <PieChart width={130} height={130}>
                <Pie data={property.expenses} cx={60} cy={60} innerRadius={38} outerRadius={58} dataKey="value" strokeWidth={0}>
                  {property.expenses.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: '13px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>{formatCurrency(totalExpenses, true)}</p>
                <p style={{ fontSize: '10px', color: colors.basalt, fontFamily: fonts.ui }}>total</p>
              </div>
            </div>
            <div style={{ flex: 1, paddingLeft: '8px' }}>
              {property.expenses.map((expense) => (
                <div key={expense.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: expense.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui }}>{expense.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontFamily: fonts.mono, fontWeight: 500, color: colors.obsidian }}>
                    {formatCurrency(expense.value, true)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
