/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Messaging System - Private messaging between users
 */

import { useState, useEffect, useRef } from 'react'
import { X, Send, User, Smile } from 'lucide-react'

const MessagingModal = ({ isOpen, onClose, recipient, currentUser }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && recipient) {
      loadMessages()
    }
  }, [isOpen, recipient])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMessages = async () => {
    try {
      setLoading(true)
      // Mock messages for demo - in real app this would be API call
      const mockMessages = [
        {
          id: 1,
          senderId: recipient._id,
          senderUsername: recipient.username,
          content: "Hey! I saw your amazing amethyst find. Where did you discover it?",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isCurrentUser: false
        },
        {
          id: 2,
          senderId: currentUser._id,
          senderUsername: currentUser.username,
          content: "Thanks! Found it at Crystal Cave in Arkansas. The lighting there is perfect for photos!",
          timestamp: new Date(Date.now() - 3000000).toISOString(),
          isCurrentUser: true
        },
        {
          id: 3,
          senderId: recipient._id,
          senderUsername: recipient.username,
          content: "That's awesome! I've been wanting to visit there. Any tips for a first-timer?",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          isCurrentUser: false
        }
      ]
      setMessages(mockMessages)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const message = {
        id: Date.now(),
        senderId: currentUser._id,
        senderUsername: currentUser.username,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      }

      setMessages(prev => [...prev, message])
      setNewMessage('')

      // In real app, send to API
      // await api.sendMessage(recipient._id, newMessage.trim())
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              {recipient?.avatar ? (
                <img 
                  src={recipient.avatar} 
                  alt={recipient.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-primary-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{recipient?.username}</h3>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No messages yet. Say hello! 👋</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                    message.isCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessagingModal