import { Property, formatCurrency } from '../data/properties'
import { colors, fonts, radius } from '../theme'
import GrandCruBadge from './GrandCruBadge'
import TrendPill from './TrendPill'

interface PropertyCardProps {
  property: Property
  onClick: () => void
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const typeLabel = property.type === 'Multi-family' && property.units
    ? `Multi-family · ${property.units} units`
    : property.type

  return (
    <div
      className="card-pressable"
      onClick={onClick}
      style={{
        background: colors.parchment,
        borderRadius: radius.card,
        overflow: 'hidden',
      }}
    >
      {/* Hero Image */}
      <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
        <img
          src={property.image}
          alt={property.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%)',
          }}
        />
        {/* Grand Cru badge overlay */}
        {property.isGrandCru && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <GrandCruBadge size="sm" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Name + type row */}
        <div style={{ marginBottom: '10px' }}>
          <h3
            style={{
              fontSize: '15px',
              fontFamily: fonts.ui,
              fontWeight: 600,
              color: colors.obsidian,
              marginBottom: '3px',
              lineHeight: 1.3,
            }}
          >
            {property.name}
          </h3>
          <p
            style={{
              fontSize: '12px',
              fontFamily: fonts.ui,
              color: colors.basalt,
            }}
          >
            {typeLabel} · {property.market}
          </p>
        </div>

        {/* Metrics row */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            borderTop: `1px solid ${colors.stone}`,
            paddingTop: '10px',
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>
              Monthly
            </p>
            <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 500, color: colors.obsidian }}>
              {formatCurrency(property.monthlyIncome, true)}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>
              Cap Rate
            </p>
            <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 500, color: colors.obsidian }}>
              {property.capRate}%
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>
              Occupancy
            </p>
            <p
              style={{
                fontSize: '14px',
                fontFamily: fonts.mono,
                fontWeight: 500,
                color: property.occupancy === 100 ? colors.vineyardGreen : colors.obsidian,
              }}
            >
              {property.occupancy}%
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '1px' }}>
            <TrendPill value={property.trend} />
          </div>
        </div>
      </div>
    </div>
  )
}
