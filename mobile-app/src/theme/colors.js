/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/**
 * Color Constants for Easy Import
 * 
 * Use these constants throughout the app for consistent theming
 */

// Primary Colors
export const PRIMARY_BROWN = '#6B5B4C';
export const PRIMARY_BROWN_LIGHT = '#8F7E6F';
export const PRIMARY_BROWN_DARK = '#4A3D32';

export const SECONDARY_SAGE = '#7C9082';
export const SECONDARY_SAGE_LIGHT = '#A5B8AA';
export const SECONDARY_SAGE_DARK = '#5A6B5E';

// Rock Type Colors
export const ROCK_IGNEOUS = '#D84A3F';      // 🌋 Volcanic red
export const ROCK_SEDIMENTARY = '#D4A574';  // 🏜️ Sandy beige
export const ROCK_METAMORPHIC = '#6B8E9F';  // ⛰️ Slate blue
export const ROCK_MINERAL = '#8B7B9B';      // 💎 Crystal purple
export const ROCK_FOSSIL = '#8B7355';       // 🦴 Fossil brown
export const ROCK_OTHER = '#7A8B8B';        // 🪨 Neutral gray-green

// Difficulty Colors
export const DIFFICULTY_EASY = '#81C784';    // ⭐ Light green
export const DIFFICULTY_MEDIUM = '#FFB74D';  // ⭐⭐ Amber
export const DIFFICULTY_HARD = '#E57373';    // ⭐⭐⭐ Light red

// Rarity Colors
export const RARITY_COMMON = '#9E9E9E';     // 🥉 Gray
export const RARITY_RARE = '#64B5F6';       // 🥈 Blue
export const RARITY_EPIC = '#BA68C8';       // 🥇 Purple
export const RARITY_LEGENDARY = '#FFD54F';  // 👑 Gold

// Background Colors (Light Mode)
export const BG_PRIMARY_LIGHT = '#FAFAF8';
export const BG_SECONDARY_LIGHT = '#F5F3F0';
export const BG_CARD_LIGHT = '#FFFFFF';

// Background Colors (Dark Mode)
export const BG_PRIMARY_DARK = '#1E1E1E';
export const BG_SECONDARY_DARK = '#2C2C2C';
export const BG_CARD_DARK = '#2C2C2C';

// Text Colors (Light Mode)
export const TEXT_PRIMARY_LIGHT = '#2D2D2D';
export const TEXT_SECONDARY_LIGHT = '#666666';
export const TEXT_TERTIARY_LIGHT = '#999999';

// Text Colors (Dark Mode)
export const TEXT_PRIMARY_DARK = '#E8E8E8';
export const TEXT_SECONDARY_DARK = '#B0B0B0';
export const TEXT_TERTIARY_DARK = '#808080';

// Status Colors
export const STATUS_ERROR = '#D84A3F';
export const STATUS_SUCCESS = '#5A8B5F';
export const STATUS_WARNING = '#D4A033';
export const STATUS_INFO = '#5B8A9F';

// Social Colors
export const SOCIAL_LIKE = '#E57373';    // ❤️
export const SOCIAL_COMMENT = '#64B5F6'; // 💬
export const SOCIAL_SHARE = '#81C784';   // 📤

// UI Colors
export const BORDER_COLOR = '#E0E0E0';
export const DIVIDER_COLOR = '#F0F0F0';
export const FOCUS_COLOR = '#7C9082';

// Helper function to get rock type color
export const getRockTypeColor = (type) => {
  const colors = {
    igneous: ROCK_IGNEOUS,
    sedimentary: ROCK_SEDIMENTARY,
    metamorphic: ROCK_METAMORPHIC,
    mineral: ROCK_MINERAL,
    fossil: ROCK_FOSSIL,
    other: ROCK_OTHER,
  };
  return colors[type] || ROCK_OTHER;
};

// Helper function to get difficulty color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: DIFFICULTY_EASY,
    medium: DIFFICULTY_MEDIUM,
    hard: DIFFICULTY_HARD,
  };
  return colors[difficulty] || DIFFICULTY_MEDIUM;
};

// Helper function to get rarity color
export const getRarityColor = (rarity) => {
  const colors = {
    common: RARITY_COMMON,
    rare: RARITY_RARE,
    epic: RARITY_EPIC,
    legendary: RARITY_LEGENDARY,
  };
  return colors[rarity] || RARITY_COMMON;
};

export default {
  PRIMARY_BROWN,
  PRIMARY_BROWN_LIGHT,
  PRIMARY_BROWN_DARK,
  SECONDARY_SAGE,
  SECONDARY_SAGE_LIGHT,
  SECONDARY_SAGE_DARK,
  ROCK_IGNEOUS,
  ROCK_SEDIMENTARY,
  ROCK_METAMORPHIC,
  ROCK_MINERAL,
  ROCK_FOSSIL,
  ROCK_OTHER,
  DIFFICULTY_EASY,
  DIFFICULTY_MEDIUM,
  DIFFICULTY_HARD,
  RARITY_COMMON,
  RARITY_RARE,
  RARITY_EPIC,
  RARITY_LEGENDARY,
  getRockTypeColor,
  getDifficultyColor,
  getRarityColor,
};
