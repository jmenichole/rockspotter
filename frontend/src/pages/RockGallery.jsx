/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Rock Gallery Page - Browse and discover rocks
 */

import { useState, useEffect } from 'react'
import SmartImage from '../components/SmartImage'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, Heart, MessageCircle, MapPin, Calendar } from 'lucide-react'
import { rocks } from '../utils/api'

const RockGallery = () => {
  const [rockList, setRockList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const rockTypes = ['igneous', 'sedimentary', 'metamorphic', 'minerals', 'fossils']

  useEffect(() => {
    loadRocks()
  }, [currentPage, selectedType, searchTerm])

  const loadRocks = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 12,
        ...(selectedType && { rockType: selectedType }),
        ...(searchTerm && { search: searchTerm })
      }
      
      const response = await rocks.getAll(params)
      setRockList(response.data.rocks)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      setError('Failed to load rocks. Please try again.')
      console.error('Error loading rocks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (rockId) => {
    try {
      await rocks.like(rockId)
      // Refresh the rock list to update like counts
      loadRocks()
    } catch (error) {
      console.error('Error liking rock:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getRockTypeColor = (type) => {
    const colors = {
      igneous: 'bg-red-100 text-red-800',
      sedimentary: 'bg-yellow-100 text-yellow-800',
      metamorphic: 'bg-purple-100 text-purple-800',
      minerals: 'bg-blue-100 text-blue-800',
      fossils: 'bg-green-100 text-green-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  if (loading && rockList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading rocks...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rock Gallery</h1>
          <p className="text-gray-600">Discover amazing geological specimens from our community</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Rock
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search rocks by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rock Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {rockTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Rocks Grid */}
      {rockList.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rocks found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedType 
              ? 'Try adjusting your search criteria'
              : 'Be the first to share a rock with the community!'
            }
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Rock
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rockList.map((rock) => (
            <div key={rock._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-video bg-gray-200 relative">
                {rock.photo ? (
                  <SmartImage
                    src={rock.photo}
                    alt={rock.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 hidden">
                  <span className="text-sm">No image</span>
                </div>
                
                {/* Rock Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRockTypeColor(rock.rockType)}`}>
                    {rock.rockType?.charAt(0).toUpperCase() + rock.rockType?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{rock.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{rock.description}</p>

                {/* Location */}
                {rock.location?.address && (
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{rock.location.address}</span>
                  </div>
                )}

                {/* Tags */}
                {rock.tags && rock.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rock.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {rock.tags.length > 3 && (
                      <span className="text-xs text-gray-500 self-center">
                        +{rock.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleLike(rock._id)}
                      className="flex items-center space-x-1 hover:text-red-600 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{rock.likes?.length || 0}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{rock.comments?.length || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(rock.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 border rounded-md text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default RockGallery