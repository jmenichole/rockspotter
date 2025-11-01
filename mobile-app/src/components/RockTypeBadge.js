/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

/**
 * Rock Type Badge Component
 * 
 * Displays a colored badge for rock types with icon
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { getRockTypeColor } from '../theme/colors';

/**
 * Badge component for displaying rock types
 * 
 * @param {string} type - Rock type (igneous, sedimentary, metamorphic, etc.)
 * @param {string} size - 'small' | 'medium' | 'large'
 */
const RockTypeBadge = ({ type, size = 'medium' }) => {
  const backgroundColor = getRockTypeColor(type);
  const icon = theme.icons.rockTypes[type] || theme.icons.rockTypes.other;
  
  const sizeStyles = {
    small: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: theme.typography.sizes.xs,
      iconSize: theme.icons.sizes.xs,
    },
    medium: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: theme.typography.sizes.sm,
      iconSize: theme.icons.sizes.sm,
    },
    large: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: theme.typography.sizes.md,
      iconSize: theme.icons.sizes.md,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        { 
          backgroundColor,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        }
      ]}
    >
      <Text style={[styles.icon, { fontSize: currentSize.iconSize }]}>
        {icon}
      </Text>
      <Text style={[styles.text, { fontSize: currentSize.fontSize }]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.xs,
    ...theme.shadows.sm,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: theme.colors.text.inverse,
    fontFamily: theme.typography.fonts.primary.semiBold,
    textTransform: 'capitalize',
  },
});

export default RockTypeBadge;
