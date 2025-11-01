# Rock Spotter 🪨

<<<<<<< HEAD
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Railway](https://img.shields.io/badge/Deploy%20to-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://railway.app)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](docker-compose.yml)
[![CI](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/jmenichole/Rock-Spotter/actions)

A production-ready platform where rock enthusiasts can share photos of rocks with one another, participate in iSpy-style rock hunts, earn achievements, and connect with the geology community!
=======
A social platform where rock enthusiasts share discoveries, connect with fellow geologists, and build a thriving community around the fascinating world of rocks and minerals!
>>>>>>> origin/main

## 🌟 Features

### � Social Feed & Community
- **Interactive Feed**: Scroll through posts from fellow rock enthusiasts
- **Like & Comment**: Engage with community discoveries and discussions
- **Follow Users**: Build your network of geology friends
- **Real-time Discussions**: Join conversations about rock formations, identification, and more
- **Share Stories**: Post your geological adventures and findings

### �📸 Rock Photo Sharing
- Upload and share photos of rocks you discover
- Add detailed descriptions, location data, and tags
- Categorize rocks by type (igneous, sedimentary, metamorphic, minerals, fossils)
- Build your personal rock collection gallery
- Get feedback and identification help from the community

### 🗺️ Location-Based Discovery
- Find rocks near your current location using geospatial search
- View rocks on an interactive map
- Share exact GPS coordinates with the community
- Discover rocks in new areas when traveling

### 🏃 iSpy Rock Hunts
- Create custom rock hunts with clues and hints
- Join existing hunts and track your progress
- Mark rocks as found when you discover them
- Complete hunts to earn special achievements
- Set difficulty levels (easy, medium, hard)
- Time-limited hunts with start and end dates
- Track participant progress and completion

### 🏆 Achievements & Gamification
- Earn badges for various milestones:
  - First rock posted
  - Number of rocks shared
  - Hunt completions
  - Social engagement
  - Geology knowledge
  - Special discoveries
- Achievement rarity levels: Common, Rare, Epic, Legendary
- Track your stats: total rocks, hunts completed, community engagement

### 👥 Social Features
- Create and customize user profiles
- View other users' rock collections
- Interact through likes and comments
- Build your reputation in the community
- Track your activity and achievements

## 🎨 Design System

Rock Spotter features a **professionally designed visual system** with:

- **Earthy Color Palette**: Warm browns and sage greens inspired by rocks and nature
- **Rock Type Colors**: Unique colors for each category (🌋 Igneous, 🏜️ Sedimentary, ⛰️ Metamorphic, etc.)
- **Typography**: Inter for UI, Merriweather for content, Roboto Mono for technical data
- **Icons**: Comprehensive emoji-based icon system
- **Dark Mode**: Full dark theme support
- **Accessibility**: WCAG AA compliant colors
- **Responsive**: Breakpoints for all device sizes

📚 **Full Documentation**: 
- [Design System Guide](/docs/DESIGN_SYSTEM.md) - Complete design tokens and principles
- [Visual Style Guide](/docs/STYLE_GUIDE.md) - Quick reference for colors, fonts, and components
- [Theme Implementation](/mobile-app/src/theme/) - Ready-to-use React Native theme

## 🏗️ Project Structure

```
Rock-Spotter/
├── backend/           # Node.js/Express API server
│   ├── src/
│   │   ├── models/        # MongoDB models (User, Rock, Hunt, Achievement)
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth and validation
│   │   └── server.js      # Express app setup
│   ├── package.json
│   └── README.md
├── mobile-app/        # React Native mobile app (planned)
│   ├── src/
│   │   ├── theme/         # Complete design system & styling
│   │   └── assets/        # Icons, images, fonts
│   └── README.md
├── docs/             # Additional documentation
│   ├── API.md             # API reference
│   ├── DESIGN_SYSTEM.md   # Design system guide
│   ├── STYLE_GUIDE.md     # Visual style guide
│   ├── SETUP.md           # Setup instructions
│   ├── HUNTS.md           # Hunt system details
│   └── SAMPLE_DATA.md     # Testing data
└── README.md         # This file
```

## 🚀 Getting Started

### Quick Deploy Options

#### 🌐 Live Demo
- **GitHub Pages Demo**: [jmenichole.github.io/Rock-Spotter](https://jmenichole.github.io/Rock-Spotter)
- **Full App on Vercel**: [rock-spotter.vercel.app](https://rock-spotter.vercel.app) *(coming soon)*

#### ☁️ Deploy Your Own

**Option 1: One-Click Deploy**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jmenichole/Rock-Spotter)

**Option 2: Manual Setup**
```bash
# 1. Clone and setup
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
./deploy-setup.sh

# 2. Follow DEPLOYMENT.md for Vercel + MongoDB Atlas setup
```

📖 **Complete deployment guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

### 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rock-spotter
JWT_SECRET=your-secret-key-here
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

### Mobile App Setup

The mobile app is currently in the planning phase. See `mobile-app/README.md` for more information.

## 📚 API Documentation

The backend provides a RESTful API with the following endpoints:

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/me` - Get current user profile
- `PUT /api/users/profile/me` - Update profile

### Rocks
- `GET /api/rocks` - Get all rocks (with filters)
- `GET /api/rocks/nearby` - Get rocks near location
- `GET /api/rocks/:id` - Get specific rock
- `POST /api/rocks` - Create rock post
- `PUT /api/rocks/:id` - Update rock post
- `DELETE /api/rocks/:id` - Delete rock post
- `POST /api/rocks/:id/like` - Like/unlike rock
- `POST /api/rocks/:id/comment` - Add comment

### Hunts
- `GET /api/hunts` - Get all hunts
- `GET /api/hunts/:id` - Get specific hunt
- `POST /api/hunts` - Create new hunt
- `PUT /api/hunts/:id` - Update hunt
- `DELETE /api/hunts/:id` - Delete hunt
- `POST /api/hunts/:id/join` - Join a hunt
- `POST /api/hunts/:huntId/rocks/:rockId/found` - Mark rock as found
- `GET /api/hunts/my/progress` - Get user's hunt progress

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get specific achievement
- `POST /api/achievements` - Create achievement
- `POST /api/achievements/award` - Award achievement to user
- `GET /api/achievements/user/:userId` - Get user's achievements

For detailed API documentation, see `backend/README.md`

## 🗄️ Database Models

### User
- Username, email, password
- Profile picture and bio
- Rock count and hunt count
- Achievements earned

### Rock
- Title, description, photo URL
- Location (GeoJSON with coordinates)
- Rock type classification
- Tags and visibility settings
- Likes and comments

### Hunt
- Title, description, difficulty
- Creator and participants
- Rock list with hints and order
- Start/end dates and active status
- Progress tracking for participants

### Achievement
- Name, description, icon
- Type and rarity
- Criteria for earning
- Awarded to users

## 🎯 Use Cases

### For Rock Enthusiasts
- Document and share your rock collection
- Connect with other collectors
- Learn about different rock types
- Discover new locations for rock hunting

### For Educators
- Create educational rock hunts for students
- Share geology knowledge through photos
- Organize field trip challenges
- Track student participation

### For Communities
- Organize local rock hunting events
- Create city-wide scavenger hunts
- Promote outdoor activities
- Build community engagement

## 🚀 Deployment

The Rock Spotter backend is **production-ready** and can be deployed in minutes to various cloud platforms!

### 🎯 One-Click Deploy

Choose your preferred platform and deploy instantly:

| Platform | Time | Free Tier | MongoDB | Best For |
|----------|------|-----------|---------|----------|
| [**Docker**](docker-compose.yml) | 1 min | ✅ | Included | Local/VPS |
| [**Railway**](https://railway.app) | 2 min | $5 credit | Included | Easiest |
| [**Render**](https://render.com) | 5 min | 750 hrs/mo | External | Beginners |
| [**Heroku**](https://heroku.com) | 5 min | 1000 hrs/mo | Add-on | Classic |

### ⚡ Quick Deploy Commands

**Docker (Fastest)**:
```bash
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
docker-compose up -d
```

**Railway (Easiest)**:
```bash
npm i -g railway
railway login && railway up
```

See **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** for one-line commands for all platforms!

### 📦 Deployment Files Included

- ✅ `Dockerfile` - Container image for the backend
- ✅ `docker-compose.yml` - Full stack with MongoDB
- ✅ `render.yaml` - Render blueprint configuration
- ✅ `railway.json` - Railway configuration
- ✅ `Procfile` - Heroku/similar platforms
- ✅ `.github/workflows/ci.yml` - CI/CD pipeline
- ✅ `deploy-setup.sh` - Interactive deployment wizard
- ✅ `verify-deployment.sh` - Deployment verification

### 📖 Complete Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide (50+ pages)
- **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** - One-line deploy commands
- **[DEPLOYMENT-FILES.md](DEPLOYMENT-FILES.md)** - File-by-file explanation
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes

### 🔍 Verify Your Deployment

```bash
./verify-deployment.sh https://your-api-url.com
```

Automatically tests all endpoints and confirms your API is working!

## 🔒 Security

- Passwords hashed with bcrypt
- JWT token-based authentication
- Protected API endpoints
- Input validation and sanitization
- MongoDB injection prevention

## 🛣️ Roadmap

### Phase 1 (Current)
- [x] Backend API development
- [x] Database models and relationships
- [x] User authentication
- [x] Rock photo sharing
- [x] Hunt creation and participation
- [x] Achievement system

### Phase 2 (Upcoming)
- [ ] React Native mobile app
- [ ] Photo upload functionality
- [ ] Map integration
- [ ] Real-time notifications
- [ ] Social features (following, feed)

### Phase 3 (Future)
- [ ] AI-powered rock identification
- [ ] Advanced search and filters
- [ ] Leaderboards and competitions
- [ ] In-app messaging
- [ ] Rock identification guides
- [ ] Community forums

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built for rock enthusiasts, geologists, educators, and anyone who loves exploring the natural world!

---

**Happy Rock Hunting!** 🪨🔍
