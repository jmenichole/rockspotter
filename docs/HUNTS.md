# Rock Hunts - iSpy Style

Rock Hunts are scavenger hunt style challenges where participants find specific rocks based on clues and hints. This document explains how the hunt system works.

## Concept

Inspired by "Where's Waldo" and "iSpy" games, Rock Hunts allow users to:
- Create custom scavenger hunts with rock photos
- Hide rocks in real-world locations
- Provide clues to help participants find them
- Track progress and completions
- Earn achievements and compete with friends

## How It Works

### For Hunt Creators

1. **Select Rocks**: Choose rocks you've already posted to include in the hunt
2. **Add Hints**: Provide helpful clues for each rock (e.g., "Near the old oak tree")
3. **Set Order**: Determine the sequence rocks should be found in (optional)
4. **Configure Hunt**:
   - Title and description
   - Difficulty level (easy, medium, hard)
   - Start and end dates
   - Maximum participants (optional)
5. **Activate**: Make the hunt available to the community

### For Participants

1. **Browse Hunts**: View available hunts filtered by:
   - Active status
   - Difficulty level
   - Location
   - Creator
2. **Join Hunt**: Register to participate
3. **View Clues**: See hints for each rock
4. **Find Rocks**: Use hints and location data to locate rocks
5. **Mark as Found**: Verify you found the rock (future: photo verification)
6. **Track Progress**: Monitor how many rocks you've found
7. **Complete Hunt**: Find all rocks to earn achievements

## Hunt Types

### Public Hunts
- Open to all users
- No participant limit (or high limit)
- Great for community events

### Limited Hunts
- Maximum participant cap
- First-come, first-served
- Creates urgency and competition

### Time-Limited Hunts
- Active only during specific dates/times
- Perfect for events or seasonal challenges
- Adds time pressure for completion

### Difficulty Levels

**Easy**
- 3-5 rocks
- Clear, specific hints
- Rocks in popular, accessible locations
- Ideal for beginners or families

**Medium**
- 5-10 rocks
- Moderate hints requiring some exploration
- Mix of obvious and hidden locations
- Standard difficulty for most users

**Hard**
- 10+ rocks
- Vague or cryptic hints
- Challenging locations
- For experienced rock hunters

## Hunt Features

### Progress Tracking
Each participant's progress includes:
- Number of rocks found
- Total rocks in hunt
- Completion status
- Start time
- Completion time (if finished)

### Hints System
Each rock in a hunt can have:
- Written hint/clue
- Order/sequence number
- Reference to the actual rock post (with photo and location)

### Participation
- Users can join multiple hunts simultaneously
- Track progress across all active hunts
- View history of completed hunts

## Creating Effective Hunts

### Best Practices

1. **Rock Selection**
   - Choose visually distinctive rocks
   - Ensure rocks are still in location
   - Mix difficulty levels within a hunt
   - Use high-quality photos

2. **Hint Writing**
   - Be descriptive but not too specific
   - Use landmarks or features
   - Consider accessibility
   - Test hints with friends first

3. **Location Planning**
   - Keep hunts in a reasonable geographic area
   - Consider safe, accessible locations
   - Respect private property
   - Follow Leave No Trace principles

4. **Timing**
   - Allow sufficient time for completion
   - Consider weather and seasons
   - Account for participant availability
   - Weekend hunts tend to be more popular

### Example Hunt: "Downtown Discovery"

**Title**: Downtown Discovery Rock Hunt  
**Difficulty**: Medium  
**Duration**: 1 week  
**Rocks**: 7

**Rocks and Hints**:
1. "Granite Guardian" - *"Standing watch where water flows downtown"* (Near city fountain)
2. "Library Stone" - *"Between pages of knowledge and wisdom"* (Outside library)
3. "Park Pebble" - *"Where children play and dogs roam free"* (Dog park)
4. "Bridge Boulder" - *"Underneath where two sides meet"* (Under bridge)
5. "Garden Gem" - *"Among the flowers in the public garden"* (Botanical garden)
6. "Historic Rock" - *"Where the city began its story"* (Historic monument)
7. "Hidden Treasure" - *"Behind the art, not on the walls"* (Behind art museum)

## Hunt Rewards

### Completion Achievements
- "Hunt Beginner" - Complete your first hunt
- "Hunt Master" - Complete 10 hunts
- "Speed Hunter" - Complete a hunt in under 2 hours
- "Perfect Finder" - Complete a hard hunt with no hints revealed

### Creator Achievements
- "Hunt Creator" - Create your first hunt
- "Popular Hunt" - Have 50+ participants
- "Challenge Master" - Create 5 hard difficulty hunts

### Special Badges
- "Weekend Warrior" - Complete 3 hunts in one weekend
- "Completionist" - Find all rocks in all active hunts
- "Early Bird" - Join a hunt within the first hour

## Future Enhancements

### Photo Verification
- Participants take photos when finding rocks
- AI/manual verification of findings
- Prevent cheating and ensure fairness

### Leaderboards
- Fastest completion times
- Most hunts completed
- Most rocks found
- Creator rankings

### Social Features
- Form teams for hunts
- Challenge friends
- Share progress on social media
- Hunt chat/comments

### Advanced Features
- Multi-location hunts (across cities)
- QR code verification at rock locations
- AR (Augmented Reality) hints
- Seasonal/themed hunts
- Corporate/educational hunts
- Geocaching integration

## Safety Guidelines

### For Creators
- Only place/reference rocks in public, safe locations
- Avoid private property without permission
- Don't create hazards or environmental damage
- Provide accessibility information

### For Participants
- Follow local laws and regulations
- Respect private property
- Don't trespass
- Hunt during daylight hours
- Tell someone where you're going
- Bring a friend or family member
- Stay on marked trails
- Watch for wildlife and hazards

## Environmental Considerations

Rock hunting should be:
- **Leave No Trace**: Don't disturb natural habitats
- **Preserve Nature**: Don't move or remove rocks from ecosystems
- **Educational**: Use hunts to teach about geology and conservation
- **Sustainable**: Only photograph, don't collect protected specimens

## Examples of Great Hunts

### "Geology 101"
Educational hunt featuring different rock types with information about their formation and characteristics.

### "City History Trail"
Hunt combining geology with local history, featuring rocks at historic sites.

### "Family Fun Hunt"
Easy, kid-friendly hunt in parks and public spaces.

### "Extreme Rock Challenge"
Advanced hunt for serious rock enthusiasts covering a large area with cryptic clues.

### "Seasonal Special"
Limited-time hunt celebrating a season or holiday with themed rocks.

## Technical Details

### Database Structure
```javascript
{
  title: String,
  description: String,
  creator: ObjectId (User),
  rocks: [{
    rock: ObjectId (Rock),
    hint: String,
    order: Number
  }],
  difficulty: String (easy/medium/hard),
  participants: [{
    user: ObjectId,
    rocksFound: [ObjectId],
    completed: Boolean,
    completedAt: Date,
    startedAt: Date
  }],
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  maxParticipants: Number
}
```

### API Endpoints
See API.md for complete endpoint documentation.

Key endpoints:
- `GET /api/hunts` - List hunts
- `POST /api/hunts` - Create hunt
- `POST /api/hunts/:id/join` - Join hunt
- `POST /api/hunts/:huntId/rocks/:rockId/found` - Mark found
- `GET /api/hunts/my/progress` - View progress

---

**Remember**: The goal is to have fun, explore the outdoors, learn about geology, and connect with fellow rock enthusiasts! Happy hunting! 🪨🔍
