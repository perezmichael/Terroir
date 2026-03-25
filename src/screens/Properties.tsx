import { useState } from 'react'
import { properties } from '../data/properties'
import { colors, fonts, spacing, radius } from '../theme'
import PropertyCard from '../components/PropertyCard'
import PropertyDetail from './PropertyDetail'

export default function Properties() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.market.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  )

  if (selectedId) {
    const prop = properties.find((p) => p.id === selectedId)!
    return <PropertyDetail property={prop} onBack={() => setSelectedId(null)} />
  }

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontFamily: fonts.ui, fontWeight: 700, color: colors.vineyardDark }}>
            Properties
          </h1>
          <button
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: colors.parchment,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M6 12H18M10 18H14" stroke={colors.basalt} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div
            style={{
              position: 'absolute',
              left: '13px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={colors.stone} strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke={colors.stone} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search properties..."
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

        {/* Market summary */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '2px' }}>
          {(['All', 'Los Angeles', 'Chicago', 'Phoenix'] as const).map((market) => {
            const isAll = market === 'All'
            const count = isAll ? properties.length : properties.filter((p) => p.market === market).length
            const active = isAll ? search === '' : search === market
            return (
              <button
                key={market}
                onClick={() => setSearch(isAll ? '' : market)}
                style={{
                  padding: '7px 14px',
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
                }}
              >
                {market} {count > 0 && <span style={{ opacity: 0.7 }}>({count})</span>}
              </button>
            )
          })}
        </div>

        {/* Property List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.cardGap }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: colors.basalt, fontFamily: fonts.ui }}>
              No properties found
            </div>
          ) : (
            filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => setSelectedId(property.id)}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}
