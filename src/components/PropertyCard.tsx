import { Property, formatCurrency } from '../data/properties'
import { colors, fonts, radius } from '../theme'
import GrandCruBadge from './GrandCruBadge'
import TrendPill from './TrendPill'
import TerroirScore from './TerroirScore'

interface PropertyCardProps {
  property: Property
  onClick: () => void
}

const statusConfig: Record<Property['status'], { dot: string; label: string }> = {
  'Off Market':       { dot: colors.stone,         label: 'Off Market' },
  'For Sale':         { dot: colors.vineyardGreen,  label: 'For Sale' },
  'Foreclosure':      { dot: colors.negativeText,   label: 'Foreclosure' },
  'Under Contract':   { dot: colors.araratHaze,     label: 'Under Contract' },
  'For Rent':         { dot: colors.sandstone,      label: 'For Rent' },
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const typeLabel = property.type === 'Multi-family' && property.units
    ? `Multi-family · ${property.units} units`
    : property.type

  const status = statusConfig[property.status]

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
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 100%)',
          }}
        />

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
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: status.dot,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            {status.label}
          </span>
        </div>

        {/* Grand Cru badge — top right */}
        {property.isGrandCru && (
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <GrandCruBadge size="sm" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        {/* Name */}
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

        {/* Type + market */}
        <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '3px' }}>
          {typeLabel} · {property.market}
        </p>

        {/* Bed / Bath / Sqft */}
        <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '2px' }}>
          {property.beds} Bd · {property.baths} Ba · {property.sqft.toLocaleString()} Sqft
        </p>

        {/* Occupancy type */}
        <p style={{ fontSize: '12px', fontFamily: fonts.ui, color: colors.basalt, marginBottom: '10px' }}>
          {property.ownerOccupied ? 'Owner Occupied' : 'Non-Owner Occupied'}
        </p>

        {/* Metrics row */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            borderTop: `1px solid ${colors.stone}`,
            paddingTop: '10px',
            marginBottom: '0',
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Monthly</p>
            <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 500, color: colors.obsidian }}>
              {formatCurrency(property.monthlyIncome, true)}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Cap Rate</p>
            <p style={{ fontSize: '14px', fontFamily: fonts.mono, fontWeight: 500, color: colors.obsidian }}>
              {property.capRate}%
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '11px', color: colors.basalt, fontFamily: fonts.ui, marginBottom: '3px' }}>Occupancy</p>
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

        {/* Terroir Score */}
        <div style={{ borderTop: `1px solid ${colors.stone}`, marginTop: '10px' }}>
          <TerroirScore
            compact
            scores={property.scores}
            primaryStrategy={property.primaryStrategy}
            primaryScore={property.primaryScore}
          />
        </div>
      </div>
    </div>
  )
}
