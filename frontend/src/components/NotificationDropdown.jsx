/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Notification Dropdown - Shows user notifications with badges
 */

import { useState, useEffect, useRef } from 'react'
import { Bell, Heart, MessageCircle, Calendar, Trophy, X } from 'lucide-react'

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef(null)

  // Mock notifications for demo
  const mockNotifications = [
    {
      id: 1,
      type: 'like',
      message: 'Sarah liked your rock discovery',
      time: '2 minutes ago',
      isRead: false,
      user: 'Sarah',
      icon: <Heart className="h-4 w-4 text-red-500" />
    },
    {
      id: 2,
      type: 'comment',
      message: 'Mike commented on your post: "Amazing quartz formation!"',
      time: '15 minutes ago',
      isRead: false,
      user: 'Mike',
      icon: <MessageCircle className="h-4 w-4 text-blue-500" />
    },
    {
      id: 3,
      type: 'hunt',
      message: 'New hunt event: "Weekend Fossil Hunt" starts tomorrow',
      time: '1 hour ago',
      isRead: false,
      user: 'Rock Spotter',
      icon: <Calendar className="h-4 w-4 text-purple-500" />
    },
    {
      id: 4,
      type: 'achievement',
      message: 'You earned a new badge: "First 10 Discoveries" 🏆',
      time: '2 hours ago',
      isRead: true,
      user: 'System',
      icon: <Trophy className="h-4 w-4 text-yellow-500" />
    },
    {
      id: 5,
      type: 'like',
      message: 'Alex and 3 others liked your granite specimen',
      time: '4 hours ago',
      isRead: true,
      user: 'Alex',
      icon: <Heart className="h-4 w-4 text-red-500" />
    }
  ]

  useEffect(() => {
    // Simulate loading notifications
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
    setUnreadCount(0)
  }

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
    if (!notifications.find(n => n.id === notificationId)?.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  const getNotificationBg = (type, isRead) => {
    if (isRead) return 'bg-gray-50'
    
    switch (type) {
      case 'like': return 'bg-red-50 border-l-4 border-red-500'
      case 'comment': return 'bg-blue-50 border-l-4 border-blue-500'
      case 'hunt': return 'bg-purple-50 border-l-4 border-purple-500'
      case 'achievement': return 'bg-yellow-50 border-l-4 border-yellow-500'
      default: return 'bg-gray-50'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-full hover:bg-gray-100"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
                <p className="text-sm">When you get likes, comments, or hunt updates, they'll appear here!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 ${getNotificationBg(notification.type, notification.isRead)} hover:bg-gray-100 cursor-pointer transition-colors`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown