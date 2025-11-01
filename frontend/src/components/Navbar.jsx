/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Navigation Component - Main app navigation with social feed emphasis
 */

import { Link } from 'react-router-dom'
import { Mountain, User, LogOut, Camera, Map, Heart, Folder, ChevronDown, Settings, Crown, Coffee } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import NotificationDropdown from './NotificationDropdown'
import logo from '../assets/logo.svg'

const Navbar = ({ isAuthenticated, user, onLogout, onOpenDashboard }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const isAdmin = user?.username === 'jmenichole' || user?.role === 'admin' || user?.role === 'moderator'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setShowUserDropdown(false)
    onLogout()
  }

  const handleOpenDashboard = () => {
    setShowUserDropdown(false)
    if (onOpenDashboard) {
      onOpenDashboard()
    }
  }
  return (
    <nav className="bg-white shadow-lg border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src={logo} 
              alt="Rock Spotter" 
              className="h-9 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-stone-600 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/feed" 
                  className="flex items-center space-x-1 text-stone-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Heart className="h-4 w-4" />
                  <span>Feed</span>
                </Link>
                <Link 
                  to="/gallery" 
                  className="flex items-center space-x-1 text-stone-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Camera className="h-4 w-4" />
                  <span>Gallery</span>
                </Link>
                <Link 
                  to="/hunts" 
                  className="flex items-center space-x-1 text-stone-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Map className="h-4 w-4" />
                  <span>Hunts</span>
                </Link>
                <Link 
                  to="/albums" 
                  className="flex items-center space-x-1 text-stone-600 hover:text-primary-600 transition-colors font-medium"
                >
                  <Folder className="h-4 w-4" />
                  <span>Albums</span>
                </Link>
                <Link 
                  to="/create" 
                  className="bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Add Post
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation + User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Quick Actions */}
            {isAuthenticated && (
              <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
                <Link 
                  to="/feed" 
                  className="p-2 text-stone-600 hover:text-primary-600 transition-colors"
                  title="Feed"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link 
                  to="/create" 
                  className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  title="Add Post"
                >
                  <Camera className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NotificationDropdown />
                
                {/* User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-md hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                    <span className="hidden sm:inline font-medium">{user?.username}</span>
                    {isAdmin && <Crown className="h-4 w-4 text-yellow-500" />}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-stone-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            {user?.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={user.username}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-stone-900 flex items-center space-x-1">
                              <span>{user?.username}</span>
                              {isAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                            </div>
                            <div className="text-sm text-stone-500">{user?.email}</div>
                            {isAdmin && (
                              <div className="text-xs text-yellow-600 font-medium">Administrator</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={handleOpenDashboard}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-stone-700 hover:bg-stone-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </button>

                        <Link 
                          to="/profile" 
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-stone-700 hover:bg-stone-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>View Profile</span>
                        </Link>

                        <Link 
                          to="/albums" 
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-stone-700 hover:bg-stone-50 transition-colors"
                        >
                          <Folder className="h-4 w-4" />
                          <span>My Albums</span>
                        </Link>

                        <button
                          onClick={handleOpenDashboard}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>

                        <a
                          href="https://ko-fi.com/jmenichole0"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-pink-600 hover:bg-pink-50 transition-colors"
                        >
                          <Coffee className="h-4 w-4" />
                          <span>Support ☕</span>
                        </a>

                        {isAdmin && (
                          <>
                            <div className="border-t border-gray-100 my-1"></div>
                            <Link 
                              to="/moderation" 
                              onClick={() => setShowUserDropdown(false)}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-red-700 hover:bg-red-50 transition-colors"
                            >
                              <Crown className="h-4 w-4" />
                              <span>Moderation</span>
                            </Link>
                          </>
                        )}

                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar