# Rock Spotter Mobile App

Mobile application for Rock Spotter - Share rock photos, participate in hunts, and connect with fellow rock enthusiasts!

## Features

### 📸 Rock Photo Sharing
- Capture and upload rock photos
- Add descriptions, tags, and location
- View rocks shared by other users
- Like and comment on rock posts

### 🗺️ Location-Based Discovery
- Find rocks near your current location
- View rocks on an interactive map
- Get directions to rock locations

### 🏃 Rock Hunts (iSpy Style)
- Browse available hunts
- Join hunts and track your progress
- Mark rocks as found with photo verification
- Complete hunts to earn achievements

### 🏆 Achievements & Gamification
- Earn badges for milestones
- Track your rock collection stats
- View your hunt completion history
- Compete on leaderboards

### 👥 Social Features
- Create and customize your profile
- Follow other rock enthusiasts
- View activity feed
- Share your discoveries

## Design System

Rock Spotter features a complete, professionally designed visual system:

### 🎨 Color Palette
- **Primary**: Warm brown (#6B5B4C) - Earthy, professional
- **Secondary**: Sage green (#7C9082) - Natural, calming
- **Rock Types**: Unique colors for each category (igneous, sedimentary, etc.)
- **Achievements**: Rarity-based colors (common to legendary)
- **Dark Mode**: Full support with adjusted palette

### 📝 Typography
- **Primary Font**: Inter (UI text, buttons, labels)
- **Secondary Font**: Merriweather (content, descriptions)
- **Monospace**: Roboto Mono (coordinates, technical data)

### 🎯 Key Features
- Complete theme system with light/dark mode
- Icon library with emoji-based icons
- 8px grid-based spacing system
- Accessibility-compliant colors (WCAG AA)
- Responsive breakpoints for all device sizes

📚 **Full Documentation**: See `/docs/DESIGN_SYSTEM.md` and `/docs/STYLE_GUIDE.md`

## Tech Stack (Planned)

- React Native
- React Navigation
- Redux or Context API for state management
- Axios for API calls
- React Native Maps for location features
- React Native Camera for photo capture
- AsyncStorage for local data
- **Custom Theme System** (included in `/src/theme/`)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native development environment
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Installation

Coming soon! The mobile app is currently in planning phase.

To set up for development:

```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## Project Structure (Planned)

```
mobile-app/
├── src/
│   ├── theme/             # Complete design system
│   │   ├── index.js       # Main theme (colors, typography, spacing)
│   │   └── darkTheme.js   # Dark mode variant
│   ├── components/        # Reusable UI components
│   ├── screens/          # App screens
│   │   ├── Auth/         # Login, Register
│   │   ├── Home/         # Home feed
│   │   ├── Rocks/        # Rock list, details, create
│   │   ├── Hunts/        # Hunt list, details, participation
│   │   ├── Profile/      # User profile
│   │   └── Map/          # Map view
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   ├── store/            # State management
│   ├── utils/            # Helper functions
│   ├── constants/        # App constants
│   └── assets/           # Images, fonts, icons
│       └── icons/        # Custom icon assets
├── App.js
└── package.json
```

## Screens

### Authentication
- **Login Screen**: Email/password login
- **Register Screen**: Create new account

### Main Navigation
- **Home Feed**: Latest rock posts from the community
- **Discover**: Browse and search rocks
- **Map**: View rocks on a map
- **Hunts**: Browse and participate in hunts
- **Profile**: View and edit profile

### Rock Features
- **Rock Details**: View full rock information
- **Create Rock**: Upload new rock photo
- **Edit Rock**: Update rock information

### Hunt Features
- **Hunt List**: Browse available hunts
- **Hunt Details**: View hunt information and progress
- **Active Hunt**: Track progress in real-time
- **Hunt Results**: View completion status

### Profile
- **My Profile**: View own stats and achievements
- **User Profile**: View other users' profiles
- **Settings**: App settings and preferences

## API Integration

The mobile app connects to the Rock Spotter backend API. Configure the API URL in the app settings:

```javascript
// src/config/api.js
export const API_BASE_URL = 'http://localhost:3000/api';
```

For production, update to your deployed backend URL.

## Development Roadmap

- [ ] Set up React Native project
- [ ] Implement authentication screens
- [ ] Create rock photo upload feature
- [ ] Implement rock feed and discovery
- [ ] Add map integration
- [ ] Build hunt participation features
- [ ] Implement achievement system
- [ ] Add social features
- [ ] Optimize performance
- [ ] Prepare for App Store/Play Store release

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

MIT
