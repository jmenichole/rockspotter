# Rock Spotter API Documentation

Complete API reference for the Rock Spotter platform.

## Base URL

```
http://localhost:3000/api
```

For production, replace with your deployed API URL.

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Tokens are obtained through the login or register endpoints and expire after 7 days.

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or invalid
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Endpoints

### Users & Authentication

#### Register User
Create a new user account.

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "rockfan123",
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "username": "rockfan123",
    "email": "user@example.com",
    "profilePicture": "",
    "bio": "",
    "rockCount": 0,
    "huntCount": 0,
    "achievements": []
  },
  "token": "jwt_token_here"
}
```

#### Login
Authenticate and receive a JWT token.

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { /* user object */ },
  "token": "jwt_token_here"
}
```

#### Get My Profile
Get the authenticated user's profile.

```http
GET /api/users/profile/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "username": "rockfan123",
    "email": "user@example.com",
    "profilePicture": "https://example.com/avatar.jpg",
    "bio": "Rock enthusiast since 2025",
    "rockCount": 15,
    "huntCount": 3,
    "achievements": [/* achievement objects */]
  }
}
```

#### Update Profile
Update the authenticated user's profile.

```http
PUT /api/users/profile/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "bio": "Updated bio",
  "profilePicture": "https://example.com/new-avatar.jpg"
}
```

#### Get User by ID
Get a specific user's public profile.

```http
GET /api/users/:id
```

---

### Rocks

#### Get All Rocks
Retrieve a paginated list of rocks with optional filters.

```http
GET /api/rocks?page=1&limit=20&rockType=igneous&userId=user_id
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `rockType` (optional): Filter by type (igneous, sedimentary, metamorphic, mineral, fossil, other)
- `userId` (optional): Filter by user

**Response:**
```json
{
  "rocks": [
    {
      "_id": "rock_id",
      "title": "Beautiful Granite",
      "description": "Found this amazing specimen",
      "photo": "https://example.com/rock.jpg",
      "location": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749],
        "address": "San Francisco, CA"
      },
      "rockType": "igneous",
      "user": {
        "_id": "user_id",
        "username": "rockfan123",
        "profilePicture": "https://example.com/avatar.jpg"
      },
      "likes": ["user_id_1", "user_id_2"],
      "comments": [],
      "tags": ["granite", "pink"],
      "isPublic": true,
      "createdAt": "2025-10-16T12:00:00Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

#### Get Nearby Rocks
Find rocks near a specific location.

```http
GET /api/rocks/nearby?longitude=-122.4194&latitude=37.7749&maxDistance=5000
```

**Query Parameters:**
- `longitude` (required): Longitude coordinate
- `latitude` (required): Latitude coordinate
- `maxDistance` (optional): Maximum distance in meters (default: 5000)

#### Get Rock by ID
Retrieve a specific rock with full details.

```http
GET /api/rocks/:id
```

**Response:**
```json
{
  "rock": {
    "_id": "rock_id",
    "title": "Beautiful Granite",
    "description": "Found this amazing specimen",
    "photo": "https://example.com/rock.jpg",
    "location": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749],
      "address": "San Francisco, CA"
    },
    "rockType": "igneous",
    "user": { /* user object */ },
    "likes": ["user_id_1"],
    "comments": [
      {
        "_id": "comment_id",
        "user": { /* user object */ },
        "text": "Amazing find!",
        "createdAt": "2025-10-16T12:30:00Z"
      }
    ],
    "tags": ["granite", "pink"],
    "isPublic": true,
    "createdAt": "2025-10-16T12:00:00Z"
  }
}
```

#### Create Rock
Share a new rock photo.

```http
POST /api/rocks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Beautiful Granite",
  "description": "Found this amazing specimen near the river",
  "photo": "https://example.com/rock.jpg",
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

**Response:**
```json
{
  "message": "Rock posted successfully",
  "rock": { /* rock object */ }
}
```

#### Update Rock
Update a rock post (only by owner).

```http
PUT /api/rocks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "rockType": "metamorphic",
  "tags": ["updated", "tags"],
  "isPublic": false
}
```

#### Delete Rock
Delete a rock post (only by owner).

```http
DELETE /api/rocks/:id
Authorization: Bearer <token>
```

#### Like/Unlike Rock
Toggle like on a rock post.

```http
POST /api/rocks/:id/like
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Rock liked",
  "likes": 5
}
```

#### Add Comment
Add a comment to a rock post.

```http
POST /api/rocks/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Amazing find! Where exactly did you find this?"
}
```

---

### Hunts

#### Get All Hunts
Retrieve a paginated list of hunts with optional filters.

```http
GET /api/hunts?page=1&limit=20&isActive=true&difficulty=medium
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `isActive` (optional): Filter by active status (true/false)
- `difficulty` (optional): Filter by difficulty (easy, medium, hard)

**Response:**
```json
{
  "hunts": [
    {
      "_id": "hunt_id",
      "title": "Downtown Rock Hunt",
      "description": "Find 5 hidden rocks in downtown!",
      "creator": { /* user object */ },
      "rocks": [
        {
          "rock": { /* rock object */ },
          "hint": "Look near the fountain",
          "order": 1
        }
      ],
      "difficulty": "medium",
      "participants": [],
      "startDate": "2025-10-20T00:00:00Z",
      "endDate": "2025-10-27T23:59:59Z",
      "isActive": true,
      "maxParticipants": 100
    }
  ],
  "totalPages": 3,
  "currentPage": 1
}
```

#### Get Hunt by ID
Retrieve a specific hunt with full details.

```http
GET /api/hunts/:id
```

#### Create Hunt
Create a new rock hunt.

```http
POST /api/hunts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Downtown Rock Hunt",
  "description": "Find 5 hidden rocks in downtown area!",
  "rocks": [
    {
      "rock": "rock_id_1",
      "hint": "Look near the fountain in the park",
      "order": 1
    },
    {
      "rock": "rock_id_2",
      "hint": "Hidden behind the library",
      "order": 2
    }
  ],
  "difficulty": "medium",
  "startDate": "2025-10-20T00:00:00.000Z",
  "endDate": "2025-10-27T23:59:59.999Z",
  "maxParticipants": 100
}
```

#### Update Hunt
Update a hunt (only by creator).

```http
PUT /api/hunts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "difficulty": "hard",
  "isActive": false
}
```

#### Delete Hunt
Delete a hunt (only by creator).

```http
DELETE /api/hunts/:id
Authorization: Bearer <token>
```

#### Join Hunt
Join an active hunt.

```http
POST /api/hunts/:id/join
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Joined hunt successfully",
  "hunt": { /* hunt object with your participation */ }
}
```

#### Mark Rock as Found
Mark a rock as found in a hunt you're participating in.

```http
POST /api/hunts/:huntId/rocks/:rockId/found
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Rock marked as found",
  "completed": false,
  "progress": {
    "found": 3,
    "total": 5
  }
}
```

When all rocks are found:
```json
{
  "message": "Rock marked as found",
  "completed": true,
  "progress": {
    "found": 5,
    "total": 5
  }
}
```

#### Get My Hunt Progress
Get your progress in all hunts you're participating in.

```http
GET /api/hunts/my/progress
Authorization: Bearer <token>
```

**Response:**
```json
{
  "hunts": [
    {
      "hunt": {
        "_id": "hunt_id",
        "title": "Downtown Rock Hunt",
        "description": "Find 5 hidden rocks",
        "difficulty": "medium",
        "totalRocks": 5,
        "creator": { /* user object */ }
      },
      "progress": {
        "rocksFound": 3,
        "totalRocks": 5,
        "completed": false,
        "completedAt": null,
        "startedAt": "2025-10-20T10:00:00Z"
      }
    }
  ]
}
```

---

### Achievements

#### Get All Achievements
Retrieve all available achievements with optional filters.

```http
GET /api/achievements?type=rocks&rarity=rare
```

**Query Parameters:**
- `type` (optional): Filter by type (rocks, hunts, social, geology, special)
- `rarity` (optional): Filter by rarity (common, rare, epic, legendary)

**Response:**
```json
{
  "achievements": [
    {
      "_id": "achievement_id",
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
  ]
}
```

#### Get Achievement by ID
Retrieve a specific achievement.

```http
GET /api/achievements/:id
```

#### Create Achievement
Create a new achievement.

```http
POST /api/achievements
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Rock Collector",
  "description": "Share 10 rock photos",
  "icon": "📸",
  "type": "rocks",
  "criteria": {
    "type": "count",
    "target": 10
  },
  "rarity": "rare"
}
```

#### Award Achievement
Award an achievement to the authenticated user.

```http
POST /api/achievements/award
Authorization: Bearer <token>
Content-Type: application/json

{
  "achievementId": "achievement_id"
}
```

#### Get User's Achievements
Get achievements earned by a specific user.

```http
GET /api/achievements/user/:userId
```

Get your own achievements:
```http
GET /api/achievements/user/me/achievements
Authorization: Bearer <token>
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Errors

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**403 Forbidden:**
```json
{
  "error": "Not authorized"
}
```

**400 Bad Request:**
```json
{
  "error": "Invalid request parameters"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, rate limiting should be added to prevent abuse.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for web clients.

## Data Validation

All endpoints validate input data. Invalid data will return a 400 Bad Request with details about validation errors.

---

## Examples

### Complete Flow: Register, Create Rock, Join Hunt

1. **Register:**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"rockfan","email":"fan@rocks.com","password":"rocks123"}'
```

2. **Create a rock post:**
```bash
curl -X POST http://localhost:3000/api/rocks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"Granite Boulder",
    "description":"Huge granite boulder",
    "photo":"https://example.com/granite.jpg",
    "location":{"type":"Point","coordinates":[-122.4,37.7],"address":"SF"},
    "rockType":"igneous",
    "tags":["granite","big"],
    "isPublic":true
  }'
```

3. **Join a hunt:**
```bash
curl -X POST http://localhost:3000/api/hunts/HUNT_ID/join \
  -H "Authorization: Bearer YOUR_TOKEN"
```

4. **Mark rock as found:**
```bash
curl -X POST http://localhost:3000/api/hunts/HUNT_ID/rocks/ROCK_ID/found \
  -H "Authorization: Bearer YOUR_TOKEN"
```
