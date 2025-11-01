# Rock Spotter Backend API

Backend API for Rock Spotter - A platform where rock enthusiasts can share photos of rocks, participate in rock hunts, and earn achievements.

## Features

- 🔐 User authentication and authorization (JWT)
- 📸 Rock photo sharing with location data
- 🗺️ Location-based rock discovery
- 🏃 "iSpy" style rock hunts
- 🏆 Achievement system
- 💬 Comments and likes on rock posts
- 👥 User profiles and stats

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rock-spotter
JWT_SECRET=your-secret-key-here
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

#### Register a new user
```
POST /api/users/register
Content-Type: application/json

{
  "username": "rockfan123",
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Rocks

#### Get all rocks
```
GET /api/rocks?page=1&limit=20&rockType=igneous
```

#### Get nearby rocks
```
GET /api/rocks/nearby?longitude=-122.4194&latitude=37.7749&maxDistance=5000
```

#### Create a rock post
```
POST /api/rocks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Beautiful Granite Rock",
  "description": "Found this amazing granite specimen!",
  "photo": "https://example.com/photo.jpg",
  "location": {
    "type": "Point",
    "coordinates": [-122.4194, 37.7749],
    "address": "San Francisco, CA"
  },
  "rockType": "igneous",
  "tags": ["granite", "pink", "sparkly"],
  "isPublic": true
}
```

#### Like a rock
```
POST /api/rocks/:id/like
Authorization: Bearer <token>
```

#### Add comment to rock
```
POST /api/rocks/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Amazing find!"
}
```

### Hunts

#### Get all hunts
```
GET /api/hunts?isActive=true&difficulty=medium&page=1&limit=20
```

#### Create a hunt
```
POST /api/hunts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Downtown Rock Hunt",
  "description": "Find 5 rocks hidden downtown!",
  "rocks": [
    {
      "rock": "rock_id_1",
      "hint": "Look near the fountain",
      "order": 1
    }
  ],
  "difficulty": "medium",
  "startDate": "2025-10-20T00:00:00Z",
  "endDate": "2025-10-27T23:59:59Z",
  "maxParticipants": 100
}
```

#### Join a hunt
```
POST /api/hunts/:id/join
Authorization: Bearer <token>
```

#### Mark rock as found
```
POST /api/hunts/:huntId/rocks/:rockId/found
Authorization: Bearer <token>
```

#### Get my hunt progress
```
GET /api/hunts/my/progress
Authorization: Bearer <token>
```

### Achievements

#### Get all achievements
```
GET /api/achievements?type=rocks&rarity=rare
```

#### Create achievement
```
POST /api/achievements
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "First Rock",
  "description": "Share your first rock photo",
  "icon": "🪨",
  "type": "rocks",
  "criteria": {
    "type": "count",
    "target": 1
  },
  "rarity": "common"
}
```

### User Profile

#### Get my profile
```
GET /api/users/profile/me
Authorization: Bearer <token>
```

#### Update profile
```
PUT /api/users/profile/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "bio": "Rock enthusiast since 2025",
  "profilePicture": "https://example.com/avatar.jpg"
}
```

## Data Models

### User
- username
- email
- password (hashed)
- profilePicture
- bio
- achievements (references)
- rockCount
- huntCount

### Rock
- title
- description
- photo
- location (GeoJSON Point with coordinates)
- rockType (igneous, sedimentary, metamorphic, mineral, fossil, other)
- user (reference)
- likes (user references)
- comments
- tags
- isPublic

### Hunt
- title
- description
- creator (user reference)
- rocks (array with rock reference, hint, order)
- difficulty (easy, medium, hard)
- participants (with progress tracking)
- startDate
- endDate
- isActive
- maxParticipants

### Achievement
- name
- description
- icon
- type (rocks, hunts, social, geology, special)
- criteria (type, target, details)
- rarity (common, rare, epic, legendary)

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a JSON object with an `error` field:
```json
{
  "error": "Error message here"
}
```

## Future Enhancements

- File upload for photos (currently expects URLs)
- Real-time notifications using WebSockets
- Advanced search and filtering
- Social features (following, feed)
- Leaderboards
- Rock identification using AI
- Photo filters and editing

## License

MIT
