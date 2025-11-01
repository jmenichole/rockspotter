/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Auto-Moderation System - Content filtering and account management
 */

// Offensive words and phrases for content moderation
const OFFENSIVE_PATTERNS = [
  // Hate speech patterns
  /\b(hate|hatred)\s+(all|every)\s+\w+/gi,
  /\b(kill|die|death)\s+(all|every)\s+\w+/gi,
  /\b(stupid|dumb|idiot)\s+(all|every)\s+\w+/gi,
  
  // Discriminatory language
  /\b(racial|gender|sexual)\s+(slurs?|insults?)/gi,
  /\b(discriminat\w+)\s+(against|toward)/gi,
  
  // Harassment patterns
  /\b(shut\s+up|get\s+lost|go\s+away)\b/gi,
  /\b(loser|pathetic|worthless)\b/gi,
  /\b(kill\s+yourself|kys)\b/gi,
  
  // Spam patterns
  /(.)\1{4,}/g, // Repeated characters (aaaaa)
  /[A-Z]{5,}/g, // Excessive caps
  /\b(buy|sell|click|visit)\s+(now|here|this)\b/gi,
  
  // Inappropriate content
  /\b(sexual|explicit|nsfw)\s+(content|material)/gi,
  /\b(drug|illegal|substance)\s+(deal|sale)/gi
]

// Severity levels for moderation actions
const VIOLATION_SEVERITY = {
  LOW: 'low',        // Warning only
  MEDIUM: 'medium',  // Temporary restrictions
  HIGH: 'high',      // Account suspension
  CRITICAL: 'critical' // Immediate ban
}

// Moderation actions based on severity
const MODERATION_ACTIONS = {
  [VIOLATION_SEVERITY.LOW]: {
    action: 'warning',
    duration: 0,
    restrictions: []
  },
  [VIOLATION_SEVERITY.MEDIUM]: {
    action: 'restrict',
    duration: 24, // hours
    restrictions: ['comments', 'posts']
  },
  [VIOLATION_SEVERITY.HIGH]: {
    action: 'suspend',
    duration: 168, // 7 days
    restrictions: ['comments', 'posts', 'messaging', 'likes']
  },
  [VIOLATION_SEVERITY.CRITICAL]: {
    action: 'ban',
    duration: -1, // permanent
    restrictions: ['all']
  }
}

class AutoModerationSystem {
  constructor() {
    this.violationHistory = new Map() // userId -> violations array
    this.suspendedUsers = new Set()
    this.bannedUsers = new Set()
    this.restrictedUsers = new Map() // userId -> restrictions object
  }

  /**
   * Analyze content for policy violations
   * @param {string} content - The content to analyze
   * @param {string} userId - User ID of content creator
   * @param {string} type - Content type (post, comment, message)
   * @returns {Object} Moderation result
   */
  analyzeContent(content, userId, type = 'post') {
    const violations = []
    const flags = []

    // Check against offensive patterns
    OFFENSIVE_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern)
      if (matches) {
        violations.push({
          pattern: index,
          matches: matches,
          severity: this.determineSeverity(pattern, matches, content)
        })
      }
    })

    // Additional context analysis
    const contextFlags = this.analyzeContext(content, type)
    flags.push(...contextFlags)

    // Calculate overall severity
    const overallSeverity = this.calculateOverallSeverity(violations, flags)

    // Check user's violation history
    const userHistory = this.violationHistory.get(userId) || []
    const adjustedSeverity = this.adjustSeverityBasedOnHistory(overallSeverity, userHistory)

    return {
      isViolation: violations.length > 0 || flags.length > 0,
      severity: adjustedSeverity,
      violations,
      flags,
      action: MODERATION_ACTIONS[adjustedSeverity],
      requiresReview: adjustedSeverity === VIOLATION_SEVERITY.HIGH || adjustedSeverity === VIOLATION_SEVERITY.CRITICAL
    }
  }

  /**
   * Determine severity of a specific pattern match
   */
  determineSeverity(pattern, matches, content) {
    // Hate speech and threats are high severity
    if (pattern.source.includes('hate|hatred|kill|die')) {
      return VIOLATION_SEVERITY.HIGH
    }
    
    // Harassment is medium severity
    if (pattern.source.includes('shut up|loser|pathetic')) {
      return VIOLATION_SEVERITY.MEDIUM
    }
    
    // Spam is typically low severity
    if (pattern.source.includes('repeated|caps|buy|sell')) {
      return VIOLATION_SEVERITY.LOW
    }
    
    return VIOLATION_SEVERITY.MEDIUM
  }

  /**
   * Analyze content context for additional flags
   */
  analyzeContext(content, type) {
    const flags = []
    
    // Check content length for spam
    if (content.length > 1000 && type === 'comment') {
      flags.push({ type: 'excessive_length', severity: VIOLATION_SEVERITY.LOW })
    }
    
    // Check for excessive punctuation
    const punctuationCount = (content.match(/[!?]{3,}/g) || []).length
    if (punctuationCount > 2) {
      flags.push({ type: 'excessive_punctuation', severity: VIOLATION_SEVERITY.LOW })
    }
    
    // Check for suspicious URLs (basic check)
    const urlPattern = /https?:\/\/[^\s]+/g
    const urls = content.match(urlPattern) || []
    if (urls.length > 3) {
      flags.push({ type: 'excessive_links', severity: VIOLATION_SEVERITY.MEDIUM })
    }
    
    return flags
  }

  /**
   * Calculate overall severity from multiple violations
   */
  calculateOverallSeverity(violations, flags) {
    if (violations.length === 0 && flags.length === 0) {
      return null
    }
    
    const allSeverities = [
      ...violations.map(v => v.severity),
      ...flags.map(f => f.severity)
    ]
    
    // Return highest severity
    if (allSeverities.includes(VIOLATION_SEVERITY.CRITICAL)) return VIOLATION_SEVERITY.CRITICAL
    if (allSeverities.includes(VIOLATION_SEVERITY.HIGH)) return VIOLATION_SEVERITY.HIGH
    if (allSeverities.includes(VIOLATION_SEVERITY.MEDIUM)) return VIOLATION_SEVERITY.MEDIUM
    return VIOLATION_SEVERITY.LOW
  }

  /**
   * Adjust severity based on user's violation history
   */
  adjustSeverityBasedOnHistory(severity, userHistory) {
    if (!severity) return null
    
    const recentViolations = userHistory.filter(
      v => Date.now() - v.timestamp < 30 * 24 * 60 * 60 * 1000 // 30 days
    )
    
    // Escalate for repeat offenders
    if (recentViolations.length >= 3 && severity === VIOLATION_SEVERITY.MEDIUM) {
      return VIOLATION_SEVERITY.HIGH
    }
    
    if (recentViolations.length >= 5 && severity === VIOLATION_SEVERITY.LOW) {
      return VIOLATION_SEVERITY.MEDIUM
    }
    
    if (recentViolations.length >= 2 && severity === VIOLATION_SEVERITY.HIGH) {
      return VIOLATION_SEVERITY.CRITICAL
    }
    
    return severity
  }

  /**
   * Apply moderation action to user
   */
  applyModerationAction(userId, moderationResult, contentId, contentType) {
    if (!moderationResult.isViolation) return

    const violation = {
      id: Date.now().toString(),
      userId,
      contentId,
      contentType,
      severity: moderationResult.severity,
      action: moderationResult.action,
      timestamp: Date.now(),
      violations: moderationResult.violations,
      flags: moderationResult.flags,
      status: 'active'
    }

    // Add to violation history
    const userHistory = this.violationHistory.get(userId) || []
    userHistory.push(violation)
    this.violationHistory.set(userId, userHistory)

    // Apply restrictions based on action
    switch (moderationResult.action.action) {
      case 'warning':
        // Just log the warning
        console.log(`Warning issued to user ${userId}`)
        break
        
      case 'restrict':
        this.restrictUser(userId, moderationResult.action.restrictions, moderationResult.action.duration)
        break
        
      case 'suspend':
        this.suspendUser(userId, moderationResult.action.duration)
        break
        
      case 'ban':
        this.banUser(userId)
        break
    }

    return violation
  }

  /**
   * Restrict user actions
   */
  restrictUser(userId, restrictions, durationHours) {
    const expiresAt = durationHours > 0 ? Date.now() + (durationHours * 60 * 60 * 1000) : -1

    this.restrictedUsers.set(userId, {
      restrictions,
      expiresAt,
      appliedAt: Date.now()
    })

    console.log(`User ${userId} restricted from: ${restrictions.join(', ')} for ${durationHours} hours`)
  }

  /**
   * Suspend user account
   */
  suspendUser(userId, durationHours) {
    this.suspendedUsers.add(userId)
    
    if (durationHours > 0) {
      setTimeout(() => {
        this.unsuspendUser(userId)
      }, durationHours * 60 * 60 * 1000)
    }

    console.log(`User ${userId} suspended for ${durationHours} hours`)
  }

  /**
   * Ban user permanently
   */
  banUser(userId) {
    this.bannedUsers.add(userId)
    this.suspendedUsers.add(userId)
    console.log(`User ${userId} permanently banned`)
  }

  /**
   * Unsuspend user
   */
  unsuspendUser(userId) {
    this.suspendedUsers.delete(userId)
    this.restrictedUsers.delete(userId)
    console.log(`User ${userId} unsuspended`)
  }

  /**
   * Check if user can perform action
   */
  canUserPerformAction(userId, action) {
    // Check if banned
    if (this.bannedUsers.has(userId)) {
      return { allowed: false, reason: 'User is permanently banned' }
    }

    // Check if suspended
    if (this.suspendedUsers.has(userId)) {
      return { allowed: false, reason: 'User account is suspended' }
    }

    // Check specific restrictions
    const restrictions = this.restrictedUsers.get(userId)
    if (restrictions) {
      // Check if restriction has expired
      if (restrictions.expiresAt > 0 && Date.now() > restrictions.expiresAt) {
        this.restrictedUsers.delete(userId)
        return { allowed: true }
      }

      // Check if action is restricted
      if (restrictions.restrictions.includes(action) || restrictions.restrictions.includes('all')) {
        return { 
          allowed: false, 
          reason: `User is restricted from ${action}`,
          expiresAt: restrictions.expiresAt
        }
      }
    }

    return { allowed: true }
  }

  /**
   * Get moderation queue for admin review
   */
  getModerationQueue() {
    const queue = []
    
    for (const [userId, violations] of this.violationHistory) {
      violations.forEach(violation => {
        if (violation.status === 'active' && 
            (violation.severity === VIOLATION_SEVERITY.HIGH || violation.severity === VIOLATION_SEVERITY.CRITICAL)) {
          queue.push({
            ...violation,
            userId
          })
        }
      })
    }

    return queue.sort((a, b) => b.timestamp - a.timestamp)
  }

  /**
   * Admin review and resolve violation
   */
  resolveViolation(violationId, adminId, decision, notes = '') {
    for (const [userId, violations] of this.violationHistory) {
      const violation = violations.find(v => v.id === violationId)
      if (violation) {
        violation.status = decision // 'approved', 'rejected', 'modified'
        violation.reviewedBy = adminId
        violation.reviewedAt = Date.now()
        violation.reviewNotes = notes

        if (decision === 'rejected') {
          // Remove restrictions if violation was false positive
          this.unsuspendUser(userId)
        }

        return violation
      }
    }
    
    return null
  }
}

// Create global moderation instance
const autoModerationSystem = new AutoModerationSystem()

export {
  autoModerationSystem,
  AutoModerationSystem,
  VIOLATION_SEVERITY,
  MODERATION_ACTIONS
}