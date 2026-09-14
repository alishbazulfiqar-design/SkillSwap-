import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Login
import Login from './pages/login'

// Components
import Navbar from './components/Navbar'
import LiveSession from './components/LiveSession'
import ListingModel from './components/ListingModel'
import HostWorkshop from './components/HostWorkshop'
import SkillSwapProfile from './components/Profile'
import Footer from './components/footer'

// Pages
import Dashboard from './pages/Dashboard'
import MessagesView from './pages/Message'
import Users from './pages/Users'
import UserList from './pages/userlist'

// Mock Data
import { swapUsers } from './data/mockData'

type View =
  | 'dashboard'
  | 'live-session'
  | 'host-workshop'
  | 'messages'
  | 'profile'
  | 'users'
  | 'user-list'

const queryClient = new QueryClient()

function AppContent() {
  const navigate = useNavigate()

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken')
  )

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setIsLoggedIn(false)
    navigate('/login')
  }

  // Selected user
  const [selectedUser, setSelectedUser] = useState<typeof swapUsers[0] | null>(null)

  // Listing modal
  const [showListing, setShowListing] = useState(false)

  // Select user from Dashboard
  const handleSelectUser = (user: typeof swapUsers[0]) => {
    setSelectedUser(user)
    setShowListing(true)
  }

  // Start live session
  const handleStartSession = () => {
    setShowListing(false)
    navigate('/live-session')
  }

  // Complete live session
  const handleSessionComplete = () => {
    navigate('/dashboard')
    setSelectedUser(null)
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={() => {
                setIsLoggedIn(true)
                navigate('/dashboard')
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Navbar
        onOpenListing={() => setShowListing(true)}
        timeBalance={0}
        onLogout={handleLogout}
      />

     
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              onSelectUser={handleSelectUser}
              setView={(view: View) => navigate(`/${view}`)}
            />
          }
        />

        <Route path="/messages" element={<MessagesView />} />

        <Route path="/users" element={<Users />} />

        <Route path="/user-list" element={<UserList />} />

        <Route path="/profile" element={<SkillSwapProfile />} />

        <Route
          path="/host-workshop"
          element={
            <HostWorkshop setView={(view: View) => navigate(`/${view}`)} />
          }
        />

        <Route
          path="/live-session"
          element={
            <LiveSession
              user={selectedUser}
              onComplete={handleSessionComplete}
            />
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Footer />

      {showListing && (
        <ListingModel
          user={selectedUser}
          onClose={() => setShowListing(false)}
          onStartSession={handleStartSession}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
// API se milne wala data kitni der tak fresh maana jayega,For stale time.