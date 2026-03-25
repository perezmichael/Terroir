import { useNavigate, useLocation } from 'react-router-dom'
import { colors, fonts } from '../theme'

const tabs = [
  {
    path: '/',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
          fill={active ? colors.grapeCrush : 'none'}
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    path: '/properties',
    label: 'Properties',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="3"
          y="6"
          width="18"
          height="15"
          rx="1.5"
          fill={active ? colors.grapeCrush : 'none'}
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
        />
        <path
          d="M7 6V4.5C7 3.67157 7.67157 3 8.5 3H15.5C16.3284 3 17 3.67157 17 4.5V6"
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M3 11H21" stroke={active ? '#F8F5F0' : colors.stone} strokeWidth="1.8" />
        <path d="M9 15H15" stroke={active ? '#F8F5F0' : colors.stone} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 18H12" stroke={active ? '#F8F5F0' : colors.stone} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/discover',
    label: 'Discover',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="2" fill={active ? colors.grapeCrush : colors.stone} />
        <path
          d="M12 3V5M12 19V21M3 12H5M19 12H21"
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8.5 8.5L10.5 10.5M13.5 13.5L15.5 15.5M15.5 8.5L13.5 10.5M10.5 13.5L8.5 15.5"
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="3"
          y="12"
          width="4"
          height="9"
          rx="1"
          fill={active ? colors.grapeCrush : 'none'}
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
        />
        <rect
          x="10"
          y="7"
          width="4"
          height="14"
          rx="1"
          fill={active ? colors.grapeCrush : 'none'}
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
        />
        <rect
          x="17"
          y="3"
          width="4"
          height="18"
          rx="1"
          fill={active ? colors.grapeCrush : 'none'}
          stroke={active ? colors.grapeCrush : colors.stone}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.warmWhite,
        borderTop: `1px solid ${colors.stone}`,
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path)
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '10px 0 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              minHeight: '56px',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {tab.icon(active)}
            <span
              style={{
                fontSize: '10px',
                fontFamily: fonts.ui,
                fontWeight: active ? 600 : 400,
                color: active ? colors.grapeCrush : colors.stone,
                letterSpacing: '0.2px',
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
