/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

// MongoDB initialization script for Rock Spotter
// This script creates the database and sets up initial collections

// Switch to rock-spotter database
db = db.getSiblingDB('rock-spotter');

// Create collections
db.createCollection('users');
db.createCollection('rocks');
db.createCollection('hunts');
db.createCollection('achievements');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

db.rocks.createIndex({ "location": "2dsphere" });
db.rocks.createIndex({ "rockType": 1 });
db.rocks.createIndex({ "tags": 1 });
db.rocks.createIndex({ "createdAt": -1 });

db.hunts.createIndex({ "startDate": 1, "endDate": 1 });
db.hunts.createIndex({ "difficulty": 1 });

db.achievements.createIndex({ "type": 1 });
db.achievements.createIndex({ "rarity": 1 });

print('Rock Spotter database initialized successfully!');