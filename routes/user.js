const express = require('express')
const router = express.Router();
const User = require('../models/user')

// Retrieves comments
router.get('/',  (req, res) => {
     User.find().then((result) => {
      res.send(result)
     }).catch((err) => {
      console.log(err)
     })
})

module.exports = router