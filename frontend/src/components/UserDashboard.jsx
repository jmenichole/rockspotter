/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * User Dashboard - Comprehensive user dashboard with profile management
 */

import { useState, useEffect } from 'react'
import { User, Settings, Image, MessageCircle, Heart, Eye, Shield, Crown, Edit, Camera, MapPin, Calendar, Trophy } from 'lucide-react'

const UserDashboard = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [profileData, setProfileData] = useState({})
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar || null,
        joinDate: user.createdAt || new Date().toISOString(),
        rockCount: user.rockCount || 0,
        huntCount: user.huntCount || 0,
        likesReceived: user.likesReceived || 0,
        commentsReceived: user.commentsReceived || 0
      })
    }
  }, [user])

  const isAdmin = user?.username === 'jmenichole' || user?.role === 'admin' || user?.role === 'moderator'

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'profile', label: 'Edit Profile', icon: Edit },
    { id: 'albums', label: 'My Albums', icon: Image },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    ...(isAdmin ? [{ id: 'moderation', label: 'Moderation', icon: Shield }] : [])
  ]

  const handleSaveProfile = async () => {
    try {
      // In real app, this would be an API call
      console.log('Saving profile:', profileData)
      setEditMode(false)
      // Show success message
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <span>{profileData.username}</span>
                  {isAdmin && <Crown className="h-6 w-6 text-yellow-300" />}
                </h2>
                <p className="text-blue-100">{profileData.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <DashboardOverview profileData={profileData} isAdmin={isAdmin} />
            )}

            {activeTab === 'profile' && (
              <ProfileEditor 
                profileData={profileData}
                setProfileData={setProfileData}
                editMode={editMode}
                setEditMode={setEditMode}
                onSave={handleSaveProfile}
              />
            )}

            {activeTab === 'albums' && (
              <AlbumsManager profileData={profileData} />
            )}

            {activeTab === 'messages' && (
              <MessagesManager profileData={profileData} />
            )}

            {activeTab === 'settings' && (
              <UserSettings profileData={profileData} />
            )}

            {activeTab === 'moderation' && isAdmin && (
              <ModerationQuickAccess />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Overview Component
const DashboardOverview = ({ profileData, isAdmin }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h3>
      <p className="text-gray-600">Welcome back! Here's your Rock Spotter activity summary.</p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center">
          <Camera className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{profileData.rockCount}</div>
            <div className="text-gray-600">Rocks Shared</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center">
          <MapPin className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{profileData.huntCount}</div>
            <div className="text-gray-600">Hunts Completed</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{profileData.likesReceived}</div>
            <div className="text-gray-600">Likes Received</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center">
          <MessageCircle className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-gray-900">{profileData.commentsReceived}</div>
            <div className="text-gray-600">Comments</div>
          </div>
        </div>
      </div>
    </div>

    {/* Admin Badge */}
    {isAdmin && (
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <Crown className="h-8 w-8" />
          <div>
            <h4 className="text-xl font-bold">Administrator</h4>
            <p className="text-yellow-100">You have administrative privileges on Rock Spotter</p>
          </div>
        </div>
      </div>
    )}

    {/* Quick Actions */}
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Camera className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-medium">Share Rock</div>
        </button>
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-medium">Create Hunt</div>
        </button>
        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <User className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-medium">Find Friends</div>
        </button>
      </div>
    </div>
  </div>
)

// Profile Editor Component
const ProfileEditor = ({ profileData, setProfileData, editMode, setEditMode, onSave }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
      <button
        onClick={() => editMode ? onSave() : setEditMode(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {editMode ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>

    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="space-y-6">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              {profileData.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </div>
            {editMode && (
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Change Photo
              </button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              disabled={!editMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!editMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              disabled={!editMode}
              placeholder="Pensacola, FL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
              disabled={!editMode}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            disabled={!editMode}
            rows={4}
            placeholder="Passionate rock collector and geology enthusiast..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  </div>
)

// Placeholder components for other tabs
const AlbumsManager = () => (
  <div className="text-center py-12">
    <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Albums Manager</h3>
    <p className="text-gray-600">Organize your rock photos into albums</p>
  </div>
)

const MessagesManager = () => (
  <div className="text-center py-12">
    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Messages</h3>
    <p className="text-gray-600">Manage your private conversations</p>
  </div>
)

const UserSettings = () => (
  <div className="text-center py-12">
    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
    <p className="text-gray-600">Privacy, notifications, and account settings</p>
  </div>
)

const ModerationQuickAccess = () => (
  <div className="text-center py-12">
    <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Moderation Tools</h3>
    <p className="text-gray-600">Quick access to moderation dashboard</p>
    <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Open Moderation Dashboard
    </button>
  </div>
)

export default UserDashboard