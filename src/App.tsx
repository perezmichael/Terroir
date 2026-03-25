import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './screens/Home'
import Properties from './screens/Properties'
import Discover from './screens/Discover'
import Analytics from './screens/Analytics'
import { colors } from './theme'

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: colors.warmWhite,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxWidth: '430px',
          margin: '0 auto',
        }}
      >
        {/* Main content area */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>

        {/* Bottom Nav */}
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
