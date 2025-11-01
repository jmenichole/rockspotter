# Sample Data for Testing

This document provides sample data you can use to test the Rock Spotter API.

## Sample Users

### User 1: Rock Enthusiast
```json
{
  "username": "rockfan123",
  "email": "rockfan@example.com",
  "password": "password123",
  "bio": "I love collecting rocks and minerals! Been rock hunting for 5 years."
}
```

### User 2: Geologist
```json
{
  "username": "geopro",
  "email": "geo@example.com",
  "password": "geology123",
  "bio": "Professional geologist and rock identification expert."
}
```

### User 3: Beginner
```json
{
  "username": "newrockfan",
  "email": "newbie@example.com",
  "password": "rocks2025",
  "bio": "Just started my rock collection!"
}
```

## Sample Rocks

### Granite Sample
```json
{
  "title": "Beautiful Pink Granite",
  "description": "Found this stunning pink granite near the river. The crystals are clearly visible and it has a nice polished surface from water erosion.",
  "location": {
    "type": "Point",
    "coordinates": [-122.4194, 37.7749],
    "address": "Golden Gate Park, San Francisco, CA"
  },
  "rockType": "igneous",
  "tags": ["granite", "pink", "crystalline", "polished"],
  "isPublic": true
}
```

### Sedimentary Rock
```json
{
  "title": "Layered Sandstone",
  "description": "Amazing layered sandstone showing different periods of deposition. You can see the various colors representing different mineral contents.",
  "location": {
    "type": "Point",
    "coordinates": [-111.7356, 36.0544],
    "address": "Grand Canyon, Arizona"
  },
  "rockType": "sedimentary",
  "tags": ["sandstone", "layered", "colorful", "canyon"],
  "isPublic": true
}
```

### Fossil Find
```json
{
  "title": "Trilobite Fossil",
  "description": "Incredible trilobite fossil preserved in limestone. Approximately 400 million years old!",
  "location": {
    "type": "Point",
    "coordinates": [-84.5120, 39.1031],
    "address": "Cincinnati, Ohio"
  },
  "rockType": "fossil",
  "tags": ["fossil", "trilobite", "limestone", "paleozoic"],
  "isPublic": true
}
```

### Quartz Crystal
```json
{
  "title": "Clear Quartz Cluster",
  "description": "Beautiful cluster of clear quartz crystals. Found in an old mining area. Some crystals are 3-4 inches long.",
  "location": {
    "type": "Point",
    "coordinates": [-105.2705, 40.0150],
    "address": "Boulder, Colorado"
  },
  "rockType": "mineral",
  "tags": ["quartz", "crystal", "clear", "cluster"],
  "isPublic": true
}
```

### Metamorphic Rock
```json
{
  "title": "Foliated Schist",
  "description": "Mica schist with beautiful foliation patterns. The layers shimmer in the sunlight.",
  "location": {
    "type": "Point",
    "coordinates": [-71.0589, 42.3601],
    "address": "Boston, Massachusetts"
  },
  "rockType": "metamorphic",
  "tags": ["schist", "mica", "foliated", "shiny"],
  "isPublic": true
}
```

## Sample Achievements

### Beginner Achievements
```json
[
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
  },
  {
    "name": "Rock Collector",
    "description": "Share 10 rock photos",
    "icon": "📸",
    "type": "rocks",
    "criteria": {
      "type": "count",
      "target": 10
    },
    "rarity": "common"
  },
  {
    "name": "First Hunt",
    "description": "Complete your first rock hunt",
    "icon": "🏃",
    "type": "hunts",
    "criteria": {
      "type": "count",
      "target": 1
    },
    "rarity": "common"
  }
]
```

### Advanced Achievements
```json
[
  {
    "name": "Rock Master",
    "description": "Share 50 rock photos",
    "icon": "🏆",
    "type": "rocks",
    "criteria": {
      "type": "count",
      "target": 50
    },
    "rarity": "rare"
  },
  {
    "name": "Hunt Champion",
    "description": "Complete 10 rock hunts",
    "icon": "👑",
    "type": "hunts",
    "criteria": {
      "type": "count",
      "target": 10
    },
    "rarity": "rare"
  },
  {
    "name": "Rock Variety",
    "description": "Share rocks of all 6 types",
    "icon": "🌈",
    "type": "rocks",
    "criteria": {
      "type": "variety",
      "target": 6,
      "details": {
        "types": ["igneous", "sedimentary", "metamorphic", "mineral", "fossil", "other"]
      }
    },
    "rarity": "epic"
  }
]
```

### Special Achievements
```json
[
  {
    "name": "Fossil Hunter",
    "description": "Find and share 5 fossils",
    "icon": "🦴",
    "type": "geology",
    "criteria": {
      "type": "specific",
      "target": 5,
      "details": {
        "rockType": "fossil"
      }
    },
    "rarity": "epic"
  },
  {
    "name": "Crystal Collector",
    "description": "Share 10 mineral/crystal specimens",
    "icon": "💎",
    "type": "geology",
    "criteria": {
      "type": "specific",
      "target": 10,
      "details": {
        "rockType": "mineral"
      }
    },
    "rarity": "rare"
  },
  {
    "name": "Community Favorite",
    "description": "Receive 100 likes on your rocks",
    "icon": "❤️",
    "type": "social",
    "criteria": {
      "type": "count",
      "target": 100,
      "details": {
        "metric": "likes"
      }
    },
    "rarity": "legendary"
  }
]
```

## Sample Hunts

### Easy Hunt
```json
{
  "title": "Park Rock Adventure",
  "description": "Find 3 rocks in the city park. Great for beginners!",
  "difficulty": "easy",
  "startDate": "2025-10-20T00:00:00.000Z",
  "endDate": "2025-10-27T23:59:59.999Z",
  "maxParticipants": 50,
  "rocks": [
    {
      "rock": "ROCK_ID_1",
      "hint": "Near the main fountain, look for a pink granite stone",
      "order": 1
    },
    {
      "rock": "ROCK_ID_2",
      "hint": "By the old oak tree at the north entrance",
      "order": 2
    },
    {
      "rock": "ROCK_ID_3",
      "hint": "Hidden behind the playground, near the swings",
      "order": 3
    }
  ]
}
```

### Medium Hunt
```json
{
  "title": "Downtown Geology Tour",
  "description": "Discover the geological history of downtown through 5 interesting rock specimens!",
  "difficulty": "medium",
  "startDate": "2025-10-20T00:00:00.000Z",
  "endDate": "2025-11-03T23:59:59.999Z",
  "maxParticipants": 30,
  "rocks": [
    {
      "rock": "ROCK_ID_4",
      "hint": "Look at the foundation of the old library building",
      "order": 1
    },
    {
      "rock": "ROCK_ID_5",
      "hint": "In the sculpture garden, there's a metamorphic beauty",
      "order": 2
    },
    {
      "rock": "ROCK_ID_6",
      "hint": "The courthouse steps are made of this historic stone",
      "order": 3
    },
    {
      "rock": "ROCK_ID_7",
      "hint": "Hidden in plain sight at the intersection of 5th and Main",
      "order": 4
    },
    {
      "rock": "ROCK_ID_8",
      "hint": "Where the old meets the new, near the museum entrance",
      "order": 5
    }
  ]
}
```

### Hard Hunt
```json
{
  "title": "Mountain Mystery Hunt",
  "description": "A challenging hunt for experienced rock hunters. Find 10 rare specimens across the mountain trails!",
  "difficulty": "hard",
  "startDate": "2025-10-20T00:00:00.000Z",
  "endDate": "2025-11-10T23:59:59.999Z",
  "maxParticipants": 20,
  "rocks": [
    {
      "rock": "ROCK_ID_9",
      "hint": "Where the morning sun first touches the eastern slope",
      "order": 1
    },
    {
      "rock": "ROCK_ID_10",
      "hint": "Follow the old mining trail to the abandoned cabin",
      "order": 2
    },
    {
      "rock": "ROCK_ID_11",
      "hint": "At the highest point, where eagles soar",
      "order": 3
    }
  ]
}
```

## Testing Workflow

### 1. Register Users
```bash
# Register User 1
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"rockfan123","email":"rockfan@example.com","password":"password123"}'

# Save the token as TOKEN1
```

### 2. Create Rocks
```bash
# Create rock as User 1
curl -X POST http://localhost:3000/api/rocks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"title":"Beautiful Pink Granite","description":"Found this stunning pink granite...","location":{"type":"Point","coordinates":[-122.4194,37.7749],"address":"Golden Gate Park, San Francisco, CA"},"rockType":"igneous","tags":["granite","pink"],"isPublic":true}'

# Save rock ID as ROCK1_ID
```

### 3. Create Hunt
```bash
# Create hunt as User 1
curl -X POST http://localhost:3000/api/hunts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"title":"Park Rock Adventure","description":"Find 3 rocks in the city park","difficulty":"easy","startDate":"2025-10-20T00:00:00.000Z","endDate":"2025-10-27T23:59:59.999Z","rocks":[{"rock":"'$ROCK1_ID'","hint":"Near the fountain","order":1}]}'

# Save hunt ID as HUNT1_ID
```

### 4. Participate in Hunt
```bash
# Register User 2
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"geopro","email":"geo@example.com","password":"geology123"}'

# Save as TOKEN2

# Join hunt as User 2
curl -X POST http://localhost:3000/api/hunts/$HUNT1_ID/join \
  -H "Authorization: Bearer $TOKEN2"

# Mark rock as found
curl -X POST http://localhost:3000/api/hunts/$HUNT1_ID/rocks/$ROCK1_ID/found \
  -H "Authorization: Bearer $TOKEN2"
```

### 5. Social Interactions
```bash
# Like a rock
curl -X POST http://localhost:3000/api/rocks/$ROCK1_ID/like \
  -H "Authorization: Bearer $TOKEN2"

# Add comment
curl -X POST http://localhost:3000/api/rocks/$ROCK1_ID/comment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN2" \
  -d '{"text":"Amazing find! Where exactly in the park?"}'
```

## Location Data

Common coordinates for testing:

- **San Francisco, CA**: [-122.4194, 37.7749]
- **New York, NY**: [-74.0060, 40.7128]
- **Los Angeles, CA**: [-118.2437, 34.0522]
- **Chicago, IL**: [-87.6298, 41.8781]
- **Denver, CO**: [-104.9903, 39.7392]
- **Boston, MA**: [-71.0589, 42.3601]
- **Seattle, WA**: [-122.3321, 47.6062]
- **Austin, TX**: [-97.7431, 30.2672]

---

Use this sample data to populate your development database and test all features of the Rock Spotter platform! 🪨
