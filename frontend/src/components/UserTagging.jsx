/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * User Tagging - Tag users in posts and events
 */

import { useState, useEffect, useRef } from 'react'
import { User, X, AtSign } from 'lucide-react'

const UserTagging = ({ value, onChange, placeholder = "Tag users..." }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  // Mock users for demo
  const mockUsers = [
    { id: 1, username: 'rockhound_sarah', avatar: null, fullName: 'Sarah Johnson' },
    { id: 2, username: 'geology_mike', avatar: null, fullName: 'Mike Chen' },
    { id: 3, username: 'crystal_collector', avatar: null, fullName: 'Emma Davis' },
    { id: 4, username: 'fossil_finder', avatar: null, fullName: 'James Wilson' },
    { id: 5, username: 'mineral_maven', avatar: null, fullName: 'Alex Rodriguez' },
    { id: 6, username: 'stone_seeker', avatar: null, fullName: 'Lisa Thompson' },
    { id: 7, username: 'rock_explorer', avatar: null, fullName: 'David Kim' },
    { id: 8, username: 'gem_hunter', avatar: null, fullName: 'Rachel Green' }
  ]

  useEffect(() => {
    // Update parent component with selected users
    onChange(selectedUsers)
  }, [selectedUsers, onChange])

  const handleInputChange = (e) => {
    const input = e.target.value
    setInputValue(input)
    
    if (input.length > 0) {
      setIsOpen(true)
      searchUsers(input)
    } else {
      setIsOpen(false)
      setSuggestions([])
    }
  }

  const searchUsers = async (query) => {
    setLoading(true)
    
    // Mock search - in real app, this would be an API call
    const filtered = mockUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.fullName.toLowerCase().includes(query.toLowerCase())
    ).filter(user => 
      !selectedUsers.some(selected => selected.id === user.id)
    )

    setTimeout(() => {
      setSuggestions(filtered.slice(0, 5))
      setLoading(false)
    }, 200)
  }

  const handleSelectUser = (user) => {
    setSelectedUsers(prev => [...prev, user])
    setInputValue('')
    setIsOpen(false)
    setSuggestions([])
    inputRef.current?.focus()
  }

  const handleRemoveUser = (userId) => {
    setSelectedUsers(prev => prev.filter(user => user.id !== userId))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && selectedUsers.length > 0) {
      // Remove last selected user on backspace when input is empty
      setSelectedUsers(prev => prev.slice(0, -1))
    }
  }

  return (
    <div className="relative">
      <div className="min-h-[42px] w-full border border-gray-300 rounded-md p-2 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {/* Selected Users */}
        {selectedUsers.map((user) => (
          <div 
            key={user.id}
            className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
          >
            <div className="w-4 h-4 bg-blue-200 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <User className="h-2 w-2 text-blue-600" />
              )}
            </div>
            <span>@{user.username}</span>
            <button
              onClick={() => handleRemoveUser(user.id)}
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {/* Input */}
        <div className="flex-1 min-w-[120px] relative">
          <div className="flex items-center">
            <AtSign className="h-4 w-4 text-gray-400 mr-1" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (inputValue.length > 0) setIsOpen(true)
              }}
              placeholder={selectedUsers.length === 0 ? placeholder : ""}
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="px-4 py-3 text-gray-500 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Searching users...</span>
            </div>
          )}

          {/* Suggestions */}
          {!loading && suggestions.length > 0 && (
            <>
              {suggestions.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">@{user.username}</div>
                    <div className="text-sm text-gray-500">{user.fullName}</div>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* No Results */}
          {!loading && suggestions.length === 0 && inputValue.length > 0 && (
            <div className="px-4 py-3 text-gray-500">
              No users found for "{inputValue}"
            </div>
          )}

          {/* Popular Users (when no input) */}
          {!loading && inputValue === '' && (
            <>
              <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border-b border-gray-100">
                Suggested Users
              </div>
              {mockUsers.slice(0, 4).filter(user => 
                !selectedUsers.some(selected => selected.id === user.id)
              ).map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">@{user.username}</div>
                    <div className="text-sm text-gray-500">{user.fullName}</div>
                  </div>
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

export default UserTagging