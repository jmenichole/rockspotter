# Contributing to Rock Spotter

Thank you for your interest in contributing to Rock Spotter! This document provides guidelines and information for contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Rock-Spotter.git
   cd Rock-Spotter
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   cd backend
   npm test  # When tests are available
   node -c src/**/*.js  # Check syntax
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Development Guidelines

### Code Style

**JavaScript**
- Use ES6+ features
- Use async/await for asynchronous code
- Follow existing code patterns
- Keep functions small and focused
- Use descriptive variable names

**Example:**
```javascript
// Good
async function getUserRocks(userId, options = {}) {
  const { limit = 20, page = 1 } = options;
  const rocks = await Rock.find({ user: userId })
    .limit(limit)
    .skip((page - 1) * limit);
  return rocks;
}

// Avoid
async function gur(uid, o) {
  let r = await Rock.find({ user: uid }).limit(o.l || 20);
  return r;
}
```

### Project Structure

```
Rock-Spotter/
├── backend/              # API server
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Custom middleware
│   └── tests/            # Backend tests (future)
├── mobile-app/           # React Native app
├── docs/                 # Documentation
└── README.md
```

### Commit Messages

Use clear, descriptive commit messages:

- **Add**: New feature or file
  - `Add: Rock filtering by location`
- **Update**: Modify existing functionality
  - `Update: Improve authentication error messages`
- **Fix**: Bug fix
  - `Fix: Handle invalid coordinates in rock creation`
- **Refactor**: Code improvement without changing behavior
  - `Refactor: Simplify user controller logic`
- **Docs**: Documentation changes
  - `Docs: Add API examples for hunts`
- **Test**: Adding or updating tests
  - `Test: Add unit tests for Rock model`

### API Development

When adding new endpoints:

1. **Model** - Define or update database model
2. **Controller** - Implement business logic
3. **Route** - Create route handler
4. **Documentation** - Update API.md
5. **Test** - Add tests (when testing framework is set up)

Example:
```javascript
// 1. Model (if needed)
// src/models/Comment.js

// 2. Controller
// src/controllers/commentController.js
exports.createComment = async (req, res) => {
  try {
    // Implementation
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Route
// src/routes/commentRoutes.js
router.post('/', auth, commentController.createComment);

// 4. Document in docs/API.md
// 5. Add tests
```

### Database Models

When creating or modifying models:

- Use appropriate data types
- Add validation
- Include indexes for frequently queried fields
- Add helpful methods
- Document schema

Example:
```javascript
const schema = new mongoose.Schema({
  // Use descriptive field names
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  // Add indexes for search
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]
  }
}, { timestamps: true });

// Add indexes
schema.index({ location: '2dsphere' });

// Add helpful methods
schema.methods.isVisible = function() {
  return this.isPublic || this.user.equals(currentUser._id);
};
```

### Error Handling

Always handle errors gracefully:

```javascript
// In controllers
try {
  // Your code
  const result = await someAsyncOperation();
  res.json({ result });
} catch (error) {
  console.error('Operation failed:', error);
  res.status(500).json({ 
    error: 'A helpful error message for the user'
  });
}

// In routes
router.get('/:id', async (req, res) => {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user input
- Sanitize data before database operations
- Use parameterized queries (Mongoose handles this)
- Implement rate limiting for production
- Keep dependencies updated

### Documentation

Update documentation when:
- Adding new features
- Changing API endpoints
- Modifying setup process
- Adding configuration options

Documentation locations:
- `README.md` - Project overview
- `backend/README.md` - Backend specifics
- `docs/API.md` - API reference
- `docs/SETUP.md` - Setup instructions
- `docs/HUNTS.md` - Hunt system details

## Areas for Contribution

### High Priority
- [ ] Unit and integration tests
- [ ] File upload functionality for photos
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Search and filtering improvements
- [ ] Performance optimization

### Medium Priority
- [ ] Social features (following, feed)
- [ ] Advanced hunt features
- [ ] Leaderboards
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics

### Nice to Have
- [ ] AI rock identification
- [ ] Photo filters
- [ ] In-app messaging
- [ ] Geocaching integration
- [ ] QR code generation
- [ ] Internationalization (i18n)

## Testing

Testing framework will be added soon. When available:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- user.test.js

# Run with coverage
npm test -- --coverage
```

## Code Review Process

All pull requests will be reviewed for:
- Code quality and style
- Functionality and correctness
- Security considerations
- Performance implications
- Documentation completeness
- Test coverage (when available)

## Questions?

If you have questions:
- Check existing documentation
- Search existing issues
- Create a new issue for discussion
- Reach out to maintainers

## Code of Conduct

Be respectful and inclusive:
- Welcome newcomers
- Be patient with questions
- Provide constructive feedback
- Focus on the code, not the person
- Respect different perspectives

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Rock Spotter! Every contribution, no matter how small, helps make the platform better for everyone. 🪨❤️
