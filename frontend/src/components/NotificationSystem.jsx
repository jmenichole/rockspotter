/*
 * Rock Spotter - Professional Notification System
 * Copyright (c) 2025 Rock Spotter Community
 */

import React, { useState, useEffect } from 'react'
import { Check, X, AlertCircle, Info, Mail, User } from 'lucide-react'

const NotificationContainer = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

const Notification = ({ id, type, title, message, duration = 5000, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, duration)
    return () => clearTimeout(timer)
  }, [duration, onRemove])

  const getIcon = () => {
    switch (type) {
      case 'success': return <Check className="h-5 w-5" />
      case 'error': return <X className="h-5 w-5" />
      case 'warning': return <AlertCircle className="h-5 w-5" />
      case 'info': return <Info className="h-5 w-5" />
      case 'email': return <Mail className="h-5 w-5" />
      case 'user': return <User className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success': 
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error': 
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning': 
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info': 
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'email': 
        return 'bg-primary-50 border-primary-200 text-primary-800'
      case 'user': 
        return 'bg-purple-50 border-purple-200 text-purple-800'
      default: 
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div className={`notification p-4 rounded-lg border shadow-lg ${getColors()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold mb-1">
              {title}
            </h4>
          )}
          <p className="text-sm opacity-90">
            {message}
          </p>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    setNotifications(prev => [...prev, { ...notification, id }])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const showSuccess = (title, message) => {
    addNotification({ type: 'success', title, message })
  }

  const showError = (title, message) => {
    addNotification({ type: 'error', title, message })
  }

  const showInfo = (title, message) => {
    addNotification({ type: 'info', title, message })
  }

  const showEmailConfirmation = (email) => {
    addNotification({
      type: 'email',
      title: 'Welcome to Rock Spotter! 🪨',
      message: `A confirmation email has been sent to ${email}. Please check your inbox and click the verification link to activate your account.`,
      duration: 8000
    })
  }

  const showUserCreated = (username) => {
    addNotification({
      type: 'user',
      title: 'Account Created Successfully!',
      message: `Welcome ${username}! Your Rock Spotter journey begins now. Start exploring and sharing your geological discoveries.`,
      duration: 6000
    })
  }

  return {
    notifications,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showEmailConfirmation,
    showUserCreated,
    NotificationContainer: () => (
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    )
  }
}

export default NotificationContainer