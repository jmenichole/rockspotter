/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/**
 * Rock Spotter Theme Configuration
 * 
 * This file defines the complete visual design system for the Rock Spotter app,
 * including colors, typography, spacing, and other design tokens.
 */

export const colors = {
  // Primary palette - Earthy tones inspired by rocks and nature
  primary: {
    main: '#6B5B4C', // Warm brown - reminiscent of sedimentary rocks
    light: '#8F7E6F',
    dark: '#4A3D32',
    contrast: '#FFFFFF',
  },

  // Secondary palette - Natural accent colors
  secondary: {
    main: '#7C9082', // Sage green - represents nature and outdoors
    light: '#A5B8AA',
    dark: '#5A6B5E',
    contrast: '#FFFFFF',
  },

  // Accent colors for different rock types
  rockTypes: {
    igneous: '#D84A3F', // Volcanic red/orange
    sedimentary: '#D4A574', // Sandy beige
    metamorphic: '#6B8E9F', // Slate blue
    mineral: '#8B7B9B', // Crystal purple
    fossil: '#8B7355', // Fossil brown
    other: '#7A8B8B', // Neutral gray-green
  },

  // Hunt difficulty colors
  difficulty: {
    easy: '#81C784', // Light green
    medium: '#FFB74D', // Amber
    hard: '#E57373', // Light red
  },

  // Achievement rarity colors
  rarity: {
    common: '#9E9E9E', // Gray
    rare: '#64B5F6', // Blue
    epic: '#BA68C8', // Purple
    legendary: '#FFD54F', // Gold
  },

  // Background colors
  background: {
    primary: '#FAFAF8', // Off-white with warm tone
    secondary: '#F5F3F0', // Light beige
    tertiary: '#EDEAE5', // Slightly darker beige
    dark: '#2C2C2C', // Dark gray for dark mode
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
  },

  // Text colors
  text: {
    primary: '#2D2D2D', // Almost black
    secondary: '#666666', // Medium gray
    tertiary: '#999999', // Light gray
    disabled: '#CCCCCC',
    inverse: '#FFFFFF',
    link: '#5B8A9F', // Muted blue
    error: '#D84A3F',
    success: '#5A8B5F',
    warning: '#D4A033',
  },

  // UI element colors
  ui: {
    border: '#E0E0E0',
    divider: '#F0F0F0',
    focus: '#7C9082',
    hover: 'rgba(107, 91, 76, 0.08)',
    active: 'rgba(107, 91, 76, 0.12)',
    disabled: '#F5F5F5',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Social interaction colors
  social: {
    like: '#E57373',
    comment: '#64B5F6',
    share: '#81C784',
  },

  // Status colors
  status: {
    online: '#5A8B5F',
    offline: '#999999',
    pending: '#FFB74D',
  },
};

export const typography = {
  // Font families
  fonts: {
    primary: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    secondary: {
      regular: 'Merriweather-Regular',
      italic: 'Merriweather-Italic',
      bold: 'Merriweather-Bold',
    },
    monospace: 'RobotoMono-Regular',
  },

  // Font sizes
  sizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display1: 32,
    display2: 36,
    display3: 40,
    display4: 48,
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export const spacing = {
  // Base spacing unit (8px)
  base: 8,

  // Spacing scale
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Component-specific spacing
  screenPadding: 16,
  cardPadding: 16,
  sectionSpacing: 24,
  listItemSpacing: 12,
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
};

export const icons = {
  // Icon sizes
  sizes: {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
  },

  // Icon mappings for different features
  rockTypes: {
    igneous: '🌋',
    sedimentary: '🏜️',
    metamorphic: '⛰️',
    mineral: '💎',
    fossil: '🦴',
    other: '🪨',
  },

  difficulty: {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  },

  rarity: {
    common: '🥉',
    rare: '🥈',
    epic: '🥇',
    legendary: '👑',
  },

  navigation: {
    home: '🏠',
    discover: '🔍',
    map: '🗺️',
    hunts: '🏃',
    profile: '👤',
  },

  actions: {
    like: '❤️',
    comment: '💬',
    share: '📤',
    location: '📍',
    camera: '📸',
    add: '➕',
    edit: '✏️',
    delete: '🗑️',
    save: '💾',
    filter: '🔧',
    search: '🔍',
  },

  achievements: {
    trophy: '🏆',
    star: '⭐',
    medal: '🏅',
    crown: '👑',
    gem: '💎',
    fire: '🔥',
  },
};

export const animations = {
  // Animation durations (ms)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const breakpoints = {
  // Screen size breakpoints
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
};

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  icons,
  animations,
  breakpoints,
};

export default theme;
