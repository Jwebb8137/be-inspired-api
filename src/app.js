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
app.use(express.json({ limit: '50mb' })); //req.body
app.use(express.urlencoded({ extended: false }));

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

//JWT VERIFICATION

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


// knexInstance('users').select('*')
//     .then(result => {
//         console.log(result)
//     })

// knexInstance.from('posts').select('*')
//     .then(result => {
//         console.log(result)
//     })

// knexInstance.from('post_likes').select('*')
//     .then(result => {
//         console.log(result)
//     })

// knexInstance
//     .select('id', 'username')
//     .from('users')
//     .where({ username: 'user1' })
//     .then(result => {
//       console.log(result)
//     })


// search query example

// SELECT product_id, name, price, category
// FROM amazong_products
// WHERE name ILIKE '%cheese%';

// const searchTerm = 'holo'

// knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(result => {
//     console.log(result)
//   })

// function searchByProduceName(searchTerm) {
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .where('name', 'ILIKE', `%${searchTerm}%`)
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   searchByProduceName('holo')


// Paginate example

// function paginateProducts(page) {
//     const productsPerPage = 10
//     const offset = productsPerPage * (page - 1)
//     knexInstance
//       .select('product_id', 'name', 'price', 'category')
//       .from('amazong_products')
//       .limit(productsPerPage)
//       .offset(offset)
//       .then(result => {
//         console.log(result)
//       })
//   }
  

// get products with images filter example

// function getProductsWithImages() {
//     knexInstance
//       .select('product_id', 'name', 'price', 'category', 'image')
//       .from('amazong_products')
//       .whereNotNull('image')
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   getProductsWithImages()

// function mostPopularVideosForDays(days) {
//     knexInstance
//       .select('video_name', 'region')
//       .count('date_viewed AS views')
//       .where(
//         'date_viewed',
//         '>',
//         knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//       )
//       .from('whopipe_video_views')
//       .groupBy('video_name', 'region')
//       .orderBy([
//         { column: 'region', order: 'ASC' },
//         { column: 'views', order: 'DESC' },
//       ])
//       .then(result => {
//         console.log(result)
//       })
//   }
  
//   mostPopularVideosForDays(30)

// app.use(function validateBearerToken(req, res, next) {
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')

//     if (!authToken || authToken.split(' ')[1] !== apiToken) {
//         return res.status(401).json({ error: 'Unauthorized request' })
//     }
//     // move to the next middleware
//     next()
// })

// app.use('/api/users', userRouter)



module.exports = app