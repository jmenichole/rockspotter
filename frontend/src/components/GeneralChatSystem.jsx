/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * General Chat System - Public chat for online users
 */

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, Users, Eye, EyeOff, X, Smile, Crown } from 'lucide-react'

const GeneralChatSystem = ({ user, isVisible, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState([])
  const [isOnline, setIsOnline] = useState(true)
  const [isInvisible, setIsInvisible] = useState(false)
  const messagesEndRef = useRef(null)
  const chatInputRef = useRef(null)

  // Mock online users
  const mockOnlineUsers = [
    { id: 1, username: 'jmenichole', role: 'admin', isOnline: true, lastSeen: Date.now() },
    { id: 2, username: 'crystal_collector', role: 'user', isOnline: true, lastSeen: Date.now() },
    { id: 3, username: 'fossil_finder', role: 'user', isOnline: true, lastSeen: Date.now() },
    { id: 4, username: 'rock_explorer', role: 'user', isOnline: false, lastSeen: Date.now() - 5 * 60 * 1000 },
    { id: 5, username: 'mineral_maven', role: 'user', isOnline: true, lastSeen: Date.now() }
  ]

  // Mock chat messages
  const mockMessages = [
    {
      id: 1,
      userId: 2,
      username: 'crystal_collector',
      role: 'user',
      content: 'Hey everyone! Just found an amazing amethyst cluster today! 💎',
      timestamp: Date.now() - 30 * 60 * 1000,
      type: 'message'
    },
    {
      id: 2,
      userId: 3,
      username: 'fossil_finder',
      role: 'user',
      content: 'Nice find! Where did you discover it?',
      timestamp: Date.now() - 25 * 60 * 1000,
      type: 'message'
    },
    {
      id: 3,
      userId: 1,
      username: 'jmenichole',
      role: 'admin',
      content: 'Welcome to the Rock Spotter general chat! Share your discoveries and connect with fellow enthusiasts! 🪨',
      timestamp: Date.now() - 20 * 60 * 1000,
      type: 'announcement'
    },
    {
      id: 4,
      userId: 5,
      username: 'mineral_maven',
      role: 'user',
      content: 'That sounds incredible! I\'m planning a trip to Arkansas next week for some crystal hunting.',
      timestamp: Date.now() - 15 * 60 * 1000,
      type: 'message'
    }
  ]

  useEffect(() => {
    setMessages(mockMessages)
    setOnlineUsers(mockOnlineUsers)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !user) return

    const message = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      role: user.role || 'user',
      content: newMessage.trim(),
      timestamp: Date.now(),
      type: 'message'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    chatInputRef.current?.focus()
  }

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    if (!isOnline) {
      setIsInvisible(false)
    }
  }

  const toggleInvisibleMode = () => {
    setIsInvisible(!isInvisible)
    if (!isInvisible) {
      setIsOnline(true)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return 'now'
    if (minutes < 60) return `${minutes}m`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    
    const days = Math.floor(hours / 24)
    return `${days}d`
  }

  const getUserStatusColor = (user) => {
    if (!user.isOnline) return 'bg-gray-400'
    return 'bg-green-500'
  }

  if (!isVisible) return null

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40"
        title="General Chat"
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7 mx-auto" />
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">General Chat</h3>
                  <p className="text-xs text-blue-100">
                    {onlineUsers.filter(u => u.isOnline).length} online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Online Status Toggle */}
                <button
                  onClick={toggleOnlineStatus}
                  className={`p-1 rounded-full transition-colors ${
                    isOnline ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                  title={isOnline ? 'You are online' : 'You are offline'}
                >
                  {isOnline ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </button>
                
                {/* Invisible Mode Toggle */}
                {isOnline && (
                  <button
                    onClick={toggleInvisibleMode}
                    className={`p-1 rounded-full transition-colors ${
                      isInvisible ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/20 hover:bg-white/30'
                    }`}
                    title={isInvisible ? 'Invisible mode on' : 'Invisible mode off'}
                  >
                    <EyeOff className="h-3 w-3" />
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.type === 'announcement' 
                    ? 'bg-blue-100 border border-blue-200 rounded-lg p-2 text-center'
                    : message.userId === user?.id
                    ? 'ml-8'
                    : 'mr-8'
                }`}
              >
                {message.type === 'announcement' ? (
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Crown className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-800">Admin Announcement</span>
                    </div>
                    <p className="text-sm text-blue-900">{message.content}</p>
                  </div>
                ) : (
                  <div
                    className={`p-2 rounded-lg max-w-xs ${
                      message.userId === user?.id
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.userId !== user?.id && (
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-xs font-medium text-gray-900">
                          {message.username}
                        </span>
                        {message.role === 'admin' && (
                          <Crown className="h-3 w-3 text-yellow-500" />
                        )}
                      </div>
                    )}
                    <p className={`text-sm ${
                      message.userId === user?.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.userId === user?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Online Users Sidebar */}
          <div className="border-t border-gray-200 p-2 bg-gray-50">
            <div className="flex items-center space-x-1 mb-2">
              <Users className="h-3 w-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">
                Online ({onlineUsers.filter(u => u.isOnline).length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {onlineUsers.filter(u => u.isOnline).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 text-xs"
                >
                  <div className={`w-2 h-2 rounded-full ${getUserStatusColor(user)}`}></div>
                  <span className="text-gray-700">{user.username}</span>
                  {user.role === 'admin' && (
                    <Crown className="h-2 w-2 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          {user && (
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  maxLength={200}
                />
                <button
                  type="button"
                  className="px-2 py-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Smile className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {newMessage.length}/200 characters
              </div>
            </form>
          )}

          {!user && (
            <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg text-center">
              <p className="text-sm text-gray-600">Please log in to join the chat</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default GeneralChatSystem