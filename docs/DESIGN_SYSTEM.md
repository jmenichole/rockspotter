# Rock Spotter Design System

Complete visual design system and style guide for the Rock Spotter platform.

## 🎨 Color Palette

### Primary Colors

The primary palette uses **earthy, natural tones** inspired by rocks and geology, creating a warm and welcoming experience.

#### Primary Brown
- **Main**: `#6B5B4C` - Warm brown reminiscent of sedimentary rocks
- **Light**: `#8F7E6F` - Lighter shade for hover states
- **Dark**: `#4A3D32` - Darker shade for emphasis
- **Usage**: Primary buttons, active states, headers

#### Secondary Sage Green
- **Main**: `#7C9082` - Natural sage green representing outdoors
- **Light**: `#A5B8AA` - Lighter variant
- **Dark**: `#5A6B5E` - Darker variant
- **Usage**: Secondary actions, accents, highlights

### Rock Type Colors

Each rock type has its own signature color for easy visual identification:

| Rock Type | Color | Hex Code | Icon |
|-----------|-------|----------|------|
| Igneous | Volcanic Red | `#D84A3F` | 🌋 |
| Sedimentary | Sandy Beige | `#D4A574` | 🏜️ |
| Metamorphic | Slate Blue | `#6B8E9F` | ⛰️ |
| Mineral | Crystal Purple | `#8B7B9B` | 💎 |
| Fossil | Fossil Brown | `#8B7355` | 🦴 |
| Other | Neutral Gray-Green | `#7A8B8B` | 🪨 |

### Hunt Difficulty Colors

Visual indicators for hunt difficulty levels:

- **Easy**: `#81C784` (Light Green) ⭐
- **Medium**: `#FFB74D` (Amber) ⭐⭐
- **Hard**: `#E57373` (Light Red) ⭐⭐⭐

### Achievement Rarity

Color-coded achievement badges by rarity:

- **Common**: `#9E9E9E` (Gray) 🥉
- **Rare**: `#64B5F6` (Blue) 🥈
- **Epic**: `#BA68C8` (Purple) 🥇
- **Legendary**: `#FFD54F` (Gold) 👑

### Background Colors

#### Light Mode
- **Primary**: `#FAFAF8` - Off-white with warm tone
- **Secondary**: `#F5F3F0` - Light beige
- **Card**: `#FFFFFF` - Pure white for content cards

#### Dark Mode
- **Primary**: `#1E1E1E` - True dark background
- **Secondary**: `#2C2C2C` - Slightly lighter
- **Card**: `#2C2C2C` - Dark cards

### Text Colors

#### Light Mode
- **Primary**: `#2D2D2D` - Almost black for main text
- **Secondary**: `#666666` - Medium gray for supporting text
- **Tertiary**: `#999999` - Light gray for hints/captions

#### Dark Mode
- **Primary**: `#E8E8E8` - Almost white for main text
- **Secondary**: `#B0B0B0` - Light gray for supporting text
- **Tertiary**: `#808080` - Medium gray for hints/captions

## 📝 Typography

### Font Families

#### Primary Font: Inter
- **Purpose**: UI text, buttons, labels, body text
- **Characteristics**: Clean, modern sans-serif with excellent readability
- **Weights**: Regular (400), Medium (500), SemiBold (600), Bold (700)

#### Secondary Font: Merriweather
- **Purpose**: Rock descriptions, longer content, quotes
- **Characteristics**: Serif font that adds elegance and readability
- **Weights**: Regular (400), Italic, Bold (700)

#### Monospace: Roboto Mono
- **Purpose**: Coordinates, technical data, codes
- **Characteristics**: Fixed-width for aligned technical information

### Font Scale

| Size Name | Pixels | Usage |
|-----------|--------|-------|
| XXS | 10px | Tiny labels, badges |
| XS | 12px | Captions, metadata |
| SM | 14px | Supporting text |
| MD | 16px | Body text (default) |
| LG | 18px | Emphasized text |
| XL | 20px | Subheadings |
| XXL | 24px | Section headers |
| XXXL | 28px | Page titles |
| Display 1 | 32px | Large headings |
| Display 2 | 36px | Hero text |
| Display 3 | 40px | Marketing headers |
| Display 4 | 48px | Extra large display |

### Line Heights

- **Tight**: 1.2 - For large headings
- **Normal**: 1.5 - Default for most text
- **Relaxed**: 1.75 - For longer content
- **Loose**: 2.0 - For very spacious layouts

## 🔲 Spacing System

Based on an **8px grid system** for consistency:

| Name | Value | Usage |
|------|-------|-------|
| XS | 4px | Tiny gaps, icon spacing |
| SM | 8px | Small padding, compact layouts |
| MD | 16px | Default spacing, card padding |
| LG | 24px | Section spacing |
| XL | 32px | Large sections |
| XXL | 48px | Major separations |
| XXXL | 64px | Screen sections |

### Component-Specific Spacing

- **Screen Padding**: 16px (consistent edge padding)
- **Card Padding**: 16px (internal card content)
- **Section Spacing**: 24px (between major sections)
- **List Item Spacing**: 12px (between list items)

## 🔘 Border Radius

Rounded corners for a friendly, modern feel:

- **None**: 0px - Sharp corners
- **XS**: 4px - Subtle rounding
- **SM**: 8px - Default for most elements
- **MD**: 12px - Cards, modals
- **LG**: 16px - Large cards
- **XL**: 24px - Hero elements
- **Round**: 9999px - Fully circular (avatars, badges)

## 🌑 Shadows & Elevation

Subtle shadows create depth and hierarchy:

### Shadow Levels

- **None**: No shadow (flat elements)
- **SM**: Subtle lift (small cards, chips)
- **MD**: Default elevation (cards, buttons)
- **LG**: Prominent (modals, dropdowns)
- **XL**: Floating (overlays, notifications)

### Dark Mode Shadows

Shadows are darker and more prominent in dark mode for better visibility.

## 🎭 Icons

### Icon Set

Using emoji-based icons for cross-platform consistency and charm:

#### Navigation Icons
- Home: 🏠
- Discover: 🔍
- Map: 🗺️
- Hunts: 🏃
- Profile: 👤

#### Action Icons
- Like: ❤️
- Comment: 💬
- Share: 📤
- Location: 📍
- Camera: 📸
- Add: ➕
- Edit: ✏️
- Delete: 🗑️

#### Achievement Icons
- Trophy: 🏆
- Star: ⭐
- Medal: 🏅
- Crown: 👑
- Gem: 💎
- Fire: 🔥

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| XS | 12px | Inline icons |
| SM | 16px | List icons |
| MD | 24px | Default buttons |
| LG | 32px | Large buttons |
| XL | 48px | Feature icons |
| XXL | 64px | Hero icons |

## ✨ Animations

### Duration Standards

- **Fast**: 150ms - Quick transitions, hovers
- **Normal**: 300ms - Default animations
- **Slow**: 500ms - Complex transitions

### Easing Functions

- **Linear**: Constant speed
- **Ease-In**: Slow start, fast end
- **Ease-Out**: Fast start, slow end (preferred for most UX)
- **Ease-In-Out**: Smooth acceleration and deceleration

## 📱 Responsive Breakpoints

| Breakpoint | Width | Device Type |
|------------|-------|-------------|
| XS | 320px | Small phones |
| SM | 375px | Standard phones |
| MD | 414px | Large phones |
| LG | 768px | Tablets |
| XL | 1024px | Large tablets/small desktops |

## 🎯 Design Principles

### 1. Natural & Earthy
- Color palette inspired by rocks, stones, and nature
- Warm, welcoming tones that evoke outdoor exploration
- Organic shapes and rounded corners

### 2. Clear & Readable
- High contrast text for accessibility
- Generous spacing and clear hierarchy
- Large touch targets (minimum 44x44px)

### 3. Consistent & Predictable
- Systematic spacing using 8px grid
- Consistent color usage across features
- Predictable interaction patterns

### 4. Fun & Engaging
- Emoji icons add personality and approachability
- Achievement colors create excitement
- Playful rock type colors make categories memorable

### 5. Accessible
- WCAG AA compliant color contrast
- Dark mode support for low-light environments
- Clear visual indicators and states

## 🖼️ Component Examples

### Button Styles

**Primary Button**
- Background: Primary Brown (#6B5B4C)
- Text: White
- Border Radius: 8px
- Padding: 12px 24px
- Shadow: MD

**Secondary Button**
- Background: Secondary Sage (#7C9082)
- Text: White
- Border Radius: 8px
- Padding: 12px 24px
- Shadow: SM

**Text Button**
- Background: Transparent
- Text: Primary Brown (#6B5B4C)
- No shadow

### Card Styles

**Standard Card**
- Background: White (Light) / #2C2C2C (Dark)
- Border Radius: 12px
- Padding: 16px
- Shadow: MD
- Border: 1px solid #E0E0E0 (Light) / #3A3A3A (Dark)

**Rock Card**
- Includes image at top
- Rock type badge in corner (colored by type)
- Title, description, location
- Like/comment counts at bottom

### Input Styles

**Text Input**
- Background: White (Light) / #2C2C2C (Dark)
- Border: 1px solid #E0E0E0
- Border Radius: 8px
- Padding: 12px 16px
- Focus: 2px border in Secondary Sage

## 📐 Layout Guidelines

### Grid System

Use 16px padding on screen edges, 24px spacing between major sections.

### Content Width

Maximum content width: 600px for optimal readability on larger screens.

### Safe Areas

Account for device notches and rounded corners with proper safe area insets.

## 🎨 Usage Examples

### Rock Post Card
```
┌─────────────────────────────┐
│ [Rock Photo - Full Width]   │
│ 🌋 Igneous                  │
├─────────────────────────────┤
│ Beautiful Granite Boulder   │
│ Found near the river...     │
│ 📍 San Francisco, CA        │
│                             │
│ ❤️ 24  💬 5  👤 @rockfan   │
└─────────────────────────────┘
```

### Hunt Card
```
┌─────────────────────────────┐
│ Downtown Rock Hunt          │
│ ⭐⭐ Medium Difficulty      │
├─────────────────────────────┤
│ Find 5 hidden rocks in      │
│ downtown area!              │
│                             │
│ Progress: ▓▓▓▓▓░░░░░ 5/10  │
│ 👥 23 participants          │
│ ⏰ Ends in 3 days           │
└─────────────────────────────┘
```

### Achievement Badge
```
┌──────────────┐
│   🏆         │
│ First Rock   │
│   [RARE]     │
└──────────────┘
```

## 🔄 State Indicators

### Interactive States

- **Default**: Base colors
- **Hover**: 8% opacity overlay of primary color
- **Active/Pressed**: 12% opacity overlay
- **Disabled**: 50% opacity, gray colors
- **Focus**: 2px border in focus color

### Loading States

- Use skeleton screens with subtle pulse animation
- Loading spinners in primary color
- Disabled state for buttons during loading

## 📚 Implementation

### React Native Usage

```javascript
import { theme } from './src/theme';

// Using colors
<Text style={{ color: theme.colors.text.primary }}>
  Hello World
</Text>

// Using typography
<Text style={{ 
  fontFamily: theme.typography.fonts.primary.bold,
  fontSize: theme.typography.sizes.xl 
}}>
  Heading
</Text>

// Using spacing
<View style={{ 
  padding: theme.spacing.md,
  marginTop: theme.spacing.lg 
}}>
  Content
</View>
```

## 🎨 Brand Assets

### Logo Specifications

The Rock Spotter logo should:
- Use the primary brown color
- Include a simple rock or mountain icon
- Be legible at small sizes (16x16px minimum)
- Work in monochrome for versatility

### App Icon

- Background: Primary Brown gradient
- Icon: Stylized rock or gem in white/cream
- Rounded corners per platform guidelines
- Include small magnifying glass detail

---

**Last Updated**: October 2025  
**Version**: 1.0  

For questions or suggestions about the design system, please open an issue or contact the design team.
