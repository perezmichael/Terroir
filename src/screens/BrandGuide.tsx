import { useRef } from 'react'
import { colors, fonts, radius, spacing } from '../theme'
import { properties } from '../data/properties'
import GrandCruBadge from '../components/GrandCruBadge'
import TrendPill from '../components/TrendPill'
import MetricCard from '../components/MetricCard'
import TerroirScore from '../components/TerroirScore'
import PropertyCard from '../components/PropertyCard'
import Sparkline from '../components/Sparkline'

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{
      fontSize: '11px', fontFamily: fonts.ui, fontWeight: 700,
      color: colors.basalt, letterSpacing: '1.2px', textTransform: 'uppercase',
      marginBottom: '16px',
    }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: colors.stone, margin: '40px 0' }} />
}

function ColorSwatch({ name, hex, usage }: { name: string; hex: string; usage?: string }) {
  const isLight = ['#F8F5F0', '#EDE8E0', '#D4CFC6'].includes(hex)
  return (
    <div>
      <div style={{
        height: '72px', borderRadius: '10px', background: hex,
        border: isLight ? `1px solid ${colors.stone}` : 'none',
        marginBottom: '8px',
      }} />
      <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px' }}>{name}</p>
      <p style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.basalt, marginBottom: usage ? '2px' : '0' }}>{hex}</p>
      {usage && <p style={{ fontSize: '10px', fontFamily: fonts.ui, color: colors.stone }}>{usage}</p>}
    </div>
  )
}

// ─── TOC config ─────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: 'colors',     label: 'Colors' },
  { id: 'type',       label: 'Type' },
  { id: 'grandcru',   label: 'Grand Cru' },
  { id: 'score',      label: 'Score' },
  { id: 'components', label: 'Components' },
  { id: 'spacing',    label: 'Spacing' },
  { id: 'references', label: 'References' },
  { id: 'concepts',   label: 'Concepts' },
]

// ─── Main Component ──────────────────────────────────────────────────────────

export default function BrandGuide() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollTo(id: string) {
    const el = document.getElementById(`section-${id}`)
    if (el && scrollRef.current) {
      const top = el.offsetTop - 100
      scrollRef.current.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const normandie = properties[0] // 1247 S Normandie — Grand Cru, good showcase

  return (
    <div
      ref={scrollRef}
      className="scroll-container"
      style={{
        height: '100%', overflowY: 'auto', overflowX: 'hidden',
        background: colors.warmWhite,
        paddingTop: 'max(env(safe-area-inset-top), 0px)',
      }}
    >
      {/* ── Section 1: Cover ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 0 0' }}>
        {/* Hero image */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img
            src="/armenia-winery.jpg"
            alt="Armenian highland vineyard with Mt. Ararat"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(43,58,46,0.2) 0%, rgba(43,58,46,0.65) 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
            <h1 style={{
              fontSize: '42px', fontFamily: fonts.ui, fontWeight: 800,
              color: '#F8F5F0', lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.5px',
            }}>
              Terroir
            </h1>
            <p style={{ fontSize: '14px', fontFamily: fonts.ui, color: 'rgba(248,245,240,0.8)', letterSpacing: '0.2px' }}>
              Brand & Visual Style Guide — v1.0
            </p>
          </div>
        </div>

        {/* Intro text */}
        <div style={{ padding: '24px 20px 0' }}>
          <p style={{ fontSize: '14px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.65, marginBottom: '8px' }}>
            Real estate portfolio intelligence — colors and identity inspired by the Armenian highlands, Khor Virap monastery, and the vineyards of Ararat.
          </p>
          <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.stone, lineHeight: 1.55 }}>
            This is a living style guide. All components on this page are the actual production components used throughout the app.
          </p>
        </div>
      </div>

      {/* ── Sticky TOC ────────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: colors.warmWhite,
        borderBottom: `1px solid ${colors.stone}`,
        padding: '10px 0',
        marginTop: '24px',
      }}>
        <div style={{
          display: 'flex', gap: '8px',
          overflowX: 'auto', paddingLeft: '20px', paddingRight: '20px',
          paddingBottom: '2px',
        }}>
          {TOC_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                padding: '5px 12px', borderRadius: '100px',
                border: `1px solid ${colors.stone}`,
                background: 'transparent',
                color: colors.basalt, fontSize: '12px',
                fontFamily: fonts.ui, fontWeight: 500,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── All Sections ─────────────────────────────────────────────────── */}
      <div style={{ padding: '0 20px 80px' }}>

        {/* ── Section 2: Color Palette ─────────────────────────────────── */}
        <div id="section-colors" style={{ paddingTop: '40px' }}>
          <SectionLabel>Color Palette</SectionLabel>

          <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '20px', lineHeight: 1.55 }}>
            Five brand colors extracted from the Armenian highland landscape, paired with a warm neutral scale.
          </p>

          {/* Brand colors */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Brand
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <ColorSwatch name="Vineyard Dark" hex="#2B3A2E" usage="Headers, dark backgrounds" />
            <ColorSwatch name="Vineyard Green" hex="#5A7C52" usage="Positive states, LTR" />
            <ColorSwatch name="Sandstone" hex="#C2956B" usage="Secondary accent, FLIP" />
            <ColorSwatch name="Ararat Haze" hex="#8B6E8E" usage="Chart accent, STR" />
            <ColorSwatch name="Grape Crush" hex="#7A3B4E" usage="CTAs, Grand Cru, nav" />
          </div>

          {/* Neutrals */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Neutrals
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <ColorSwatch name="Warm White" hex="#F8F5F0" usage="App background" />
            <ColorSwatch name="Parchment" hex="#EDE8E0" usage="Card backgrounds" />
            <ColorSwatch name="Stone" hex="#D4CFC6" usage="Borders, dividers" />
            <ColorSwatch name="Basalt" hex="#3D3833" usage="Secondary text" />
            <ColorSwatch name="Obsidian" hex="#1E1C19" usage="Primary text" />
          </div>

          {/* Semantic */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Semantic
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <div style={{
                height: '72px', borderRadius: '10px',
                background: colors.positiveBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px',
              }}>
                <TrendPill value={12.3} positive={true} />
              </div>
              <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px' }}>Positive</p>
              <p style={{ fontSize: '10px', fontFamily: fonts.mono, color: colors.basalt }}>#E8F0E4 / #3A6B32</p>
            </div>
            <div>
              <div style={{
                height: '72px', borderRadius: '10px',
                background: colors.negativeBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px',
              }}>
                <TrendPill value={3.1} positive={false} />
              </div>
              <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px' }}>Negative</p>
              <p style={{ fontSize: '10px', fontFamily: fonts.mono, color: colors.basalt }}>#FCEEE8 / #9E3B2F</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{
                height: '72px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #7A3B4E, #9E5A6E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '8px',
              }}>
                <GrandCruBadge />
              </div>
              <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px' }}>Grand Cru Gradient</p>
              <p style={{ fontSize: '10px', fontFamily: fonts.mono, color: colors.basalt }}>#7A3B4E → #9E5A6E</p>
            </div>
          </div>

          {/* Origin note */}
          <div style={{
            background: colors.parchment, borderRadius: radius.metric,
            padding: '14px 16px',
          }}>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.6, fontStyle: 'italic' }}>
              "Colors extracted from the Khor Virap monastery and Mt. Ararat landscape — vineyard greens, monastery sandstone, Ararat's dusty haze, and ripe grape tones."
            </p>
          </div>
        </div>

        <Divider />

        {/* ── Section 3: Typography ─────────────────────────────────────── */}
        <div id="section-type">
          <SectionLabel>Typography</SectionLabel>

          {/* UI Font */}
          <div style={{ background: colors.parchment, borderRadius: radius.card, padding: '20px', marginBottom: '16px' }}>
            <p style={{ fontSize: '28px', fontFamily: fonts.ui, fontWeight: 700, color: colors.obsidian, marginBottom: '6px', lineHeight: 1.1 }}>
              Plus Jakarta Sans
            </p>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '20px' }}>
              All UI text — headings, labels, body copy, navigation
            </p>

            {/* Type scale */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: `1px solid ${colors.stone}`, paddingTop: '16px' }}>
              {[
                { label: 'Page Title', size: '24px', weight: 700 },
                { label: 'Section Title', size: '18px', weight: 600 },
                { label: 'Card Title', size: '16px', weight: 500 },
                { label: 'Body', size: '14px', weight: 400 },
                { label: 'Caption', size: '12px', weight: 400 },
              ].map(({ label, size, weight }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: size, fontFamily: fonts.ui, fontWeight: weight, color: colors.obsidian }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.stone, flexShrink: 0 }}>
                    {size}/{weight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mono Font */}
          <div style={{ background: colors.parchment, borderRadius: radius.card, padding: '20px', marginBottom: '20px' }}>
            <p style={{ fontSize: '24px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian, marginBottom: '6px', lineHeight: 1.1 }}>
              JetBrains Mono
            </p>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '20px' }}>
              All financial figures — dollar amounts, percentages, rates
            </p>

            <div style={{ borderTop: `1px solid ${colors.stone}`, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontSize: '28px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian, letterSpacing: '-0.5px' }}>$4,200,000</p>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                <p style={{ fontSize: '20px', fontFamily: fonts.mono, fontWeight: 500, color: colors.vineyardGreen }}>7.2%</p>
                <p style={{ fontSize: '16px', fontFamily: fonts.mono, fontWeight: 500, color: colors.positiveText }}>+12.3%</p>
                <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 500, color: colors.negativeText }}>-3.1%</p>
              </div>
            </div>
          </div>

          {/* Live metric card example */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '10px' }}>
            Live example — two typefaces in context:
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <MetricCard label="Portfolio Value" value="$4.2M" sub="total" accentColor={colors.vineyardGreen} />
            <MetricCard label="Cap Rate" value="6.8%" sub="avg" />
            <MetricCard label="Properties" value="10" sub="3 markets" />
          </div>
        </div>

        <Divider />

        {/* ── Section 4: Grand Cru System ──────────────────────────────── */}
        <div id="section-grandcru">
          <SectionLabel>Grand Cru System</SectionLabel>

          <p style={{ fontSize: '14px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.65, marginBottom: '24px' }}>
            In wine classification, Grand Cru designates the finest plots of land. In Terroir, Grand Cru is the quality benchmark for top-performing properties — awarded to properties ranking in the top 15–20% across cap rate, occupancy, and appreciation.
          </p>

          {/* Badge variants */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Badge Variants
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {[
              {
                label: 'On dark / image backgrounds',
                bg: colors.vineyardDark,
                content: <GrandCruBadge />,
              },
              {
                label: 'On light cards',
                bg: colors.parchment,
                content: (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: colors.warmWhite,
                    border: `1.5px solid ${colors.sandstone}`,
                    color: colors.grapeCrush,
                    fontSize: '11px', letterSpacing: '0.5px',
                    textTransform: 'uppercase', padding: '4px 12px',
                    borderRadius: '100px', fontFamily: fonts.ui, fontWeight: 600,
                  }}>✦ Grand Cru</span>
                ),
              },
              {
                label: 'In table rows / tight UI',
                bg: colors.warmWhite,
                content: (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: 'transparent',
                    border: `1px solid ${colors.grapeCrush}`,
                    color: colors.grapeCrush,
                    fontSize: '11px', letterSpacing: '0.5px',
                    textTransform: 'uppercase', padding: '3px 10px',
                    borderRadius: '100px', fontFamily: fonts.ui, fontWeight: 600,
                  }}>✦ Grand Cru</span>
                ),
              },
            ].map(({ label, bg, content }) => (
              <div key={label} style={{ background: colors.parchment, borderRadius: radius.metric, overflow: 'hidden' }}>
                <div style={{
                  background: bg, padding: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: '60px',
                }}>
                  {content}
                </div>
                <div style={{ padding: '8px 14px' }}>
                  <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui }}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Qualification criteria */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Qualification Criteria
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {[
              { label: 'Cap Rate', desc: 'Top 15–20% relative to portfolio average', color: colors.vineyardGreen },
              { label: 'Occupancy', desc: 'Consistently high tenant retention', color: colors.sandstone },
              { label: 'Appreciation', desc: 'Above-average year-over-year growth', color: colors.araratHaze },
            ].map(({ label, desc, color }) => (
              <div key={label} style={{
                background: colors.parchment, borderRadius: radius.metric,
                padding: '12px 14px',
                borderLeft: `3px solid ${color}`,
              }}>
                <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '3px' }}>{label}</p>
                <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Where it appears */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '10px' }}>
            Where it appears
          </p>
          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '14px 16px' }}>
            {[
              'Properties list → badge overlay on hero image (top-right)',
              'Property detail → badge + explanatory callout card',
              'Home dashboard → Grand Cru spotlight card',
              'Analytics → badges in performance ranking table',
            ].map((item, i, arr) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                paddingBottom: i < arr.length - 1 ? '10px' : '0',
                marginBottom: i < arr.length - 1 ? '10px' : '0',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.stone}` : 'none',
              }}>
                <span style={{ color: colors.grapeCrush, fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✦</span>
                <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.4 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Section 5: Terroir Score ──────────────────────────────────── */}
        <div id="section-score">
          <SectionLabel>Terroir Score</SectionLabel>

          <p style={{ fontSize: '14px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.65, marginBottom: '20px' }}>
            Every property is scored across three investment strategies on a scale of 0–100. The highest-scoring strategy becomes the primary recommendation.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <TerroirScore
              scores={{ ltr: 88, str: 72, flip: 45 }}
              primaryStrategy="LTR"
              primaryScore={88}
              showCustomize
            />
          </div>

          {/* Strategy color map */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Strategy Color Mapping
          </p>
          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { strategy: 'LTR', label: 'Long Term Rental', color: colors.vineyardGreen, score: 88 },
              { strategy: 'STR', label: 'Short-Term Rental', color: colors.araratHaze, score: 72 },
              { strategy: 'FLIP', label: 'Flip Potential', color: colors.sandstone, score: 45 },
            ].map(({ strategy, label, color, score }) => (
              <div key={strategy} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.obsidian, width: '140px', flexShrink: 0 }}>
                  <strong style={{ fontFamily: fonts.mono, fontSize: '12px' }}>{strategy}</strong> — {label}
                </span>
                <div style={{ flex: 1, height: '6px', borderRadius: '100px', background: colors.stone, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${score}%`, borderRadius: '100px', background: color }} />
                </div>
                <span style={{ fontSize: '12px', fontFamily: fonts.mono, color: colors.basalt, width: '26px', textAlign: 'right', flexShrink: 0 }}>{score}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Section 6: Component Library ─────────────────────────────── */}
        <div id="section-components">
          <SectionLabel>Components</SectionLabel>

          {/* Property Card */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Property Card
          </p>
          <div style={{ marginBottom: '24px', pointerEvents: 'none' }}>
            <PropertyCard property={normandie} onClick={() => {}} />
          </div>

          {/* Metric Card */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Metric Card
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <MetricCard label="Cap Rate" value="7.2%" sub="portfolio avg" accentColor={colors.vineyardGreen} />
            <MetricCard label="Occupancy" value="94%" sub="avg across all" />
          </div>

          {/* Trend Pills */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Trend Indicators
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <TrendPill value={12.3} positive={true} />
            <TrendPill value={3.1} positive={false} />
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '2px',
              background: colors.parchment, color: colors.basalt,
              fontSize: '12px', padding: '3px 8px', borderRadius: '100px',
              fontFamily: fonts.mono, fontWeight: 500,
            }}>→ 0.0%</span>
          </div>

          {/* Status badges */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Status Badges
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {[
              { label: 'For Sale', dot: colors.vineyardGreen },
              { label: 'Off Market', dot: colors.stone },
              { label: 'Foreclosure', dot: colors.negativeText },
              { label: 'Under Contract', dot: colors.araratHaze },
              { label: 'For Rent', dot: colors.sandstone },
            ].map(({ label, dot }) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  background: colors.parchment,
                  border: `1px solid ${colors.stone}`,
                  borderRadius: '100px', padding: '5px 11px',
                  fontSize: '11px', fontFamily: fonts.ui,
                  fontWeight: 600, color: colors.obsidian,
                  letterSpacing: '0.3px', textTransform: 'uppercase',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </div>

          {/* Sparkline */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Sparkline
          </p>
          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '16px', marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '8px' }}>12-month income trend</p>
            <Sparkline data={normandie.monthlyIncomeHistory} color={colors.vineyardGreen} height={48} />
          </div>

          {/* Market alert rows */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Market Alert Items
          </p>
          <div style={{ background: colors.parchment, borderRadius: radius.card, overflow: 'hidden', marginBottom: '24px' }}>
            {[
              {
                icon: '🏠',
                title: 'New listing matches your criteria',
                desc: '1420 Echo Park Ave — $520K · STR Score 82',
                time: '2h ago',
              },
              {
                icon: '⭐',
                title: 'Score change — Scottsdale Ranch',
                desc: 'STR score upgraded to 87 (was 81)',
                time: '2d ago',
              },
            ].map((alert, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '14px 16px',
                borderBottom: i === 0 ? `1px solid ${colors.stone}` : 'none',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: colors.warmWhite,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', flexShrink: 0,
                }}>
                  {alert.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 500, color: colors.obsidian, marginBottom: '3px' }}>{alert.title}</p>
                  <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui }}>{alert.desc}</p>
                </div>
                <span style={{ fontSize: '11px', color: colors.stone, fontFamily: fonts.ui, flexShrink: 0 }}>{alert.time}</span>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '12px' }}>
            Bottom Navigation Bar
          </p>
          <div style={{
            background: colors.warmWhite, borderTop: `1px solid ${colors.stone}`,
            borderRadius: radius.metric, overflow: 'hidden',
            display: 'flex',
          }}>
            {[
              { label: 'Home', active: false },
              { label: 'Properties', active: true },
              { label: 'Discover', active: false },
              { label: 'Analytics', active: false },
            ].map(({ label, active }) => (
              <div key={label} style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '12px 0', gap: '4px',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: active ? colors.grapeCrush : colors.stone,
                  opacity: active ? 1 : 0.4,
                }} />
                <span style={{
                  fontSize: '10px', fontFamily: fonts.ui,
                  fontWeight: active ? 600 : 400,
                  color: active ? colors.grapeCrush : colors.stone,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Section 7: Spacing & Layout ──────────────────────────────── */}
        <div id="section-spacing">
          <SectionLabel>Spacing & Layout</SectionLabel>

          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '14px' }}>
            Spacing Scale — 4px base unit
          </p>
          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '16px', marginBottom: '20px' }}>
            {[4, 8, 12, 16, 24, 32].map((px) => (
              <div key={px} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.basalt, width: '28px', flexShrink: 0 }}>{px}px</span>
                <div style={{ height: '10px', width: px * 3, background: colors.vineyardGreen, borderRadius: '3px' }} />
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '14px' }}>
            Corner Radius
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: 'Inputs / Buttons', px: '8px', r: 8 },
              { label: 'Metric Cards', px: '12px', r: 12 },
              { label: 'Property Cards', px: '16px', r: 16 },
              { label: 'Pills / Badges', px: '100px', r: 24 },
            ].map(({ label, px, r }) => (
              <div key={label}>
                <div style={{
                  height: '56px', borderRadius: r,
                  border: `1.5px solid ${colors.stone}`,
                  background: colors.parchment,
                  marginBottom: '8px',
                }} />
                <p style={{ fontSize: '11px', fontFamily: fonts.ui, color: colors.obsidian, marginBottom: '1px' }}>{label}</p>
                <p style={{ fontSize: '10px', fontFamily: fonts.mono, color: colors.basalt }}>r={px}</p>
              </div>
            ))}
          </div>

          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '14px 16px' }}>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.vineyardDark, marginBottom: '6px' }}>
              Mobile-First
            </p>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.55 }}>
              Primary target: <span style={{ fontFamily: fonts.mono }}>390px</span> width (iPhone 14/15). All touch targets minimum <span style={{ fontFamily: fonts.mono }}>44×44px</span>. Safe area padding for notch devices via <span style={{ fontFamily: fonts.mono, fontSize: '12px' }}>env(safe-area-inset-*)</span>.
            </p>
          </div>
        </div>

        <Divider />

        {/* ── Section 8: Design References ─────────────────────────────── */}
        <div id="section-references">
          <SectionLabel>Design References</SectionLabel>

          <div style={{ background: colors.parchment, borderRadius: radius.card, overflow: 'hidden' }}>
            {[
              { name: 'Cards & imagery', source: 'Airbnb', desc: '16px rounded corners, hero images, full-bleed photography' },
              { name: 'Charts & data', source: 'Robinhood', desc: 'Clean sparklines, minimal axis labels, calm financial data' },
              { name: 'Equity analytics', source: 'Carta', desc: 'Donut charts for allocation, clean data presentation' },
              { name: 'Navigation', source: 'Airbnb', desc: '4-tab bottom bar, icon + label, active accent state' },
              { name: 'Chart library', source: 'Recharts', desc: 'Composable, fully customizable, brand-color theming' },
            ].map(({ name, source, desc }, i, arr) => (
              <div key={name} style={{
                padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.stone}` : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <p style={{ fontSize: '13px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>{name}</p>
                  <span style={{
                    fontSize: '11px', fontFamily: fonts.ui, color: colors.grapeCrush,
                    fontWeight: 500,
                  }}>{source}</span>
                </div>
                <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.4 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Section 9: Future Concepts ───────────────────────────────── */}
        <div id="section-concepts">
          <SectionLabel>Future Concepts</SectionLabel>

          <p style={{ fontSize: '14px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.65, marginBottom: '20px' }}>
            Extensible classification system — can expand beyond Grand Cru as the product matures, mirroring the full Burgundy wine classification hierarchy.
          </p>

          <div style={{ background: colors.parchment, borderRadius: radius.card, overflow: 'hidden', marginBottom: '20px' }}>
            {[
              { tier: 'Grand Cru', range: 'Top 15–20%', desc: 'Finest properties across all metrics', color: colors.grapeCrush },
              { tier: 'Premier Cru', range: 'Top 35%', desc: 'Excellent performers, strong fundamentals', color: colors.sandstone },
              { tier: 'Village', range: 'Average', desc: 'Solid portfolio properties, meeting benchmarks', color: colors.vineyardGreen },
              { tier: 'Regional', range: 'Below average', desc: 'Underperforming — candidates for improvement or exit', color: colors.stone },
            ].map(({ tier, range, desc, color }, i, arr) => (
              <div key={tier} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? `1px solid ${colors.stone}` : 'none',
                borderLeft: `3px solid ${color}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <p style={{ fontSize: '14px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian }}>{tier}</p>
                    <span style={{
                      fontSize: '11px', fontFamily: fonts.mono,
                      color, background: `${color}18`,
                      padding: '2px 8px', borderRadius: '100px',
                    }}>{range}</span>
                  </div>
                  <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: colors.parchment, borderRadius: radius.metric, padding: '14px 16px' }}>
            <p style={{ fontSize: '13px', fontFamily: fonts.ui, color: colors.basalt, lineHeight: 1.6, fontStyle: 'italic' }}>
              "Like Burgundy's appellation system, the classification tiers can be applied at the market level as well — e.g., 'Chicago Pilsen: Premier Cru market' based on aggregate deal quality in that geography."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: `1px solid ${colors.stone}`, textAlign: 'center' }}>
          <p style={{ fontSize: '20px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark, marginBottom: '6px' }}>Terroir</p>
          <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.stone }}>Brand & Visual Style Guide — v1.0</p>
          <p style={{ fontSize: '11px', fontFamily: fonts.mono, color: colors.stone, marginTop: '4px' }}>
            /brand-guide
          </p>
        </div>

      </div>
    </div>
  )
}
