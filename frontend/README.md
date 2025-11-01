# 🌐 Rock Spotter Frontend

A modern React-based web frontend for Rock Spotter, built with Vite and Tailwind CSS.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the app at http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker

### Build and Run with Docker

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Access the app at http://localhost:3001
```

### Full Stack with Docker Compose

From the root directory:

```bash
# Start all services (frontend, backend, database)
docker-compose up -d

# Frontend: http://localhost:3001
# Backend API: http://localhost:3000
# MongoDB: localhost:27017
```

## 🎨 Features

### 🏠 Home Page
- Welcome message and feature overview
- Getting started guide
- Community statistics

### 🔐 Authentication
- User registration and login
- Protected routes
- JWT token management

### 📸 Rock Gallery
- Browse rock photos from the community
- Search and filter by rock type
- Like and comment on rocks
- Responsive grid layout

### ➕ Create Rock
- Upload rock photos and descriptions
- Add location and tags
- Choose rock type and visibility

### 🗺️ Rock Hunts
- Browse available hunts
- Join active hunts
- Track progress and achievements

### 👤 User Profile
- View user statistics
- Achievement gallery
- Account management

## 🛠️ Tech Stack

- **React 19** - Latest React version
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
