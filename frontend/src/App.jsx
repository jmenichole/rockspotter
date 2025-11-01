/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Main App Component - Handles routing, authentication, and global state
 */

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AchievementSystem from './components/AchievementSystem'
import { useNotifications } from './components/NotificationSystem'
import Home from './pages/Home'
import Login from './pages/Login'
import MagicLogin from './pages/MagicLogin'
import Register from './pages/Register'
import SocialFeed from './pages/SocialFeed'
import RockGallery from './pages/RockGallery'
import CreateRock from './pages/CreateRock'
import Hunts from './pages/Hunts'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import Albums from './pages/Albums'
import ModerationDashboard from './pages/ModerationDashboard'
import FAQ from './pages/FAQ'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import CommunityGuidelines from './pages/CommunityGuidelines'
import UserDashboard from './components/UserDashboard'
import GeneralChatSystem from './components/GeneralChatSystem'
import { ModerationAccessIcon, ReportQueueStatus } from './components/ReportSystem'
import { autoModerationSystem } from './utils/autoModeration'
import { health } from './utils/api'
import './App.css'

// Logout component that handles logout in useEffect
const LogoutComponent = ({ onLogout }) => {
  const navigate = useNavigate()
  
  useEffect(() => {
    onLogout()
    navigate('/')
  }, [onLogout, navigate])
  
  return <div>Logging out...</div>
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState('checking')
  const [showDashboard, setShowDashboard] = useState(false)
  const [showModeration, setShowModeration] = useState(false)
  
  // Initialize notification system
  const { 
    NotificationContainer, 
    showSuccess, 
    showError, 
    showEmailConfirmation, 
    showUserCreated 
  } = useNotifications()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    
    // Check API health
    checkApiHealth()
    setLoading(false)
  }, [])

  const checkApiHealth = async () => {
    try {
      await health.check()
      setApiStatus('connected')
    } catch (error) {
      setApiStatus('disconnected')
      console.error('API Health Check Failed:', error)
    }
  }

  const login = (token, userData) => {
    console.log('App login function called with:', { token, userData })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
    console.log('Authentication state updated, isAuthenticated:', true)
  }

  // Auto-populate admin profile data
  useEffect(() => {
    if (user && user.username === 'jmenichole') {
      const adminProfile = {
        id: user.id,
        username: 'jmenichole',
        email: 'jamie@rockspotter.com',
        fullName: 'Jamie Vargas',
        location: 'Pensacola, FL',
        joinDate: new Date().toISOString().split('T')[0],
        role: 'admin',
        badge: 'admin',
        bio: 'Platform Administrator & Rock Enthusiast',
        avatar: null,
        totalFinds: 0,
        level: 'Admin',
        achievements: [],
        stats: {
          totalRocks: 0,
          totalHunts: 0,
          totalPoints: 0
        }
      }
      
      // Store admin profile in localStorage for persistence
      localStorage.setItem('userProfile', JSON.stringify(adminProfile))
    }
  }, [user])

  const handleAchievementEarned = (newAchievements) => {
    // Update user's achievements in state
    setUser(prevUser => ({
      ...prevUser,
      achievements: [...(prevUser.achievements || []), ...newAchievements.map(a => a.id)]
    }))
    
    // Update localStorage
    const updatedUser = {
      ...user,
      achievements: [...(user.achievements || []), ...newAchievements.map(a => a.id)]
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('rememberMe')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading Rock Spotter...</p>
        </div>
      </div>
    )
  }

  return (
    <Router basename={import.meta.env.VITE_GITHUB_PAGES === 'true' ? '/Rock-Spotter' : ''}>
      <div className="min-h-screen bg-stone-50">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={logout}
          onOpenDashboard={() => setShowDashboard(true)}
        />        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? <Navigate to="/feed" /> : <Home />
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/feed" /> : <Login onLogin={login} />
              } 
            />
            <Route 
              path="/login-magic" 
              element={
                isAuthenticated ? <Navigate to="/feed" /> : <MagicLogin onLogin={login} />
              } 
            />
            <Route 
              path="/register" 
              element={
                <Register onLogin={login} />
              } 
            />
            <Route 
              path="/logout" 
              element={<LogoutComponent onLogout={logout} />} 
            />
            <Route 
              path="/feed" 
              element={
                (() => {
                  console.log('Feed route - isAuthenticated:', isAuthenticated);
                  return isAuthenticated ? <SocialFeed /> : <Navigate to="/login" />;
                })()
              } 
            />
            <Route 
              path="/gallery" 
              element={
                isAuthenticated ? <RockGallery /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/create" 
              element={
                isAuthenticated ? <CreateRock /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/hunts" 
              element={
                isAuthenticated ? <Hunts /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile/edit" 
              element={
                isAuthenticated ? <ProfileEdit user={user} onUpdateUser={setUser} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/albums" 
              element={
                isAuthenticated ? <Albums /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/moderation" 
              element={
                isAuthenticated ? <ModerationDashboard user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Global Notification System */}
        <NotificationContainer />
        
        {/* Achievement System */}
        {isAuthenticated && (
          <AchievementSystem 
            user={user} 
            onAchievementEarned={handleAchievementEarned}
          />
        )}

        {/* User Dashboard Modal */}
        {showDashboard && (
          <UserDashboard 
            user={user}
            onClose={() => setShowDashboard(false)}
          />
        )}

        {/* General Chat System */}
        <GeneralChatSystem 
          user={user}
          isVisible={isAuthenticated}
        />

        {/* Moderation Access (Admin Only) */}
        <ModerationAccessIcon 
          user={user}
          onClick={() => setShowModeration(true)}
        />

        {/* Report Queue Status (Admin Only) */}
        <ReportQueueStatus 
          user={user}
          reportCount={2} // This would come from API in real app
        />
      </div>
    </Router>
  )
}

export default App
