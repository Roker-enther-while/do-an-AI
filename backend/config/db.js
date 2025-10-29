// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

// Import models for checking
const User = require('../models/User');
const Course = require('../models/Course');
const Schedule = require('../models/Schedule');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const Teacher = require('../models/Teacher');

const connectDB = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully! ✨');

    // 2. Check necessary collections
    console.log('Checking collections...');
    const collectionsToCheck = [
      { name: 'users', model: User },
      { name: 'courses', model: Course },
      { name: 'schedules', model: Schedule },
      { name: 'notifications', model: Notification },
      { name: 'messages', model: Message },
      { name: 'teachers', model: Teacher },
    ];

    let allCollectionsOk = true;
    for (const collectionInfo of collectionsToCheck) {
      try {
        // Attempt a simple query (count documents)
        await collectionInfo.model.countDocuments();
        console.log(`✅ Collection '${collectionInfo.name}' accessible.`);
      } catch (checkError) {
        console.error(`❌ Error accessing collection '${collectionInfo.name}':`, checkError.message);
        allCollectionsOk = false;
      }
    }

    if (!allCollectionsOk) {
      console.error('⛔ One or more required collections could not be accessed. Please check database configuration and permissions.');
      // Optionally exit if critical collections are missing
      // process.exit(1);
    } else {
      console.log('👍 All required collections checked.');
    }

  } catch (connectError) {
    console.error('MongoDB Connection Error:', connectError.message);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectDB;