import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './screens/Home'
import Properties from './screens/Properties'
import Discover from './screens/Discover'
import Analytics from './screens/Analytics'
import BrandGuide from './screens/BrandGuide'
import { colors } from './theme'

function AppShell() {
  const location = useLocation()
  const isBrandGuide = location.pathname === '/brand-guide'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: colors.warmWhite,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxWidth: isBrandGuide ? 'none' : '430px',
        margin: '0 auto',
      }}
    >
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/brand-guide" element={<BrandGuide />} />
        </Routes>
      </div>
      {!isBrandGuide && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
