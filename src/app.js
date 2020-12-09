require('dotenv').config()
const { PORT, DATABASE_URL } = require('../config')
const express = require('express')
const app = express()
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
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/likes', likesRouter)

app.post('/api/media', async (req, res) => {
    try {
      const { previewSource } = req.body;
      res.send(previewSource)
      // const uploadedResponse = await cloudinary.uploader.upload(previewSource, {
      //   upload_preset: 'inspired'
      // })
      // const photo_url = uploadedResponse.secure_url;
      // console.log(uploadedResponse)
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
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