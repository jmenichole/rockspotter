/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Profile Edit Page - User profile editing with avatar selection
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Save, X, Upload, HelpCircle } from 'lucide-react'
import { useNotifications } from '../components/NotificationSystem'

const ProfileEdit = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: '',
    profilePhoto: null
  })
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  
  const navigate = useNavigate()
  const { showSuccess, showError } = useNotifications()

  // Animated rock avatars
  const rockAvatars = [
    { id: 'granite', emoji: '🪨', name: 'Granite Guardian', animation: 'animate-bounce' },
    { id: 'crystal', emoji: '💎', name: 'Crystal Collector', animation: 'animate-pulse' },
    { id: 'fossil', emoji: '🦴', name: 'Fossil Finder', animation: 'animate-ping' },
    { id: 'gem', emoji: '💍', name: 'Gem Hunter', animation: 'animate-spin' },
    { id: 'mountain', emoji: '⛰️', name: 'Mountain Explorer', animation: 'animate-bounce' },
    { id: 'volcano', emoji: '🌋', name: 'Volcanic Adventurer', animation: 'animate-pulse' },
    { id: 'meteor', emoji: '☄️', name: 'Meteor Chaser', animation: 'animate-ping' },
    { id: 'earth', emoji: '🌍', name: 'Earth Lover', animation: 'animate-spin' }
  ]

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        profilePhoto: null
      })
      setSelectedAvatar(user.avatar || '')
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({
          ...formData,
          profilePhoto: e.target.result
        })
        setSelectedAvatar('') // Clear avatar when photo is uploaded
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.id)
    setFormData({
      ...formData,
      avatar: avatar.id,
      profilePhoto: null // Clear photo when avatar is selected
    })
    setShowAvatarSelector(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call to update profile
      const updatedUser = {
        ...user,
        ...formData,
        avatar: selectedAvatar
      }
      
      // In a real app, this would be an API call
      onUpdateUser(updatedUser)
      showSuccess('Profile updated successfully!')
      navigate('/profile')
    } catch (error) {
      showError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getAvatarDisplay = () => {
    if (formData.profilePhoto) {
      return (
        <img 
          src={formData.profilePhoto} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover border-4 border-primary-200"
        />
      )
    } else if (selectedAvatar) {
      const avatar = rockAvatars.find(a => a.id === selectedAvatar)
      return (
        <div className={`text-6xl ${avatar?.animation || ''}`}>
          {avatar?.emoji || '🪨'}
        </div>
      )
    } else {
      return (
        <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
          <Camera className="h-8 w-8" />
        </div>
      )
    }
  }

  const formatJoinDate = (date) => {
    if (!date) return 'Recently joined'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header with Help */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Customize your Rock Spotter profile</p>
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors"
          title="Help & Tips"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture/Avatar Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
          
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {getAvatarDisplay()}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Photo
                </label>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={() => setShowAvatarSelector(true)}
                  className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  🪨 Choose Avatar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter email"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Tell us about your rock hunting adventures..."
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-700">Member since</span>
              <span className="text-gray-900 font-medium">
                {formatJoinDate(user?.joinDate || user?.createdAt)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-700">Rocks discovered</span>
              <span className="text-gray-900 font-medium">{user?.rocksCount || 0}</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-700">Achievements earned</span>
              <span className="text-gray-900 font-medium">{user?.achievementsCount || 0}</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-6 py-2 text-gray-600 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Avatar Selector Modal */}
      {showAvatarSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Choose Your Avatar</h3>
              <button
                onClick={() => setShowAvatarSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {rockAvatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedAvatar === avatar.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className={`text-4xl mb-2 ${avatar.animation}`}>
                    {avatar.emoji}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {avatar.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Profile Edit Help</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">Profile Picture</h4>
                <p>Upload a custom photo or choose from our animated rock avatars. Each avatar has its own personality!</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Username & Bio</h4>
                <p>Make your profile unique with a memorable username and tell the community about your rock hunting adventures.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Account Stats</h4>
                <p>Your join date and achievement counts are automatically tracked as you use Rock Spotter.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileEdit