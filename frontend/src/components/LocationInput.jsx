/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Location Input - Autocomplete location input with current location detection
 */

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, X } from 'lucide-react'

const LocationInput = ({ value, onChange, placeholder = "Add location..." }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Mock popular locations for demo
  const popularLocations = [
    "Crystal Cave, Arkansas",
    "Herkimer County, New York", 
    "Franklin, North Carolina",
    "Crater of Diamonds State Park, Arkansas",
    "Emerald Hollow Mine, North Carolina",
    "Rockhound State Park, New Mexico",
    "Petoskey State Park, Michigan",
    "Oregon Sunstone Public Collection Area",
    "Spectrum Sunstone Mine, Oregon",
    "Ruby Beach, Washington"
  ]

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In real app, use reverse geocoding API
          // For demo, using mock location
          const mockLocation = {
            name: "Your Current Location",
            fullName: "Current Location (37.7749, -122.4194)",
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
          setCurrentLocation(mockLocation)
        } catch (error) {
          setLocationError('Failed to get location name')
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        setLocationError('Unable to retrieve your location')
        setLoading(false)
      },
      { timeout: 10000 }
    )
  }

  const handleInputChange = (e) => {
    const input = e.target.value
    onChange(input)
    
    if (input.length > 2) {
      setIsOpen(true)
      searchLocations(input)
    } else {
      setIsOpen(false)
      setSuggestions([])
    }
  }

  const searchLocations = async (query) => {
    setLoading(true)
    
    // Mock search - in real app, use Google Places API or similar
    const filtered = popularLocations.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    )
    
    // Add some dynamic suggestions
    const dynamicSuggestions = [
      `${query}, USA`,
      `${query} State Park`,
      `${query} Mine`,
      `${query} Beach`
    ].filter(suggestion => 
      !filtered.some(loc => loc.toLowerCase() === suggestion.toLowerCase())
    )

    setTimeout(() => {
      setSuggestions([...filtered, ...dynamicSuggestions.slice(0, 3)])
      setLoading(false)
    }, 300)
  }

  const handleSelectLocation = (location) => {
    onChange(location)
    setIsOpen(false)
    setSuggestions([])
    inputRef.current?.blur()
  }

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      onChange(currentLocation.fullName)
      setIsOpen(false)
    }
  }

  const clearLocation = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {value && (
          <button
            onClick={clearLocation}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
        >
          {/* Current Location Option */}
          {currentLocation && !value && (
            <button
              onClick={handleUseCurrentLocation}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 flex items-center space-x-2"
            >
              <Navigation className="h-4 w-4 text-blue-600" />
              <div>
                <div className="font-medium text-blue-600">Use Current Location</div>
                <div className="text-sm text-gray-500">{currentLocation.fullName}</div>
              </div>
            </button>
          )}

          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-gray-500 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Searching locations...</span>
            </div>
          )}

          {/* Suggestions */}
          {!loading && suggestions.length > 0 && (
            <>
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectLocation(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{location}</span>
                </button>
              ))}
            </>
          )}

          {/* No Results */}
          {!loading && suggestions.length === 0 && value.length > 2 && (
            <div className="px-4 py-3 text-gray-500">
              No locations found for "{value}"
            </div>
          )}

          {/* Popular Locations (when no input) */}
          {!loading && !value && (
            <>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-b border-gray-100">
                Popular Rock Hunting Locations
              </div>
              {popularLocations.slice(0, 5).map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectLocation(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{location}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default LocationInput