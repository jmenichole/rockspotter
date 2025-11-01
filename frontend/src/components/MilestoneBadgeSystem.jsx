/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Milestone Badge System - Automatic humorous platform milestone badges
 */

import { useState, useEffect } from 'react'
import { Trophy, Zap, Star, Crown } from 'lucide-react'

// Humorous milestone badge definitions
const milestoneDefinitions = [
  // Social Interaction Milestones
  {
    id: 'chat_master',
    title: 'Chatterbox Champion',
    description: 'Posted 50+ comments - the neighborhood geology expert!',
    emoji: '🗣️',
    rarity: 'rare',
    points: 100,
    trigger: { type: 'comments_made', count: 50 }
  },
  {
    id: 'like_magnet',
    title: 'Like Magnet',
    description: 'Received 100 likes - your rocks are pure gold!',
    emoji: '🧲',
    rarity: 'epic',
    points: 150,
    trigger: { type: 'likes_received', count: 100 }
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Made 20 friends - spreading geological goodness!',
    emoji: '🦋',
    rarity: 'rare',
    points: 75,
    trigger: { type: 'friends_count', count: 20 }
  },
  {
    id: 'night_owl',
    title: 'Midnight Rock Hound',
    description: 'Posted at 2 AM - dedication to geology knows no bounds!',
    emoji: '🦉',
    rarity: 'legendary',
    points: 200,
    trigger: { type: 'late_night_post', count: 1 }
  },

  // Content Creation Milestones
  {
    id: 'prolific_poster',
    title: 'Rock Star Blogger',
    description: 'Shared 25 rock discoveries - geological genius!',
    emoji: '⭐',
    rarity: 'epic',
    points: 125,
    trigger: { type: 'posts_created', count: 25 }
  },
  {
    id: 'photo_virtuoso',
    title: 'Picture Perfect Geologist',
    description: 'All your photos got 10+ likes - Instagram worthy!',
    emoji: '📸',
    rarity: 'epic',
    points: 175,
    trigger: { type: 'popular_photos', count: 5 }
  },
  {
    id: 'story_teller',
    title: 'Rock Whisperer',
    description: 'Wrote epic descriptions averaging 200+ words',
    emoji: '📖',
    rarity: 'rare',
    points: 90,
    trigger: { type: 'long_descriptions', count: 10 }
  },

  // Platform Engagement Milestones
  {
    id: 'first_week',
    title: 'Rookie Rock Spotter',
    description: 'Survived your first week - welcome to the club!',
    emoji: '🎉',
    rarity: 'common',
    points: 25,
    trigger: { type: 'days_active', count: 7 }
  },
  {
    id: 'daily_habit',
    title: 'Geological Addict',
    description: 'Visited 30 days in a row - seriously, touch grass!',
    emoji: '🔥',
    rarity: 'legendary',
    points: 300,
    trigger: { type: 'daily_streak', count: 30 }
  },
  {
    id: 'early_bird',
    title: 'Dawn Patrol Geologist',
    description: 'Posted before 6 AM - respect the commitment!',
    emoji: '🌅',
    rarity: 'rare',
    points: 80,
    trigger: { type: 'early_morning_post', count: 1 }
  },

  // Community Interaction
  {
    id: 'helpful_soul',
    title: 'The Rock Guru',
    description: 'Answered 25 questions from fellow rock spotters',
    emoji: '🧙‍♂️',
    rarity: 'epic',
    points: 160,
    trigger: { type: 'helpful_responses', count: 25 }
  },
  {
    id: 'debate_champion',
    title: 'Geology Debate Champion',
    description: 'Started 10 heated discussions about rock classification',
    emoji: '⚔️',
    rarity: 'rare',
    points: 95,
    trigger: { type: 'controversial_posts', count: 10 }
  },
  {
    id: 'love_spreader',
    title: 'Heart Distributor',
    description: 'Gave out 200 likes - spreading the geological love!',
    emoji: '💖',
    rarity: 'rare',
    points: 70,
    trigger: { type: 'likes_given', count: 200 }
  },

  // Special Achievement Milestones
  {
    id: 'unicorn_finder',
    title: 'Unicorn Rock Hunter',
    description: 'Found a rock so rare, people think you made it up!',
    emoji: '🦄',
    rarity: 'legendary',
    points: 500,
    trigger: { type: 'rare_rock_discovery', count: 1 }
  },
  {
    id: 'meme_lord',
    title: 'Geological Meme Lord',
    description: 'Posted rock memes that made everyone laugh',
    emoji: '😂',
    rarity: 'epic',
    points: 140,
    trigger: { type: 'funny_posts', count: 5 }
  },
  {
    id: 'location_master',
    title: 'GPS Geological Master',
    description: 'Tagged locations in 15 different states/countries',
    emoji: '🗺️',
    rarity: 'legendary',
    points: 250,
    trigger: { type: 'unique_locations', count: 15 }
  },
  {
    id: 'mentor_status',
    title: 'Rock Sensei',
    description: 'Helped 5 newbies find their first rocks',
    emoji: '🥋',
    rarity: 'epic',
    points: 180,
    trigger: { type: 'mentoring_sessions', count: 5 }
  }
]

const MilestoneBadgeSystem = ({ user, userStats, onBadgeEarned }) => {
  const [earnedBadges, setEarnedBadges] = useState([])
  const [showBadgePopup, setShowBadgePopup] = useState(false)
  const [currentBadge, setCurrentBadge] = useState(null)

  useEffect(() => {
    if (userStats) {
      checkForNewMilestones()
    }
  }, [userStats])

  const checkForNewMilestones = () => {
    milestoneDefinitions.forEach(milestone => {
      if (!earnedBadges.find(badge => badge.id === milestone.id)) {
        if (checkMilestoneTrigger(milestone.trigger, userStats)) {
          earnBadge(milestone)
        }
      }
    })
  }

  const checkMilestoneTrigger = (trigger, stats) => {
    switch (trigger.type) {
      case 'comments_made':
        return stats.commentsCount >= trigger.count
      case 'likes_received':
        return stats.likesReceived >= trigger.count
      case 'friends_count':
        return stats.friendsCount >= trigger.count
      case 'posts_created':
        return stats.postsCount >= trigger.count
      case 'popular_photos':
        return stats.popularPhotos >= trigger.count
      case 'days_active':
        return stats.daysActive >= trigger.count
      case 'daily_streak':
        return stats.currentStreak >= trigger.count
      case 'likes_given':
        return stats.likesGiven >= trigger.count
      case 'unique_locations':
        return stats.uniqueLocations >= trigger.count
      case 'late_night_post':
        return stats.lateNightPosts >= trigger.count
      case 'early_morning_post':
        return stats.earlyMorningPosts >= trigger.count
      case 'long_descriptions':
        return stats.longDescriptions >= trigger.count
      case 'helpful_responses':
        return stats.helpfulResponses >= trigger.count
      case 'controversial_posts':
        return stats.controversialPosts >= trigger.count
      case 'rare_rock_discovery':
        return stats.rareRockDiscoveries >= trigger.count
      case 'funny_posts':
        return stats.funnyPosts >= trigger.count
      case 'mentoring_sessions':
        return stats.mentoringsSessions >= trigger.count
      default:
        return false
    }
  }

  const earnBadge = (milestone) => {
    const newBadge = {
      ...milestone,
      earnedAt: new Date().toISOString(),
      id: milestone.id
    }

    setEarnedBadges(prev => [...prev, newBadge])
    setCurrentBadge(newBadge)
    setShowBadgePopup(true)

    // Trigger confetti animation and sound effect
    if (onBadgeEarned) {
      onBadgeEarned(newBadge)
    }

    // Auto-hide popup after 5 seconds
    setTimeout(() => {
      setShowBadgePopup(false)
    }, 5000)
  }

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-yellow-600'
    }
    return colors[rarity] || 'from-gray-400 to-gray-600'
  }

  const getRarityGlow = (rarity) => {
    const glows = {
      common: 'shadow-gray-500/50',
      rare: 'shadow-blue-500/50',
      epic: 'shadow-purple-500/50',
      legendary: 'shadow-yellow-500/50'
    }
    return glows[rarity] || 'shadow-gray-500/50'
  }

  return (
    <>
      {/* Badge Earned Popup */}
      {showBadgePopup && currentBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform animate-bounce">
            <div className="text-center">
              {/* Badge Icon with Glow Effect */}
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${getRarityColor(currentBadge.rarity)} flex items-center justify-center shadow-lg ${getRarityGlow(currentBadge.rarity)} text-3xl`}>
                {currentBadge.emoji}
              </div>

              {/* Celebration Header */}
              <div className="flex items-center justify-center mb-3">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Milestone Achieved!</h2>
                <Trophy className="h-6 w-6 text-yellow-500 ml-2" />
              </div>

              {/* Badge Details */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentBadge.title}</h3>
              <p className="text-gray-600 mb-4">{currentBadge.description}</p>

              {/* Points and Rarity */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{currentBadge.points} points</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${currentBadge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' : currentBadge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' : currentBadge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {currentBadge.rarity.charAt(0).toUpperCase() + currentBadge.rarity.slice(1)}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowBadgePopup(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                Awesome! 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Collection Display */}
      {earnedBadges.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            Recent Milestones
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {earnedBadges.slice(-6).map((badge) => (
              <div
                key={badge.id}
                className={`relative p-3 rounded-lg bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-lg ${getRarityGlow(badge.rarity)} hover:scale-105 transition-transform duration-200 cursor-pointer`}
                title={`${badge.title}: ${badge.description}`}
              >
                <div className="text-2xl text-center mb-1">{badge.emoji}</div>
                <div className="text-xs text-white text-center font-medium truncate">
                  {badge.title}
                </div>
                {badge.rarity === 'legendary' && (
                  <div className="absolute -top-1 -right-1">
                    <Crown className="h-4 w-4 text-yellow-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export { MilestoneBadgeSystem, milestoneDefinitions }