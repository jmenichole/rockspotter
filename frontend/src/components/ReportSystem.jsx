/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Report System - User reporting functionality for posts and comments
 */

import { useState } from 'react'
import { Flag, X, AlertTriangle, Shield } from 'lucide-react'

const ReportButton = ({ contentId, contentType, onReport }) => {
  const [showModal, setShowModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const reportReasons = [
    { id: 'spam', label: 'Spam or unwanted content', description: 'Repetitive, irrelevant, or promotional content' },
    { id: 'harassment', label: 'Harassment or bullying', description: 'Targeting someone with harmful behavior' },
    { id: 'hate_speech', label: 'Hate speech', description: 'Content that attacks or discriminates against groups' },
    { id: 'misinformation', label: 'False information', description: 'Deliberately spreading false geological information' },
    { id: 'inappropriate', label: 'Inappropriate content', description: 'Content not suitable for the community' },
    { id: 'copyright', label: 'Copyright violation', description: 'Using someone else\'s content without permission' },
    { id: 'other', label: 'Other', description: 'Something else that violates community guidelines' }
  ]

  const handleSubmitReport = async () => {
    if (!reportReason) return

    setSubmitting(true)
    try {
      const report = {
        contentId,
        contentType,
        reason: reportReason,
        customReason: reportReason === 'other' ? customReason : '',
        reportedAt: Date.now(),
        status: 'pending'
      }

      // Submit report (in real app this would be an API call)
      if (onReport) {
        await onReport(report)
      }

      // Close modal and reset
      setShowModal(false)
      setReportReason('')
      setCustomReason('')
      
      // Show success feedback
      alert('Thank you for your report. Our moderation team will review it shortly.')
      
    } catch (error) {
      console.error('Error submitting report:', error)
      alert('Failed to submit report. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Report Button */}
      <button
        onClick={() => setShowModal(true)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
        title="Report this content"
      >
        <Flag className="h-4 w-4" />
      </button>

      {/* Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Flag className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Report Content</h3>
                  <p className="text-sm text-gray-600">Help us keep Rock Spotter safe</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Why are you reporting this {contentType}? Your report will be reviewed by our moderation team.
              </p>

              <div className="space-y-3">
                {reportReasons.map((reason) => (
                  <label
                    key={reason.id}
                    className={`block p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      reportReason === reason.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason.id}
                        checked={reportReason === reason.id}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="mt-1 text-red-600 focus:ring-red-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{reason.label}</div>
                        <div className="text-sm text-gray-600">{reason.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Custom reason textarea */}
              {reportReason === 'other' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please provide more details:
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Describe the issue..."
                  />
                </div>
              )}

              {/* Warning */}
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Important:</strong> False reports may result in action against your account. 
                    Only report content that genuinely violates our community guidelines.
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                disabled={!reportReason || submitting || (reportReason === 'other' && !customReason.trim())}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Moderation Access Icon for Footer
const ModerationAccessIcon = ({ user, onClick }) => {
  const isAdmin = user?.username === 'jmenichole' || user?.role === 'admin' || user?.role === 'moderator'

  if (!isAdmin) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-40"
      title="Moderation Dashboard"
    >
      <Shield className="h-6 w-6 mx-auto" />
    </button>
  )
}

// Report Queue Status for Admins
const ReportQueueStatus = ({ user, reportCount = 0 }) => {
  const isAdmin = user?.username === 'jmenichole' || user?.role === 'admin' || user?.role === 'moderator'

  if (!isAdmin || reportCount === 0) return null

  return (
    <div className="fixed bottom-20 right-6 bg-white border border-red-200 rounded-lg shadow-lg p-3 z-40">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="text-sm">
          <div className="font-medium text-gray-900">{reportCount} pending reports</div>
          <div className="text-xs text-gray-500">Requires moderation review</div>
        </div>
      </div>
    </div>
  )
}

export { ReportButton, ModerationAccessIcon, ReportQueueStatus }