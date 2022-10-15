const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    image: {
      png: {
        type: String,
        required: true,
      },
      webp: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: true,
    }
}, {collection: 'user'})

const User =  mongoose.model("User", userSchema);
module.exports = User;
