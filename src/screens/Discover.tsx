import { useState } from 'react'
import { discoveryListings, DiscoveryProperty, formatCurrency } from '../data/properties'
import { colors, fonts, spacing, radius } from '../theme'
import TerroirScore from '../components/TerroirScore'

type Strategy = 'All' | 'LTR' | 'STR' | 'FLIP'
const STRATEGIES: Strategy[] = ['All', 'LTR', 'STR', 'FLIP']
const strategyLabels: Record<Strategy, string> = {
  All: 'All',
  LTR: 'Long Term Rental',
  STR: 'Short-Term Rental',
  FLIP: 'Flip Potential',
}

const statusConfig: Record<DiscoveryProperty['status'], { dot: string }> = {
  'For Sale':    { dot: colors.vineyardGreen },
  'Foreclosure': { dot: colors.negativeText },
  'Off Market':  { dot: colors.stone },
}

function DiscoveryCard({ listing }: { listing: DiscoveryProperty }) {
  const [saved, setSaved] = useState(false)
  const status = statusConfig[listing.status]

  return (
    <div
      style={{
        background: colors.parchment,
        borderRadius: radius.card,
        overflow: 'hidden',
      }}
    >
      {/* Hero image */}
      <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
        <img
          src={listing.image}
          alt={listing.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.15) 100%)' }} />

        {/* Status badge — top left */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(248,245,240,0.92)',
              backdropFilter: 'blur(6px)',
              borderRadius: '100px',
              padding: '4px 9px',
              fontSize: '10px',
              fontFamily: fonts.ui,
              fontWeight: 600,
              color: colors.obsidian,
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: status.dot, display: 'inline-block', flexShrink: 0 }} />
            {listing.status}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Address + Save button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div style={{ flex: 1, minWidth: 0, marginRight: '8px' }}>
            <h3 style={{ fontSize: '15px', fontFamily: fonts.ui, fontWeight: 600, color: colors.obsidian, marginBottom: '2px', lineHeight: 1.3 }}>
              {listing.name}
            </h3>
            <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui }}>
              {listing.city}, {listing.state} {listing.zip}
            </p>
          </div>
          <button
            onClick={() => setSaved((s) => !s)}
            style={{
              padding: '6px 12px',
              borderRadius: '100px',
              background: saved ? colors.vineyardDark : colors.warmWhite,
              border: `1px solid ${saved ? colors.vineyardDark : colors.stone}`,
              fontSize: '12px',
              fontFamily: fonts.ui,
              fontWeight: 600,
              color: saved ? '#F8F5F0' : colors.basalt,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 180ms ease',
            }}
          >
            {saved ? '✓ Saved' : '+ Save'}
          </button>
        </div>

        {/* Est. value */}
        <p style={{ fontSize: '18px', fontFamily: fonts.mono, fontWeight: 600, color: colors.obsidian, marginBottom: '6px' }}>
          {formatCurrency(listing.price, true)}{' '}
          <span style={{ fontSize: '12px', color: colors.basalt, fontWeight: 400 }}>(Est. value)</span>
        </p>

        {/* Bed/Bath/Sqft */}
        <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '2px' }}>
          {listing.beds} Bd · {listing.baths} Ba · {listing.sqft.toLocaleString()} Sqft
        </p>
        <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '10px' }}>
          {listing.ownerOccupied ? 'Owner Occupied' : 'Non-Owner Occupied'}
        </p>

        {/* Terroir Score */}
        <div style={{ borderTop: `1px solid ${colors.stone}` }}>
          <TerroirScore
            compact
            scores={listing.scores}
            primaryStrategy={listing.primaryStrategy}
            primaryScore={listing.primaryScore}
          />
        </div>
      </div>
    </div>
  )
}

export default function Discover() {
  const [activeStrategy, setActiveStrategy] = useState<Strategy>('All')
  const [search, setSearch] = useState('')

  const filtered = discoveryListings.filter((l) => {
    const matchesStrategy = activeStrategy === 'All' || l.primaryStrategy === activeStrategy
    const matchesSearch =
      search === '' ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.zip.includes(search)
    return matchesStrategy && matchesSearch
  })

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
        <div style={{ marginBottom: '4px' }}>
          <h1 style={{ fontSize: '24px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark }}>
            Discover
          </h1>
          <p style={{ fontSize: '13px', color: colors.basalt, fontFamily: fonts.ui, marginTop: '2px' }}>
            Investment opportunities in your markets
          </p>
        </div>

        {/* Strategy filter tabs */}
        <div style={{ display: 'flex', gap: '8px', margin: '16px 0', overflowX: 'auto', paddingBottom: '2px' }}>
          {STRATEGIES.map((s) => {
            const active = activeStrategy === s
            return (
              <button
                key={s}
                onClick={() => setActiveStrategy(s)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: active ? 'none' : `1px solid ${colors.stone}`,
                  background: active ? colors.vineyardDark : 'transparent',
                  color: active ? '#F8F5F0' : colors.basalt,
                  fontSize: '13px',
                  fontFamily: fonts.ui,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'background 180ms ease, color 180ms ease',
                }}
              >
                {strategyLabels[s]}
              </button>
            )
          })}
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={colors.stone} strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke={colors.stone} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by city, zip, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              background: colors.parchment,
              border: 'none',
              borderRadius: radius.metric,
              fontSize: '14px',
              fontFamily: fonts.ui,
              color: colors.obsidian,
              outline: 'none',
            }}
          />
        </div>

        {/* Results count */}
        <p style={{ fontSize: '12px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '14px' }}>
          {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found
        </p>

        {/* Discovery cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: colors.basalt, fontFamily: fonts.ui }}>
              No listings match your criteria
            </div>
          ) : (
            filtered.map((listing) => (
              <DiscoveryCard key={listing.id} listing={listing} />
            ))
          )}
        </div>

      </div>
    </div>
  )
}
