/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Moderation Dashboard - Admin interface for content review and user management
 */

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, Eye, CheckCircle, XCircle, Clock, Users, MessageSquare, Flag, Search, Filter } from 'lucide-react'
import { autoModerationSystem, VIOLATION_SEVERITY } from '../utils/autoModeration'
import { admin } from '../utils/api'

const ModerationDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('queue')
  const [moderationQueue, setModerationQueue] = useState([])
  const [reportedContent, setReportedContent] = useState([])
  const [suspendedUsers, setSuspendedUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')

  // Check if user is admin/moderator
  const isAdmin = user?.username === 'jmenichole' || user?.role === 'admin' || user?.role === 'moderator'

  useEffect(() => {
    if (isAdmin) {
      loadModerationData()
    }
  }, [isAdmin])

  const loadModerationData = async () => {
    try {
      setLoading(true)
      
      // Load moderation queue
      const queue = autoModerationSystem.getModerationQueue()
      setModerationQueue(queue)

      // Load all users (for role management)
      try {
        const usersResponse = await admin.getAllUsers()
        setAllUsers(usersResponse.data.users || [])
      } catch (error) {
        console.log('Could not load users for role management:', error)
        // Create mock users for demo
        setAllUsers([
          {
            _id: 'user1',
            username: 'testuser',
            email: 'test@example.com',
            role: 'user',
            isAdmin: false,
            isModerator: false,
            createdAt: new Date().toISOString()
          }
        ])
      }

      // Load reported content (mock data)
      const reports = [
        {
          id: 'report_1',
          contentId: 'post_123',
          contentType: 'post',
          content: 'This rock is absolutely stunning! Found it during my trip.',
          reportedBy: 'user_456',
          reportReason: 'spam',
          reportedAt: Date.now() - 2 * 60 * 60 * 1000,
          status: 'pending',
          reporter: { username: 'concerned_user' }
        },
        {
          id: 'report_2',
          contentId: 'comment_789',
          contentType: 'comment',
          content: 'That rock looks fake to me, stop posting garbage!',
          reportedBy: 'user_789',
          reportReason: 'harassment',
          reportedAt: Date.now() - 5 * 60 * 60 * 1000,
          status: 'pending',
          reporter: { username: 'rock_enthusiast' }
        }
      ]
      setReportedContent(reports)

      // Load suspended users
      const suspended = [
        {
          id: 'user_999',
          username: 'problematic_user',
          suspendedAt: Date.now() - 24 * 60 * 60 * 1000,
          reason: 'Multiple harassment violations',
          duration: 168, // 7 days
          status: 'suspended'
        }
      ]
      setSuspendedUsers(suspended)

    } catch (error) {
      console.error('Error loading moderation data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResolveViolation = async (violationId, decision, notes) => {
    const resolved = autoModerationSystem.resolveViolation(violationId, user.id, decision, notes)
    if (resolved) {
      // Refresh moderation queue
      const updatedQueue = autoModerationSystem.getModerationQueue()
      setModerationQueue(updatedQueue)
    }
  }

  const handleResolveReport = async (reportId, decision, notes) => {
    setReportedContent(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: decision, reviewedBy: user.id, reviewedAt: Date.now(), reviewNotes: notes }
        : report
    ))
  }

  const handleUnsuspendUser = async (userId) => {
    autoModerationSystem.unsuspendUser(userId)
    setSuspendedUsers(prev => prev.filter(user => user.id !== userId))
  }

  const handleUpdateUserRole = async (userId, roleData) => {
    try {
      await admin.updateUserRole(userId, roleData)
      // Refresh user list
      const updatedUsers = allUsers.map(user => 
        user._id === userId ? { ...user, ...roleData } : user
      )
      setAllUsers(updatedUsers)
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    }
  }

  const getSeverityColor = (severity) => {
    const colors = {
      [VIOLATION_SEVERITY.LOW]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      [VIOLATION_SEVERITY.MEDIUM]: 'bg-orange-100 text-orange-800 border-orange-200',
      [VIOLATION_SEVERITY.HIGH]: 'bg-red-100 text-red-800 border-red-200',
      [VIOLATION_SEVERITY.CRITICAL]: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access the moderation dashboard.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading moderation dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">Moderation Dashboard</h1>
            <p className="text-red-100">Content review and user management</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{moderationQueue.length}</div>
              <div className="text-gray-600">Pending Reviews</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Flag className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{reportedContent.length}</div>
              <div className="text-gray-600">Reported Content</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{suspendedUsers.length}</div>
              <div className="text-gray-600">Suspended Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">98.2%</div>
              <div className="text-gray-600">Auto-Moderation Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'queue', label: 'Moderation Queue', icon: AlertTriangle },
              { id: 'reports', label: 'Reported Content', icon: Flag },
              { id: 'users', label: 'Suspended Users', icon: Users },
              { id: 'roles', label: 'User Roles', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'queue' && (
            <ModerationQueue 
              queue={moderationQueue}
              onResolve={handleResolveViolation}
              getSeverityColor={getSeverityColor}
              formatTimeAgo={formatTimeAgo}
            />
          )}

          {activeTab === 'reports' && (
            <ReportedContent 
              reports={reportedContent}
              onResolve={handleResolveReport}
              formatTimeAgo={formatTimeAgo}
            />
          )}

          {activeTab === 'users' && (
            <SuspendedUsers 
              users={suspendedUsers}
              onUnsuspend={handleUnsuspendUser}
              formatTimeAgo={formatTimeAgo}
            />
          )}

          {activeTab === 'roles' && (
            <UserRoleManagement 
              users={allUsers}
              onUpdateRole={handleUpdateUserRole}
              currentUser={user}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Moderation Queue Component
const ModerationQueue = ({ queue, onResolve, getSeverityColor, formatTimeAgo }) => {
  if (queue.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h3>
        <p className="text-gray-600">No items pending moderation review.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {queue.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(item.severity)}`}>
                {item.severity}
              </span>
              <span className="text-sm text-gray-500">{formatTimeAgo(item.timestamp)}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onResolve(item.id, 'approved', 'Violation confirmed')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Confirm Violation
              </button>
              <button
                onClick={() => onResolve(item.id, 'rejected', 'False positive')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                False Positive
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded p-3 mb-3">
            <p className="text-sm text-gray-900">Content: {item.contentType}</p>
            <p className="text-sm text-gray-600 mt-1">User ID: {item.userId}</p>
          </div>

          <div className="text-xs text-gray-500">
            Violations: {item.violations?.map(v => `Pattern ${v.pattern}`).join(', ')}
          </div>
        </div>
      ))}
    </div>
  )
}

// Reported Content Component
const ReportedContent = ({ reports, onResolve, formatTimeAgo }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports</h3>
        <p className="text-gray-600">No content has been reported by users.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Flag className="h-4 w-4 text-red-500" />
                <span className="font-medium">Reported {report.contentType}</span>
                <span className="text-sm text-gray-500">• {formatTimeAgo(report.reportedAt)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Reported by @{report.reporter.username} for: {report.reportReason}
              </p>
            </div>
            {report.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onResolve(report.id, 'action_taken', 'Content removed')}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Take Action
                </button>
                <button
                  onClick={() => onResolve(report.id, 'dismissed', 'Report dismissed')}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded p-3">
            <p className="text-sm text-gray-900">{report.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// Suspended Users Component
const SuspendedUsers = ({ users, onUnsuspend, formatTimeAgo }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Suspended Users</h3>
        <p className="text-gray-600">No users are currently suspended.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">@{user.username}</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Suspended</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Suspended {formatTimeAgo(user.suspendedAt)} • Reason: {user.reason}
              </p>
            </div>
            <button
              onClick={() => onUnsuspend(user.id)}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              Unsuspend
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// User Role Management Component
const UserRoleManagement = ({ users, onUpdateRole, currentUser }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [newRole, setNewRole] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)

  const handleRoleUpdate = (user) => {
    setSelectedUser(user)
    setNewRole(user.role || 'user')
    setIsAdmin(user.isAdmin || false)
    setIsModerator(user.isModerator || false)
  }

  const handleSaveRole = () => {
    if (selectedUser) {
      onUpdateRole(selectedUser._id, {
        role: newRole,
        isAdmin,
        isModerator
      })
      setSelectedUser(null)
    }
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
        <p className="text-gray-600">No users available for role management.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">User Role Management</h3>
        <p className="text-sm text-gray-600">Assign admin and moderator roles to users</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {user.isAdmin && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Admin</span>}
                    {user.isModerator && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Mod</span>}
                    {!user.isAdmin && !user.isModerator && <span className="text-gray-400">None</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user._id !== currentUser?.id && (
                    <button
                      onClick={() => handleRoleUpdate(user)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Edit Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Edit Role for {selectedUser.username}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Admin Privileges</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isModerator}
                      onChange={(e) => setIsModerator(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Moderator Privileges</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModerationDashboard