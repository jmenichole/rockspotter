/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Themed Button Component - Example demonstrating theme usage
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

/**
 * Button component with theme support
 * 
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {string} variant - 'primary' | 'secondary' | 'text'
 * @param {boolean} disabled - Disabled state
 * @param {object} style - Additional styles
 */
const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style
        ];
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledButton,
          style
        ];
      case 'text':
        return [
          styles.button,
          styles.textButton,
          disabled && styles.disabledButton,
          style
        ];
      default:
        return [styles.button, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText];
      case 'secondary':
        return [styles.buttonText, styles.secondaryButtonText];
      case 'text':
        return [styles.buttonText, styles.textButtonText];
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary.main,
    ...theme.shadows.md,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary.main,
    ...theme.shadows.sm,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: theme.colors.ui.disabled,
  },
  buttonText: {
    fontFamily: theme.typography.fonts.primary.semiBold,
    fontSize: theme.typography.sizes.md,
  },
  primaryButtonText: {
    color: theme.colors.primary.contrast,
  },
  secondaryButtonText: {
    color: theme.colors.secondary.contrast,
  },
  textButtonText: {
    color: theme.colors.primary.main,
  },
});

export default Button;
