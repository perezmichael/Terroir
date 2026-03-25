import { useState } from 'react'
import { Property, formatCurrency } from '../data/properties'
import { colors, fonts, radius } from '../theme'
import TerroirScore from '../components/TerroirScore'

interface InvestmentAnalysisProps {
  onBack: () => void
  property?: Property
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
}) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '6px' }}>{label}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: colors.parchment,
          borderRadius: '8px',
          border: `1px solid ${colors.stone}`,
          overflow: 'hidden',
        }}
      >
        {prefix && (
          <span style={{ padding: '0 8px 0 12px', fontSize: '14px', fontFamily: fonts.mono, color: colors.basalt }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: prefix ? '11px 12px 11px 0' : '11px 12px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            fontFamily: fonts.mono,
            color: colors.obsidian,
            width: '100%',
            minWidth: 0,
          }}
        />
        {suffix && (
          <span style={{ padding: '0 12px 0 4px', fontSize: '14px', fontFamily: fonts.mono, color: colors.basalt }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p
      style={{
        fontSize: '12px',
        fontFamily: fonts.ui,
        fontWeight: 700,
        color: colors.vineyardDark,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '12px',
        marginTop: '4px',
      }}
    >
      {title}
    </p>
  )
}

export default function InvestmentAnalysis({ onBack, property }: InvestmentAnalysisProps) {
  const [propertyValue, setPropertyValue] = useState(property ? String(property.value) : '450000')
  const [loanValue, setLoanValue] = useState(property ? String(Math.round(property.purchasePrice * 0.8)) : '360000')
  const [downPayment, setDownPayment] = useState(property ? String(Math.round(property.purchasePrice * 0.2)) : '90000')
  const [interestRate, setInterestRate] = useState('7.25')
  const [monthlyRent, setMonthlyRent] = useState(property ? String(property.monthlyIncome) : '3200')
  const [term, setTerm] = useState('360')
  const [marketValue, setMarketValue] = useState(property ? String(property.value) : '480000')
  const [capRateInput, setCapRateInput] = useState(property ? String(property.capRate) : '6.5')
  const [homeImprovement, setHomeImprovement] = useState('15000')
  const [rehabLoans, setRehabLoans] = useState('0')
  const [closingCosts, setClosingCosts] = useState('8500')
  const [otherCosts, setOtherCosts] = useState('2000')
  const [managementFee, setManagementFee] = useState('10')
  const [maintenance, setMaintenance] = useState('400')
  const [cleaningFees, setCleaningFees] = useState('200')
  const [insurance, setInsurance] = useState('150')
  const [utilities, setUtilities] = useState('0')

  // Compute results
  const pv = parseFloat(propertyValue) || 0
  const rent = parseFloat(monthlyRent) || 0
  const cap = parseFloat(capRateInput) || 0
  const hi = parseFloat(homeImprovement) || 0
  const mgmt = parseFloat(managementFee) || 0
  const maint = parseFloat(maintenance) || 0
  const clean = parseFloat(cleaningFees) || 0
  const ins = parseFloat(insurance) || 0
  const util = parseFloat(utilities) || 0
  const closing = parseFloat(closingCosts) || 0

  const monthlyExpenses = (rent * mgmt / 100) + maint + clean + ins + util +
    ((parseFloat(loanValue) || 0) * (parseFloat(interestRate) / 100 / 12))
  const netMonthlyCashFlow = rent - monthlyExpenses
  const annualROI = pv > 0 ? ((netMonthlyCashFlow * 12) / (parseFloat(downPayment) || pv * 0.2)) * 100 : 0

  const ltrScore = clamp(Math.round(50 + cap * 4 - (monthlyExpenses / Math.max(rent, 1)) * 10), 30, 99)
  const strScore = clamp(Math.round(ltrScore * 0.88 + (cap > 6 ? 5 : -5)), 25, 97)
  const flipScore = clamp(Math.round(40 + (hi / Math.max(pv, 1)) * 200 + (closing / Math.max(pv, 1)) * 50), 20, 95)

  const allScores = [
    { strategy: 'LTR' as const, score: ltrScore },
    { strategy: 'STR' as const, score: strScore },
    { strategy: 'FLIP' as const, score: flipScore },
  ]
  const primary = allScores.reduce((a, b) => (a.score > b.score ? a : b))

  return (
    <div
      className="scroll-container slide-in"
      style={{
        position: 'fixed',
        inset: 0,
        background: colors.warmWhite,
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 60,
        paddingBottom: '40px',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: colors.warmWhite,
          borderBottom: `1px solid ${colors.stone}`,
          padding: 'max(env(safe-area-inset-top), 48px) 16px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: colors.parchment,
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={colors.obsidian} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 style={{ fontSize: '18px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark, lineHeight: 1.2 }}>
            Investment Analysis
          </h1>
          {property && (
            <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, marginTop: '1px' }}>
              {property.name}
            </p>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>

        {/* Purchase Costs */}
        <SectionHeader title="Purchase Costs" />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <InputField label="Property Value" value={propertyValue} onChange={setPropertyValue} prefix="$" />
          <InputField label="Loan Value" value={loanValue} onChange={setLoanValue} prefix="$" />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <InputField label="Down Payment" value={downPayment} onChange={setDownPayment} prefix="$" />
          <InputField label="Interest Rate" value={interestRate} onChange={setInterestRate} suffix="%" />
        </div>

        {/* Return on Investment */}
        <SectionHeader title="Return on Investment" />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <InputField label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
          <InputField label="Term (Months)" value={term} onChange={setTerm} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <InputField label="Market Value" value={marketValue} onChange={setMarketValue} prefix="$" />
          <InputField label="Cap Rate" value={capRateInput} onChange={setCapRateInput} suffix="%" />
        </div>

        {/* Rehab Costs */}
        <SectionHeader title="Rehab Costs" />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <InputField label="Home Improvement" value={homeImprovement} onChange={setHomeImprovement} prefix="$" />
          <InputField label="Loans" value={rehabLoans} onChange={setRehabLoans} prefix="$" />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <InputField label="Closing Costs" value={closingCosts} onChange={setClosingCosts} prefix="$" />
          <InputField label="Other" value={otherCosts} onChange={setOtherCosts} prefix="$" />
        </div>

        {/* Annual Operating Costs */}
        <SectionHeader title="Annual Operating Costs" />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <InputField label="Management Fee" value={managementFee} onChange={setManagementFee} suffix="%" />
          <InputField label="Maintenance" value={maintenance} onChange={setMaintenance} prefix="$" />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <InputField label="Cleaning Fees" value={cleaningFees} onChange={setCleaningFees} prefix="$" />
          <InputField label="Insurance" value={insurance} onChange={setInsurance} prefix="$" />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
          <InputField label="Utilities" value={utilities} onChange={setUtilities} prefix="$" />
          <div style={{ flex: 1 }} />
        </div>

        {/* Results */}
        <div style={{ borderTop: `2px solid ${colors.stone}`, paddingTop: '24px' }}>
          <h2 style={{ fontSize: '16px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark, marginBottom: '16px' }}>
            Projected Results
          </h2>

          {/* Score */}
          <div style={{ marginBottom: '20px' }}>
            <TerroirScore
              scores={{ ltr: ltrScore, str: strScore, flip: flipScore }}
              primaryStrategy={primary.strategy}
              primaryScore={primary.score}
            />
          </div>

          {/* Cash flow + ROI metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div
              style={{
                background: netMonthlyCashFlow >= 0 ? colors.positiveBg : colors.negativeBg,
                borderRadius: radius.metric,
                padding: '12px 14px',
              }}
            >
              <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '5px', textTransform: 'uppercase' }}>
                Net Monthly
              </p>
              <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: netMonthlyCashFlow >= 0 ? colors.positiveText : colors.negativeText }}>
                {netMonthlyCashFlow >= 0 ? '+' : ''}{formatCurrency(netMonthlyCashFlow)}
              </p>
            </div>
            <div
              style={{
                background: annualROI >= 0 ? colors.positiveBg : colors.negativeBg,
                borderRadius: radius.metric,
                padding: '12px 14px',
              }}
            >
              <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '5px', textTransform: 'uppercase' }}>
                Annual ROI
              </p>
              <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: annualROI >= 0 ? colors.positiveText : colors.negativeText }}>
                {annualROI >= 0 ? '+' : ''}{annualROI.toFixed(1)}%
              </p>
            </div>
            <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '12px 14px' }}>
              <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '5px', textTransform: 'uppercase' }}>
                Monthly Expenses
              </p>
              <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>
                {formatCurrency(monthlyExpenses)}
              </p>
            </div>
            <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '12px 14px' }}>
              <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '5px', textTransform: 'uppercase' }}>
                Annual Cash Flow
              </p>
              <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian }}>
                {formatCurrency(netMonthlyCashFlow * 12, true)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
