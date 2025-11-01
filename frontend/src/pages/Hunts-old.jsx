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
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Trophy, Plus, Clock, Grid, List, HelpCircle, X } from 'lucide-react'
import { hunts } from '../utils/api'
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
    } finally {
      // setLoading(false) - handled in timeout for mock data
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

  // Calendar view helpers
  const getMonthEvents = (month, year) => {
    return huntList.filter(hunt => {
      const huntDate = new Date(hunt.startDate)
      return huntDate.getMonth() === month && huntDate.getFullYear() === year
    })
  }

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendarView = () => {
    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const monthEvents = getMonthEvents(currentMonth, currentYear)

    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = monthEvents.filter(event => {
        const eventDate = new Date(event.startDate)
        return eventDate.getDate() === day
      })

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-1 bg-white hover:bg-gray-50">
          <div className="font-medium text-gray-900">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, idx) => (
              <div
                key={idx}
                className="text-xs bg-primary-100 text-primary-700 px-1 py-0.5 rounded truncate"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              ‹
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 bg-primary-100 hover:bg-primary-200 rounded text-primary-700"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-700 bg-gray-50 border border-gray-200">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    )
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
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="h-4 w-4 inline mr-1" />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-1" />
              Calendar
            </button>
          </div>
          
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

      {/* Calendar or List View */}
      {viewMode === 'calendar' ? (
        renderCalendarView()
      ) : (
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
      )}

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
                <h4 className="font-medium text-gray-900">🗓️ Calendar View</h4>
                <p>Switch between list and calendar views to see events by date. Click calendar days to see event details.</p>
              </div>
              
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hunts
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {huntList.map((hunt) => {
            const huntStatus = getHuntStatus(hunt)
            
            return (
              <div key={hunt._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{hunt.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${huntStatus.color}`}>
                      {huntStatus.label}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{hunt.description}</p>

                  {/* Hunt Details */}
                  <div className="space-y-2 mb-4">
                    {/* Difficulty */}
                    <div className="flex items-center text-sm">
                      <Trophy className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-700 mr-2">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hunt.difficulty)}`}>
                        {hunt.difficulty?.charAt(0).toUpperCase() + hunt.difficulty?.slice(1)}
                      </span>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{formatDate(hunt.startDate)} - {formatDate(hunt.endDate)}</span>
                    </div>

                    {/* Participants */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{hunt.participants?.length || 0} participants</span>
                    </div>

                    {/* Rocks Count */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{hunt.rocks?.length || 0} rocks to find</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-gray-100">
                    {huntStatus.status === 'ended' ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed"
                      >
                        Hunt Ended
                      </button>
                    ) : huntStatus.status === 'upcoming' ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-not-allowed"
                      >
                        <Clock className="h-4 w-4 inline mr-2" />
                        Starts {formatDate(hunt.startDate)}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // TODO: Implement join hunt functionality
                          console.log('Join hunt:', hunt._id)
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Join Hunt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How Rock Hunts Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <strong>1. Join a Hunt</strong>
            <p>Browse available hunts and join ones that interest you</p>
          </div>
          <div>
            <strong>2. Find Rocks</strong>
            <p>Use clues and hints to discover rocks in the real world</p>
          </div>
          <div>
            <strong>3. Earn Achievements</strong>
            <p>Complete hunts to earn badges and build your reputation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hunts