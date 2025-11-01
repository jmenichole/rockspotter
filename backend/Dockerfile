<<<<<<< HEAD
# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
=======
# Use official Node.js runtime as the base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create uploads directory for file uploads
RUN mkdir -p uploads

# Expose the port the app runs on
EXPOSE 3000

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S rockspotter -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R rockspotter:nodejs /app
USER rockspotter

# Define the command to run the application
>>>>>>> origin/main
CMD ["npm", "start"]
