/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Achievement System - Rock-style emoji badges and pop-ups
 */

import { useState, useEffect } from 'react'
import { X, Trophy, Star, Award, Zap } from 'lucide-react'

const AchievementSystem = ({ user, onAchievementEarned }) => {
  const [achievements, setAchievements] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentAchievement, setCurrentAchievement] = useState(null)

  // Rock-style achievement definitions with emojis
  const achievementDefinitions = [
    {
      id: 'first_discovery',
      title: 'First Discovery',
      description: 'Shared your first rock discovery',
      emoji: '🪨',
      rarity: 'common',
      points: 10,
      requirement: { type: 'posts', count: 1 }
    },
    {
      id: 'rock_collector',
      title: 'Rock Collector',
      description: 'Discovered 10 different rocks',
      emoji: '💎',
      rarity: 'rare',
      points: 50,
      requirement: { type: 'posts', count: 10 }
    },
    {
      id: 'fossil_finder',
      title: 'Fossil Finder',
      description: 'Found your first fossil',
      emoji: '🦴',
      rarity: 'rare',
      points: 75,
      requirement: { type: 'fossil_discovery', count: 1 }
    },
    {
      id: 'crystal_master',
      title: 'Crystal Master',
      description: 'Collected 5 different crystal types',
      emoji: '🔮',
      rarity: 'epic',
      points: 100,
      requirement: { type: 'crystal_types', count: 5 }
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Received 50 likes on your posts',
      emoji: '🦋',
      rarity: 'rare',
      points: 60,
      requirement: { type: 'likes_received', count: 50 }
    },
    {
      id: 'helpful_hunter',
      title: 'Helpful Hunter',
      description: 'Left 25 helpful comments',
      emoji: '🤝',
      rarity: 'common',
      points: 40,
      requirement: { type: 'comments_made', count: 25 }
    },
    {
      id: 'hunt_master',
      title: 'Hunt Master',
      description: 'Participated in 5 rock hunts',
      emoji: '🏹',
      rarity: 'epic',
      points: 120,
      requirement: { type: 'hunts_joined', count: 5 }
    },
    {
      id: 'geological_expert',
      title: 'Geological Expert',
      description: 'Identified 20 different rock types',
      emoji: '🌍',
      rarity: 'legendary',
      points: 200,
      requirement: { type: 'rock_types_identified', count: 20 }
    },
    {
      id: 'mountain_explorer',
      title: 'Mountain Explorer',
      description: 'Discovered rocks in 3 different mountain ranges',
      emoji: '⛰️',
      rarity: 'epic',
      points: 150,
      requirement: { type: 'mountain_locations', count: 3 }
    },
    {
      id: 'gem_hunter',
      title: 'Gem Hunter',
      description: 'Found 3 precious gemstones',
      emoji: '💍',
      rarity: 'legendary',
      points: 250,
      requirement: { type: 'gems_found', count: 3 }
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Posted a discovery before 7 AM',
      emoji: '🌅',
      rarity: 'common',
      points: 25,
      requirement: { type: 'early_post', count: 1 }
    },
    {
      id: 'night_owl',
      title: 'Night Owl',
      description: 'Posted a discovery after 10 PM',
      emoji: '🦉',
      rarity: 'common',
      points: 25,
      requirement: { type: 'late_post', count: 1 }
    }
  ]

  useEffect(() => {
    checkForNewAchievements()
  }, [user])

  const checkForNewAchievements = () => {
    if (!user) return

    // Mock user stats for demo
    const userStats = {
      posts: user.postsCount || 5,
      likes_received: user.likesReceived || 23,
      comments_made: user.commentsMade || 12,
      hunts_joined: user.huntsJoined || 2,
      rock_types_identified: user.rockTypesIdentified || 8,
      fossil_discovery: user.fossilsFound || 1,
      crystal_types: user.crystalTypes || 3,
      mountain_locations: user.mountainLocations || 1,
      gems_found: user.gemsFound || 0,
      early_post: user.earlyPosts || 1,
      late_post: user.latePosts || 1
    }

    const earnedAchievements = user.achievements || []
    const newAchievements = []

    achievementDefinitions.forEach(achievement => {
      if (earnedAchievements.includes(achievement.id)) return

      const statValue = userStats[achievement.requirement.type] || 0
      if (statValue >= achievement.requirement.count) {
        newAchievements.push(achievement)
      }
    })

    if (newAchievements.length > 0) {
      // Show first new achievement
      showAchievementPopup(newAchievements[0])
      
      // Update user achievements
      if (onAchievementEarned) {
        onAchievementEarned(newAchievements)
      }
    }

    // Set all earned achievements for display
    const allEarned = achievementDefinitions.filter(achievement =>
      earnedAchievements.includes(achievement.id)
    )
    setAchievements(allEarned)
  }

  const showAchievementPopup = (achievement) => {
    setCurrentAchievement(achievement)
    setShowPopup(true)
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      setShowPopup(false)
    }, 5000)
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-yellow-600'
    }
    return colors[rarity] || colors.common
  }

  const getRarityGlow = (rarity) => {
    const glows = {
      common: 'shadow-gray-500/50',
      rare: 'shadow-blue-500/50',
      epic: 'shadow-purple-500/50',
      legendary: 'shadow-yellow-500/50'
    }
    return glows[rarity] || glows.common
  }

  // Achievement popup component
  const AchievementPopup = ({ achievement }) => {
    if (!achievement) return null

    const rarity = achievement.rarity || 'common'

    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
        <div className={`bg-gradient-to-r ${getRarityColor(rarity)} p-1 rounded-xl shadow-2xl ${getRarityGlow(rarity)}`}>
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{achievement.emoji}</div>
                <div>
                  <h3 className="font-bold text-gray-900">Achievement Unlocked!</h3>
                  <span className={`text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r ${getRarityColor(rarity)}`}>
                    {rarity.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h4>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{achievement.points} points earned!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Badge component for displaying earned achievements
  const AchievementBadge = ({ achievement, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-lg',
      md: 'w-12 h-12 text-2xl',
      lg: 'w-16 h-16 text-3xl'
    }

    return (
      <div
        className={`${sizeClasses[size]} bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center shadow-lg ${getRarityGlow(achievement.rarity)} cursor-pointer hover:scale-110 transition-transform`}
        title={`${achievement.title} - ${achievement.description}`}
      >
        <span className="filter drop-shadow-sm">{achievement.emoji}</span>
      </div>
    )
  }

  return (
    <>
      {/* Achievement Popup */}
      {showPopup && currentAchievement && currentAchievement.rarity && (
        <AchievementPopup achievement={currentAchievement} />
      )}
      
      {/* Export badge component for use in other components */}
      <div className="hidden">
        <AchievementBadge />
      </div>
    </>
  )
}

// Export the badge component separately for use in profiles, etc.
export const AchievementBadge = ({ achievement, size = 'md' }) => {
  // Add null checking for achievement
  if (!achievement) {
    return null
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-yellow-600'
    }
    return colors[rarity] || colors.common
  }

  const getRarityGlow = (rarity) => {
    const glows = {
      common: 'shadow-gray-500/50',
      rare: 'shadow-blue-500/50',
      epic: 'shadow-purple-500/50',
      legendary: 'shadow-yellow-500/50'
    }
    return glows[rarity] || glows.common
  }

  const rarity = achievement.rarity || 'common'

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-r ${getRarityColor(rarity)} rounded-full flex items-center justify-center shadow-lg ${getRarityGlow(rarity)} cursor-pointer hover:scale-110 transition-transform`}
      title={`${achievement.title} - ${achievement.description}`}
    >
      <span className="filter drop-shadow-sm">{achievement.emoji}</span>
    </div>
  )
}

export default AchievementSystem