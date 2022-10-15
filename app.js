const express = require('express');
require('./mongoose')
const userRouter = require('./routes/user')
const commentsRouter = require('./routes/comments')
const pageRouter = require('./routes/page')

const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(userRouter)
app.use(commentsRouter)
app.use(pageRouter)

module.exports = app