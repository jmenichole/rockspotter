/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Featured Finds Carousel - Top 5 most interactive photos rotating display
 */

import { useState, useEffect, useRef } from 'react'
import SmartImage from './SmartImage'
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Star, MapPin, User } from 'lucide-react'

const FeaturedFindsCarousel = ({ totalUploads = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [featuredFinds, setFeaturedFinds] = useState([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  // Mock featured finds data - in real app this would be API call
  const mockFeaturedFinds = [
    {
      id: 1,
      title: 'Stunning Amethyst Cathedral',
      user: {
        username: 'crystal_collector',
        avatar: null
      },
      location: 'Crystal Cave, Arkansas',
      likes: 147,
      comments: 23,
      shares: 12,
      totalInteractions: 182,
      description: 'Found this incredible amethyst cathedral in the depths of Crystal Cave. The formations are absolutely breathtaking!'
    },
    {
      id: 2,
      title: 'Perfect Herkimer Diamond',
      user: {
        username: 'mineral_maven',
        avatar: null
      },
      location: 'Herkimer County, New York',
      likes: 134,
      comments: 31,
      shares: 8,
      totalInteractions: 173,
      description: 'Double-terminated quartz crystal with incredible clarity. Nature is the ultimate artist!'
    },
    {
      id: 3,
      title: 'Ancient Trilobite Fossil',
      user: {
        username: 'fossil_finder',
        avatar: null
      },
      location: 'Fossil Beach, Utah',
      likes: 156,
      comments: 18,
      shares: 15,
      totalInteractions: 189,
      description: '500 million year old trilobite fossil discovered on a beach hunt. History in your hands!'
    },
    {
      id: 4,
      title: 'Rare Rainbow Fluorite',
      user: {
        username: 'rock_rainbow',
        avatar: null
      },
      location: 'Fluorite Mine, Illinois',
      likes: 142,
      comments: 27,
      shares: 9,
      totalInteractions: 178,
      description: 'The colors in this fluorite specimen are absolutely mesmerizing. Purple, green, and blue all in one!'
    },
    {
      id: 5,
      title: 'Fire Opal Specimen',
      user: {
        username: 'opal_obsessed',
        avatar: null
      },
      location: 'Opal Fields, Nevada',
      likes: 128,
      comments: 22,
      shares: 11,
      totalInteractions: 161,
      description: 'Fire opal with incredible play of color. The orange and red flashes are stunning in sunlight!'
    }
  ]

  useEffect(() => {
    // Only show carousel if there are 10+ uploads to the platform
    if (totalUploads >= 10) {
      loadFeaturedFinds()
    }
  }, [totalUploads])

  useEffect(() => {
    if (isAutoPlaying && featuredFinds.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % featuredFinds.length)
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, featuredFinds.length])

  const loadFeaturedFinds = async () => {
    try {
      setLoading(true)
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Sort by total interactions (likes + comments + shares)
      const sortedFinds = mockFeaturedFinds.sort((a, b) => b.totalInteractions - a.totalInteractions)
      setFeaturedFinds(sortedFinds.slice(0, 5))
    } catch (error) {
      console.error('Error loading featured finds:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredFinds.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredFinds.length) % featuredFinds.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  // Don't render if less than 10 uploads
  if (totalUploads < 10) {
    return null
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading featured finds...</p>
        </div>
      </div>
    )
  }

  if (featuredFinds.length === 0) {
    return null
  }

  const currentFind = featuredFinds[currentSlide]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Finds</h2>
            <p className="text-gray-600 text-sm">Top discoveries from our community</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {currentSlide + 1} of {featuredFinds.length}
          </div>
          <div className="text-xs text-gray-400">
            Auto-rotating
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative h-80 md:h-96">
          {/* Current Slide */}
          <div className="absolute inset-0 transition-all duration-500 ease-in-out">
            {currentFind.image && (
              <SmartImage
                src={currentFind.image}
                alt={currentFind.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{currentFind.title}</h3>
                  <p className="text-gray-200 mb-3 line-clamp-2">{currentFind.description}</p>
                  
                  {/* User and Location */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-sm">@{currentFind.user.username}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{currentFind.location}</span>
                    </div>
                  </div>
                  
                  {/* Interaction Stats */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-sm">{currentFind.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{currentFind.comments}</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      {currentFind.totalInteractions} total interactions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {featuredFinds.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index
                ? 'bg-blue-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="flex items-center justify-center mt-3">
        <div className={`text-xs px-2 py-1 rounded-full ${
          isAutoPlaying 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isAutoPlaying ? '⏸️ Auto-playing' : '▶️ Paused'}
        </div>
      </div>
    </div>
  )
}

export default FeaturedFindsCarousel