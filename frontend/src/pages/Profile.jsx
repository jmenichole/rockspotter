/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Profile Page - User profile and achievements
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Calendar, Trophy, Camera, MapPin, Edit, Heart, UserPlus, MessageCircle, Star } from 'lucide-react'
import { achievements } from '../utils/api'
import { AchievementBadge } from '../components/AchievementSystem'
import { MilestoneBadgeSystem } from '../components/MilestoneBadgeSystem'
import MessagingModal from '../components/MessagingModal'

const Profile = ({ user, currentUser }) => {
  const [userAchievements, setUserAchievements] = useState([])
  const [favoriteFinds, setFavoriteFinds] = useState([])
  const [isFriend, setIsFriend] = useState(false)
  const [friendRequestSent, setFriendRequestSent] = useState(false)
  const [showMessagingModal, setShowMessagingModal] = useState(false)
  const [userStats, setUserStats] = useState({
    commentsCount: 45,
    likesReceived: 123,
    friendsCount: 18,
    postsCount: 12,
    popularPhotos: 3,
    daysActive: 25,
    currentStreak: 7,
    likesGiven: 156,
    uniqueLocations: 8,
    lateNightPosts: 2,
    earlyMorningPosts: 1,
    longDescriptions: 5,
    helpfulResponses: 12,
    controversialPosts: 3,
    rareRockDiscoveries: 1,
    funnyPosts: 2,
    mentoringsSessions: 1
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const isOwnProfile = currentUser && user && currentUser._id === user._id

  useEffect(() => {
    if (user?._id) {
      loadUserAchievements()
      loadFavoriteFinds()
      checkFriendStatus()
    }
  }, [user, currentUser])

  const loadUserAchievements = async () => {
    try {
      setLoading(true)
      // Mock achievements for demo - in real app this would be API call
      const mockUserAchievements = [
        {
          id: 'first_discovery',
          title: 'First Discovery',
          description: 'Shared your first rock discovery',
          emoji: '🪨',
          rarity: 'common',
          points: 10
        },
        {
          id: 'social_butterfly',
          title: 'Social Butterfly',
          description: 'Received 50 likes on your posts',
          emoji: '🦋',
          rarity: 'rare',
          points: 60
        },
        {
          id: 'fossil_finder',
          title: 'Fossil Finder',
          description: 'Found your first fossil',
          emoji: '🦴',
          rarity: 'rare',
          points: 75
        }
      ]
      setUserAchievements(mockUserAchievements)
    } catch (error) {
      setError('Failed to load achievements')
      console.error('Error loading achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadFavoriteFinds = async () => {
    try {
      // Mock favorite finds - in real app this would be API call
      const mockFavoriteFinds = [
        {
          id: 1,
          title: 'Stunning Amethyst Cluster',
          location: 'Crystal Cave, Arkansas',
          likes: 47
        },
        {
          id: 2,
          title: 'Perfect Quartz Point',
          location: 'Herkimer County, NY',
          likes: 32
        },
        {
          id: 3,
          title: 'Ancient Trilobite Fossil',
          location: 'Fossil Beach, Utah',
          likes: 89
        }
      ]
      setFavoriteFinds(mockFavoriteFinds)
    } catch (error) {
      console.error('Error loading favorite finds:', error)
    }
  }

  const checkFriendStatus = async () => {
    if (!currentUser || !user || isOwnProfile) return
    
    try {
      // Mock friend status - in real app this would be API call
      setIsFriend(Math.random() > 0.7) // Random for demo
      setFriendRequestSent(Math.random() > 0.8) // Random for demo
    } catch (error) {
      console.error('Error checking friend status:', error)
    }
  }

  const handleAddFriend = async () => {
    try {
      // Mock friend request - in real app this would be API call
      setFriendRequestSent(true)
      // Show success notification
    } catch (error) {
      console.error('Error sending friend request:', error)
    }
  }

  const handleMessage = () => {
    setShowMessagingModal(true)
  }

  const handleBadgeEarned = (badge) => {
    // Could trigger confetti animation, sound effects, etc.
    console.log('New badge earned:', badge)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'bg-gray-100 text-gray-800',
      rare: 'bg-blue-100 text-blue-800',
      epic: 'bg-purple-100 text-purple-800',
      legendary: 'bg-yellow-100 text-yellow-800'
    }
    return colors[rarity] || 'bg-gray-100 text-gray-800'
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">User information not available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-primary-600" />
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {isOwnProfile ? (
                  <Link 
                    to="/profile/edit" 
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                ) : (
                  <>
                    {isFriend ? (
                      <button className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md border border-green-200">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Friends
                      </button>
                    ) : friendRequestSent ? (
                      <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-md border border-gray-200" disabled>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Request Sent
                      </button>
                    ) : (
                      <button 
                        onClick={handleAddFriend}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Friend
                      </button>
                    )}
                    
                    <button 
                      onClick={handleMessage}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-4">
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="h-6 w-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{user.rockCount || 0}</div>
          <div className="text-gray-600">Rocks Shared</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{user.huntCount || 0}</div>
          <div className="text-gray-600">Hunts Completed</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-6 w-6 text-accent" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{userAchievements.length}</div>
          <div className="text-gray-600">Achievements</div>
        </div>
      </div>

      {/* Favorite Finds Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Favorite Finds</h2>
          <Star className="h-6 w-6 text-yellow-600" />
        </div>

        {favoriteFinds.length === 0 ? (
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite finds yet</h3>
            <p className="text-gray-600">
              {isOwnProfile ? 
                "Start favoriting your best rock discoveries to showcase them here!" :
                `${user.username} hasn't chosen any favorite finds yet`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteFinds.map((find) => (
              <div key={find.id} className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                {find.image && (
                  <div className="aspect-square">
                    <img 
                      src={find.image} 
                      alt={find.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{find.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{find.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    <span>{find.likes} likes</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                    <Star className="h-4 w-4 text-yellow-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
          <Trophy className="h-6 w-6 text-yellow-600" />
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading achievements...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        ) : userAchievements.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements yet</h3>
            <p className="text-gray-600">Start sharing rocks and completing hunts to earn your first achievement!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userAchievements.map((achievement) => (
              <div key={achievement.id} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-white">
                <AchievementBadge achievement={achievement} size="lg" />
                <div className="text-center mt-3">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{achievement.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <Trophy className="h-3 w-3 text-yellow-500" />
                    <span>{achievement.points} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Milestone Badge System */}
      <MilestoneBadgeSystem
        user={user}
        userStats={userStats}
        onBadgeEarned={handleBadgeEarned}
      />

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
          <p className="text-gray-600">Your recent rocks and hunt activities will appear here</p>
        </div>
      </div>

      {/* Messaging Modal */}
      <MessagingModal
        isOpen={showMessagingModal}
        onClose={() => setShowMessagingModal(false)}
        recipient={user}
        currentUser={currentUser}
      />
    </div>
  )
}

export default Profile