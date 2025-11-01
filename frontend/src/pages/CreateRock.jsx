/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Create Rock Page - Share rock discoveries with the community
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, MapPin, Tag, Users } from 'lucide-react'
import { rocks } from '../utils/api'
import LocationInput from '../components/LocationInput'
import UserTagging from '../components/UserTagging'

const CreateRock = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo: '',
    rockType: '',
    tags: '',
    location: '',
    taggedUsers: [],
    isPublic: true
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const rockTypes = ['igneous', 'sedimentary', 'metamorphic', 'minerals', 'fossils']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleLocationChange = (location) => {
    setFormData({
      ...formData,
      location: location
    })
  }

  const handleTaggedUsersChange = (users) => {
    setFormData({
      ...formData,
      taggedUsers: users
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Process tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // Prepare rock data
      const rockData = {
        ...formData,
        tags: tagsArray,
        location: formData.location.address ? {
          type: 'Point',
          coordinates: [0, 0], // Default coordinates, in real app would use geocoding
          address: formData.location.address
        } : undefined
      }

      await rocks.create(rockData)
      navigate('/feed')
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Failed to create rock. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Share a Rock</h1>
          <p className="text-gray-600">Add your geological discovery to the community</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Rock Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Give your rock a descriptive title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your rock discovery, its characteristics, where you found it..."
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              <Camera className="inline h-4 w-4 mr-1" />
              Photo URL
            </label>
            <input
              type="url"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/your-rock-photo.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              For demo purposes, please provide a direct link to an image (e.g., from Unsplash)
            </p>
          </div>

          {/* Rock Type */}
          <div>
            <label htmlFor="rockType" className="block text-sm font-medium text-gray-700 mb-2">
              Rock Type *
            </label>
            <select
              id="rockType"
              name="rockType"
              value={formData.rockType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select rock type</option>
              {rockTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Location
            </label>
            <LocationInput
              value={formData.location}
              onChange={handleLocationChange}
              placeholder="Where did you find this rock? (e.g., Crystal Cave, Arkansas)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Start typing or use current location for quick selection
            </p>
          </div>

          {/* User Tagging */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Tag Users
            </label>
            <UserTagging
              value={formData.taggedUsers}
              onChange={handleTaggedUsersChange}
              placeholder="Tag rock spotters who were with you..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Tag friends who helped you find this rock or were on the hunt with you
            </p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="granite, quartz, beach, hiking (separate with commas)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Add tags to help others find your rock (separate with commas)
            </p>
          </div>

          {/* Visibility */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
              Make this rock visible to the public
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Publishing Post...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateRock