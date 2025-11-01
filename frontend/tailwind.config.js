/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth tone primary colors
        primary: {
          50: '#faf7f2',
          100: '#f4ede1',
          200: '#e8d9c2',
          300: '#d9c09b',
          400: '#c8a271',
          500: '#b8855a', // Main brown
          600: '#a0714b',
          700: '#85593d',
          800: '#6d4732',
          900: '#583a29',
        },
        // Sage green secondary
        secondary: {
          50: '#f2f5f3',
          100: '#e1ebe4',
          200: '#c4d7ca',
          300: '#9fbda8',
          400: '#7c9082', // Main sage
          500: '#637a6a',
          600: '#4f6154',
          700: '#415044',
          800: '#364139',
          900: '#2e3530',
        },
        // Geological gray palette - inspired by rock colors
        stone: {
          50: '#fafafa',   // Limestone white
          100: '#f4f4f5',  // Pearl gray
          200: '#e4e4e7',  // Marble gray
          300: '#d4d4d8',  // Granite light
          400: '#a1a1aa',  // Shale
          500: '#71717a',  // Slate
          600: '#52525b',  // Granite dark
          700: '#3f3f46',  // Basalt
          800: '#27272a',  // Obsidian
          900: '#18181b',  // Coal
          950: '#09090b',  // Charcoal
        },
        // Extended gray variations for UI elements
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Warm grays that complement earth tones
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Rock type colors
        igneous: '#d84a3f',      // Volcanic red
        sedimentary: '#d4a574',  // Sandy beige  
        metamorphic: '#6b8e9f',  // Slate blue
        mineral: '#8b7b9b',      // Crystal purple
        fossil: '#8b7355',       // Fossil brown
        accent: '#c67e3b',       // Copper/amber
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}