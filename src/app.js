require('dotenv').config()
const express = require('express')
const app = express()
const jsonParser = express.json()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const knex = require('knex')
const ContentService = require('./content-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

app.get('/api/users', (req,res,next) => {
    const knexInstance = req.app.get('db')
    ContentService.getAllUsers(knexInstance)
      .then(users => {
        res.json(users)
      })
      .catch(next)
})

app.get('/api/users/:user_id', (req, res, next) => {
  const knexInstance = req.app.get('db')
  ContentService.getUserById(knexInstance, req.params.user_id)
  .then(user => {
    if (!user) {
      return res.status(404).json({
        error: { message: `User doesn't exist` }
      })
    }
    res.json(user)
  })
  .catch(next)
})

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

const userRouter = require('./user/userRouter')

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(express.json())
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

const videos = [
    "Sport Video: A Sport video",
    "Humor Video: A Humourous Video"
]

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

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

function getUserVideos(req, res) {
    res.json('Videos')
}

app.get('/api/search-videos', function getFilteredVideos(req,res) {
    let response = videos
        if (req.query.title) {
            response = response.filter(video =>
                video.title.toLowerCase().includes(req.query.title.toLowerCase())
            )
        }
        res.json(response)
    }
)

app.get('/testing', (req,res) => {
    res.send('Hello')
})

app.post('/api/users', jsonParser, (req, res, next) => {
    const { username, first_name, last_name } = req.body
    const newUser = { username, first_name, last_name }
    ContentService.insertUser(
      req.app.get('db'),
      newUser
    )
      .then(user => {
        res
          .status(201)
          .location(`/api/users/${user.id}`)
          .json(user)
      })
      .catch(next)
})

app.delete('/api/users/userId', (req, res) => {
    const { userid } = req.params
    // some code
    res
      .status(204)
      .end();
})

app.get('/api/user-videos', getUserVideos)

app.use((error, req, res ,next) => {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error' }}
    } else {
        response = { error }
    }
    res.status(500).json(response)
})

module.exports = app