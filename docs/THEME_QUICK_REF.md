# Rock Spotter Theme - Quick Reference

## 🎨 Primary Colors

**Primary Brown** `#6B5B4C` - Warm, earthy, professional  
**Secondary Sage** `#7C9082` - Natural, calming, outdoor-inspired

## 🪨 Rock Type Colors

| Type | Color | Hex | Icon |
|------|-------|-----|------|
| Igneous | Volcanic Red | `#D84A3F` | 🌋 |
| Sedimentary | Sandy Beige | `#D4A574` | 🏜️ |
| Metamorphic | Slate Blue | `#6B8E9F` | ⛰️ |
| Mineral | Crystal Purple | `#8B7B9B` | 💎 |
| Fossil | Fossil Brown | `#8B7355` | 🦴 |
| Other | Gray-Green | `#7A8B8B` | 🪨 |

## 🎯 Difficulty Colors

- **Easy** `#81C784` ⭐
- **Medium** `#FFB74D` ⭐⭐
- **Hard** `#E57373` ⭐⭐⭐

## 🏆 Rarity Colors

- **Common** `#9E9E9E` 🥉
- **Rare** `#64B5F6` 🥈
- **Epic** `#BA68C8` 🥇
- **Legendary** `#FFD54F` 👑

## 📝 Typography

**Primary Font**: Inter (Regular, Medium, SemiBold, Bold)  
**Content Font**: Merriweather (Regular, Italic, Bold)  
**Technical Font**: Roboto Mono (Regular)

**Base Size**: 16px  
**Scale**: 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48

## 📐 Spacing

**Base Unit**: 8px  
**Scale**: 4, 8, 16, 24, 32, 48, 64

## 🔘 Border Radius

**XS**: 4px | **SM**: 8px | **MD**: 12px | **LG**: 16px | **XL**: 24px | **Round**: 9999px

## 🎭 Icons

### Navigation
🏠 Home | 🔍 Discover | 🗺️ Map | 🏃 Hunts | 👤 Profile

### Actions
❤️ Like | 💬 Comment | 📤 Share | 📍 Location | 📸 Camera  
➕ Add | ✏️ Edit | 🗑️ Delete | 💾 Save | 🔧 Filter | 🔍 Search

### Achievements
🏆 Trophy | ⭐ Star | 🏅 Medal | 👑 Crown | 💎 Gem | 🔥 Fire

## 💻 Usage

```javascript
import { theme } from '../theme';

// Colors
backgroundColor: theme.colors.primary.main

// Typography
fontFamily: theme.typography.fonts.primary.bold
fontSize: theme.typography.sizes.xl

// Spacing
padding: theme.spacing.md
margin: theme.spacing.lg

// Shadows
...theme.shadows.md

// Icons
{theme.icons.rockTypes.igneous}
```

## 📚 Full Documentation

- **Design System**: `/docs/DESIGN_SYSTEM.md`
- **Style Guide**: `/docs/STYLE_GUIDE.md`
- **Usage Guide**: `/docs/THEME_USAGE.md`
- **Theme Files**: `/mobile-app/src/theme/`

---

**Version**: 1.0 | **Last Updated**: October 2025
