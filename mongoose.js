const mongoose = require("mongoose");
const dbPath = 'mongodb://127.0.0.1:27017/comments-section'
require("dotenv").config(); 
const db = mongoose.connection


// Set up MongoDB
mongoose.connect(dbPath, {
    useNewUrlParser: true
  })

db.once('open', () => console.log('Connected to DB'))