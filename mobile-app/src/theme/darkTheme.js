/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/**
 * Rock Spotter Dark Theme
 * 
 * Dark mode variant of the Rock Spotter theme for low-light environments
 */

import { theme as lightTheme } from './index';

export const darkTheme = {
  ...lightTheme,
  
  colors: {
    ...lightTheme.colors,

    // Primary palette adjusted for dark mode
    primary: {
      main: '#8F7E6F', // Lighter brown for better contrast
      light: '#A89B8C',
      dark: '#6B5B4C',
      contrast: '#1E1E1E',
    },

    secondary: {
      main: '#A5B8AA', // Lighter sage green
      light: '#BCC9C1',
      dark: '#7C9082',
      contrast: '#1E1E1E',
    },

    // Background colors for dark mode
    background: {
      primary: '#1E1E1E', // True dark
      secondary: '#2C2C2C', // Slightly lighter
      tertiary: '#3A3A3A', // Medium dark
      dark: '#121212', // Deepest black
      card: '#2C2C2C',
      modal: 'rgba(0, 0, 0, 0.85)',
    },

    // Text colors adjusted for dark backgrounds
    text: {
      primary: '#E8E8E8', // Almost white
      secondary: '#B0B0B0', // Light gray
      tertiary: '#808080', // Medium gray
      disabled: '#555555',
      inverse: '#1E1E1E',
      link: '#7CA9BF', // Brighter muted blue
      error: '#EF5350',
      success: '#66BB6A',
      warning: '#FFA726',
    },

    // UI element colors for dark mode
    ui: {
      border: '#3A3A3A',
      divider: '#2C2C2C',
      focus: '#A5B8AA',
      hover: 'rgba(143, 126, 111, 0.12)',
      active: 'rgba(143, 126, 111, 0.18)',
      disabled: '#2C2C2C',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
  },

  // Adjusted shadows for dark mode
  shadows: {
    none: lightTheme.shadows.none,
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.6,
      shadowRadius: 16,
      elevation: 16,
    },
  },
};

export default darkTheme;
