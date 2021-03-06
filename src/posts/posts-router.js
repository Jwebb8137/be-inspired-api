const express = require('express')
const PostsService = require('./posts-service')
const postsRouter = express.Router()
const jsonParser = express.json()

postsRouter
  .route('/search')
  .get((req, res, next) => {
    const searchTerm = req.query.q
    const knexInstance = req.app.get('db')
      knexInstance
        .select('*')
        .from('posts')
        .where('post_description', 'ILIKE', `%${searchTerm}%`)
        .then(posts => {
          res.json(posts)
        }) 
      .catch(next)
  })

postsRouter
  .route('/')
  .get((req, res, next) => {
    const page = req.query.page
    const limit = 10
    const offset = limit * (page - 1)
    const knexInstance = req.app.get('db')
    PostsService.getAllPosts(knexInstance, limit, offset)
      .then(posts => {
        res.json(posts)
      })
      .catch(next)
  })
  .post(jsonParser, async (req, res, next) => {
    const { post_description, post_uploader_id, content_url } = req.body
    const newPost = { post_description, post_uploader_id, content_url }

    for (const [key, value] of Object.entries(newPost))
      if (value == null)
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
        })

    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .json(post)
      })
      .catch(next)
  })

postsRouter
  .route('/delete/:PostId')
  .delete((req, res, next) => {
    PostsService.deleteById(
      req.app.get('db'),
      req.params.PostId
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

postsRouter
  .route('/:UserId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getPostsByUserId(knexInstance, req.params.UserId)
      .then(post => {
        if (!post) {
          return res.status(404).json({
            error: { message: `Post doesn't exist` }
          })
        }
        res.json(post)
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { post_description, post_uploader_id, content_url } = req.body
    const postToUpdate = { post_description, post_uploader_id, content_url }

    const numberOfValues = Object.values(postToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'post description', 'post uploader id', 'content url'`
        }
      })

    PostsService.updatePost(
      req.app.get('db'),
      req.params.post_id,
      postToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = postsRouter