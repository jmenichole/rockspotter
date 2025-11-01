# Theme Usage Guide

Complete guide for using the Rock Spotter theme system in your components.

## Importing the Theme

```javascript
// Import the complete theme
import { theme } from '../theme';

// Or import specific modules
import { colors, typography, spacing } from '../theme';

// Import color constants
import { PRIMARY_BROWN, ROCK_IGNEOUS } from '../theme/colors';

// Import dark theme
import { darkTheme } from '../theme/darkTheme';
```

## Using Colors

### Basic Colors

```javascript
import { theme } from '../theme';

// Primary colors
<View style={{ backgroundColor: theme.colors.primary.main }}>
  <Text style={{ color: theme.colors.primary.contrast }}>
    Primary Text
  </Text>
</View>

// Secondary colors
<View style={{ backgroundColor: theme.colors.secondary.main }}>
  <Text style={{ color: theme.colors.secondary.contrast }}>
    Secondary Text
  </Text>
</View>
```

### Rock Type Colors

```javascript
// Using the theme object
<View style={{ backgroundColor: theme.colors.rockTypes.igneous }}>
  <Text>{theme.icons.rockTypes.igneous} Igneous Rock</Text>
</View>

// Using helper function
import { getRockTypeColor } from '../theme/colors';

const RockCard = ({ rockType }) => (
  <View style={{ backgroundColor: getRockTypeColor(rockType) }}>
    <Text>{rockType}</Text>
  </View>
);
```

### Difficulty Colors

```javascript
import { getDifficultyColor } from '../theme/colors';

const DifficultyBadge = ({ difficulty }) => (
  <View style={{ 
    backgroundColor: getDifficultyColor(difficulty),
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.xs,
  }}>
    <Text>{theme.icons.difficulty[difficulty]}</Text>
    <Text>{difficulty}</Text>
  </View>
);
```

### Rarity Colors

```javascript
import { getRarityColor } from '../theme/colors';

const AchievementBadge = ({ rarity }) => (
  <View style={{ 
    backgroundColor: getRarityColor(rarity),
    borderRadius: theme.borderRadius.md,
  }}>
    <Text>{theme.icons.rarity[rarity]}</Text>
  </View>
);
```

## Using Typography

### Font Families

```javascript
import { theme } from '../theme';

// Primary font (Inter)
<Text style={{ 
  fontFamily: theme.typography.fonts.primary.regular,
  fontSize: theme.typography.sizes.md,
}}>
  Regular text
</Text>

<Text style={{ 
  fontFamily: theme.typography.fonts.primary.bold,
  fontSize: theme.typography.sizes.xl,
}}>
  Bold heading
</Text>

// Secondary font (Merriweather) for content
<Text style={{ 
  fontFamily: theme.typography.fonts.secondary.regular,
  fontSize: theme.typography.sizes.md,
  lineHeight: theme.typography.sizes.md * theme.typography.lineHeights.relaxed,
}}>
  Long-form content with good readability
</Text>

// Monospace for technical data
<Text style={{ 
  fontFamily: theme.typography.fonts.monospace,
  fontSize: theme.typography.sizes.sm,
}}>
  [-122.4194, 37.7749]
</Text>
```

### Font Sizes

```javascript
// Small metadata
<Text style={{ fontSize: theme.typography.sizes.xs }}>
  Posted 2 hours ago
</Text>

// Default body text
<Text style={{ fontSize: theme.typography.sizes.md }}>
  This is the default body text size
</Text>

// Section headings
<Text style={{ fontSize: theme.typography.sizes.xxl }}>
  Section Heading
</Text>

// Page titles
<Text style={{ fontSize: theme.typography.sizes.display1 }}>
  Page Title
</Text>
```

## Using Spacing

### Padding & Margins

```javascript
import { theme } from '../theme';

// Using the spacing scale
<View style={{
  padding: theme.spacing.md,        // 16px
  marginTop: theme.spacing.lg,      // 24px
  marginBottom: theme.spacing.xl,   // 32px
}}>
  <Text>Content</Text>
</View>

// Component-specific spacing
<View style={{ 
  padding: theme.spacing.screenPadding,  // 16px
}}>
  <View style={{ 
    padding: theme.spacing.cardPadding,  // 16px
    marginBottom: theme.spacing.sectionSpacing,  // 24px
  }}>
    <Text>Card Content</Text>
  </View>
</View>
```

### Grid System

```javascript
// Everything should align to 8px grid
<View style={{
  marginTop: theme.spacing.base,      // 8px
  marginBottom: theme.spacing.base * 2, // 16px
  padding: theme.spacing.base * 3,    // 24px
}}>
  <Text>Grid-aligned content</Text>
</View>
```

## Using Border Radius

```javascript
import { theme } from '../theme';

// Small cards or buttons
<View style={{ borderRadius: theme.borderRadius.sm }}>  // 8px
  <Text>Button</Text>
</View>

// Standard cards
<View style={{ borderRadius: theme.borderRadius.md }}>  // 12px
  <Text>Card Content</Text>
</View>

// Avatars and circular elements
<View style={{ 
  borderRadius: theme.borderRadius.round,  // 9999px
  width: 64,
  height: 64,
}}>
  <Image source={avatar} />
</View>
```

## Using Shadows

```javascript
import { theme } from '../theme';

// Subtle elevation
<View style={[
  styles.card,
  theme.shadows.sm,
]}>
  <Text>Slightly elevated</Text>
</View>

// Standard cards
<View style={[
  styles.card,
  theme.shadows.md,
]}>
  <Text>Standard elevation</Text>
</View>

// Modals and overlays
<View style={[
  styles.modal,
  theme.shadows.xl,
]}>
  <Text>Prominent elevation</Text>
</View>
```

## Using Icons

```javascript
import { theme } from '../theme';

// Navigation icons
<Text style={{ fontSize: theme.icons.sizes.lg }}>
  {theme.icons.navigation.home}
</Text>

// Action icons
<TouchableOpacity>
  <Text style={{ fontSize: theme.icons.sizes.md }}>
    {theme.icons.actions.like}
  </Text>
</TouchableOpacity>

// Rock type icons
<Text style={{ fontSize: theme.icons.sizes.md }}>
  {theme.icons.rockTypes.igneous}
</Text>
```

## Complete Component Example

```javascript
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { getRockTypeColor } from '../theme/colors';

const RockCard = ({ rock, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image */}
      <Image 
        source={{ uri: rock.photo }} 
        style={styles.image}
      />
      
      {/* Rock type badge */}
      <View style={[
        styles.badge,
        { backgroundColor: getRockTypeColor(rock.rockType) }
      ]}>
        <Text style={styles.badgeIcon}>
          {theme.icons.rockTypes[rock.rockType]}
        </Text>
        <Text style={styles.badgeText}>
          {rock.rockType}
        </Text>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          {rock.title}
        </Text>
        
        {/* Description */}
        <Text 
          style={styles.description}
          numberOfLines={2}
        >
          {rock.description}
        </Text>
        
        {/* Location */}
        <View style={styles.location}>
          <Text style={styles.locationIcon}>
            {theme.icons.actions.location}
          </Text>
          <Text style={styles.locationText}>
            {rock.location.address}
          </Text>
        </View>
        
        {/* Footer with stats */}
        <View style={styles.footer}>
          <View style={styles.stat}>
            <Text style={styles.statIcon}>
              {theme.icons.actions.like}
            </Text>
            <Text style={styles.statText}>
              {rock.likes.length}
            </Text>
          </View>
          
          <View style={styles.stat}>
            <Text style={styles.statIcon}>
              {theme.icons.actions.comment}
            </Text>
            <Text style={styles.statText}>
              {rock.comments.length}
            </Text>
          </View>
          
          <Text style={styles.username}>
            {theme.icons.navigation.profile} @{rock.user.username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.background.tertiary,
  },
  badge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.xs,
    ...theme.shadows.sm,
  },
  badgeIcon: {
    fontSize: theme.icons.sizes.sm,
    marginRight: 4,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.primary.semiBold,
    textTransform: 'capitalize',
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.primary.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.secondary.regular,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.sizes.sm * theme.typography.lineHeights.normal,
    marginBottom: theme.spacing.sm,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  locationIcon: {
    fontSize: theme.icons.sizes.sm,
    marginRight: 4,
  },
  locationText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    fontFamily: theme.typography.fonts.primary.regular,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.divider,
    paddingTop: theme.spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  statIcon: {
    fontSize: theme.icons.sizes.sm,
    marginRight: 4,
  },
  statText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontFamily: theme.typography.fonts.primary.medium,
  },
  username: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.tertiary,
    fontFamily: theme.typography.fonts.primary.regular,
    marginLeft: 'auto',
  },
});

export default RockCard;
```

## Dark Mode Support

```javascript
import React, { useState } from 'react';
import { theme, darkTheme } from '../theme';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : theme;
  
  return (
    <View style={{ backgroundColor: currentTheme.colors.background.primary }}>
      <Text style={{ color: currentTheme.colors.text.primary }}>
        Content
      </Text>
    </View>
  );
};
```

## Best Practices

### 1. Always use theme values
```javascript
// ✅ Good
<View style={{ padding: theme.spacing.md }}>

// ❌ Bad
<View style={{ padding: 16 }}>
```

### 2. Use semantic color names
```javascript
// ✅ Good
<Text style={{ color: theme.colors.text.primary }}>

// ❌ Bad
<Text style={{ color: '#2D2D2D' }}>
```

### 3. Create reusable styled components
```javascript
// ✅ Good
const Card = styled.View`
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
`;

// ❌ Bad - Repeating styles everywhere
```

### 4. Use helper functions
```javascript
// ✅ Good
const color = getRockTypeColor(rock.type);

// ❌ Bad
const color = rock.type === 'igneous' ? '#D84A3F' : 
              rock.type === 'sedimentary' ? '#D4A574' : ...
```

### 5. Respect the 8px grid
```javascript
// ✅ Good
margin: theme.spacing.base * 3  // 24px

// ❌ Bad
margin: 25  // Breaks grid alignment
```

## Common Patterns

### Screen Layout
```javascript
<View style={styles.screen}>
  <View style={styles.content}>
    {/* Your content */}
  </View>
</View>

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    padding: theme.spacing.screenPadding,
  },
});
```

### List Items
```javascript
<View style={styles.listItem}>
  {/* Content */}
</View>

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.listItemSpacing,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
});
```

### Buttons
```javascript
<TouchableOpacity style={styles.primaryButton}>
  <Text style={styles.primaryButtonText}>Click Me</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.sm,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  primaryButtonText: {
    color: theme.colors.primary.contrast,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.primary.semiBold,
  },
});
```

---

For more information, see:
- [Design System Guide](/docs/DESIGN_SYSTEM.md)
- [Visual Style Guide](/docs/STYLE_GUIDE.md)
- [Theme Source Code](/mobile-app/src/theme/)
