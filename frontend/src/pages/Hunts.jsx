/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Hunts Page - Rock hunting events and community activities with calendar
 */

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Trophy, Plus, Clock, Grid, List, HelpCircle, X } from 'lucide-react'
import { useNotifications } from '../components/NotificationSystem'

const Hunts = () => {
  const [huntList, setHuntList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('list') // list or calendar
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const { showSuccess, showError } = useNotifications()

  // Create Hunt Form State
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    difficulty: 'medium',
    maxParticipants: 20,
    rocks: []
  })

  // Mock hunt events for demonstration
  const mockHunts = [
    {
      id: 1,
      title: 'Weekend Fossil Hunt',
      description: 'Search for ancient fossils in the limestone formations of Miller Canyon',
      location: 'Miller Canyon, Utah',
      startDate: '2025-10-20T09:00:00Z',
      endDate: '2025-10-20T16:00:00Z',
      difficulty: 'medium',
      participants: 12,
      maxParticipants: 20,
      organizer: 'GeoExplorer',
      rocks: ['fossils', 'limestone', 'trilobites']
    },
    {
      id: 2,
      title: 'Crystal Discovery Expedition',
      description: 'Hunt for beautiful quartz crystals and amethyst specimens',
      location: 'Crystal Caverns, Arizona',
      startDate: '2025-10-22T08:00:00Z',
      endDate: '2025-10-22T17:00:00Z',
      difficulty: 'easy',
      participants: 8,
      maxParticipants: 15,
      organizer: 'CrystalHunter',
      rocks: ['quartz', 'amethyst', 'crystals']
    }
  ]

  useEffect(() => {
    loadHunts()
  }, [])

  const loadHunts = async () => {
    try {
      setLoading(true)
      // For now, use mock data
      setTimeout(() => {
        setHuntList(mockHunts)
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError('Failed to load hunts. Please try again.')
      console.error('Error loading hunts:', error)
    }
  }

  const handleCreateHunt = async (e) => {
    e.preventDefault()
    
    if (!createForm.title || !createForm.startDate || !createForm.location) {
      showError('Please fill in all required fields')
      return
    }

    try {
      // In a real app, this would be an API call
      const newHunt = {
        id: Date.now(),
        ...createForm,
        participants: 0,
        organizer: 'You'
      }
      
      setHuntList(prev => [...prev, newHunt])
      setCreateForm({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        difficulty: 'medium',
        maxParticipants: 20,
        rocks: []
      })
      setShowCreateForm(false)
      showSuccess('Hunt event created successfully!')
    } catch (error) {
      showError('Failed to create hunt event')
    }
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getHuntStatus = (hunt) => {
    const now = new Date()
    const startDate = new Date(hunt.startDate)
    const endDate = new Date(hunt.endDate)

    if (now < startDate) return { status: 'upcoming', label: 'Upcoming', color: 'bg-blue-100 text-blue-800' }
    if (now > endDate) return { status: 'ended', label: 'Ended', color: 'bg-gray-100 text-gray-800' }
    return { status: 'active', label: 'Active', color: 'bg-green-100 text-green-800' }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading hunts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rock Hunt Events</h1>
            <p className="text-gray-600">Organize and join geological adventures</p>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors"
            title="Help & Tips"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Hunt Events List */}
      <div className="space-y-4">
        {huntList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Trophy className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hunt events yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to create an exciting rock hunting adventure!
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Event
            </button>
          </div>
        ) : (
          huntList.map((hunt) => {
            const status = getHuntStatus(hunt)
            return (
              <div key={hunt.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{hunt.title}</h3>
                        <p className="text-gray-600 mb-3">{hunt.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{formatDate(hunt.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{hunt.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{hunt.participants}/{hunt.maxParticipants} joined</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hunt.difficulty)}`}>
                          {hunt.difficulty}
                        </span>
                      </div>
                    </div>

                    {hunt.rocks && hunt.rocks.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm text-gray-500">Target rocks: </span>
                        <div className="inline-flex flex-wrap gap-1">
                          {hunt.rocks.map((rock, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {rock}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <button className="w-full md:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      {status.status === 'upcoming' ? 'Join Hunt' : status.status === 'active' ? 'View Live' : 'View Results'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Create Hunt Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Create Hunt Event</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateHunt} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={createForm.title}
                    onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Weekend Fossil Hunt"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe what participants will hunt for and any special details..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={createForm.location}
                    onChange={(e) => setCreateForm({...createForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Crystal Caverns, Arizona"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={createForm.startDate}
                    onChange={(e) => setCreateForm({...createForm, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={createForm.endDate}
                    onChange={(e) => setCreateForm({...createForm, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={createForm.difficulty}
                    onChange={(e) => setCreateForm({...createForm, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="easy">Easy - Beginner friendly</option>
                    <option value="medium">Medium - Some experience needed</option>
                    <option value="hard">Hard - Advanced hunters only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    value={createForm.maxParticipants}
                    onChange={(e) => setCreateForm({...createForm, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Hunt Events Help</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">📍 Creating Events</h4>
                <p>Click "Create Event" to organize a hunt. Set dates, location, difficulty, and specify what types of rocks to find.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">🎯 Joining Hunts</h4>
                <p>Browse upcoming events and join ones that interest you. Check difficulty levels and participant limits.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">🏆 Event Status</h4>
                <p>Events show as Upcoming (blue), Active (green), or Ended (gray). Join before they're full!</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">🔔 Notifications</h4>
                <p>Get notified when events you've joined are starting or when new events in your area are created.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hunts