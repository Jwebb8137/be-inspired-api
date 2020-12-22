require('dotenv').config()
const { PORT, DATABASE_URL } = require('../config')
const express = require('express')
const app = express()
const authorization = require('./middleware/authorization')
const usersRouter = require('./users/users-router')
const postsRouter = require('./posts/posts-router')
const commentsRouter = require('./comments/comments-router')
const likesRouter = require('./likes/likes-router')
const {cloudinary} = require('./utils/cloudinary')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.use(express.json())
app.use(helmet())
app.use(cors())
app.options('*', cors());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

app.get('/api/is-verified', authorization, async (req, res) => {
  try {
    res.json(true); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/likes', likesRouter)
app.use("/api/login", require("./users/login"));
app.use("/api/active-user", require("./users/activeUser"));

module.exports = app