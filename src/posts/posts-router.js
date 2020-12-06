const express = require('express')
const PostsService = require('./posts-service')

const postsRouter = express.Router()
const jsonParser = express.json()

postsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getAllPosts(knexInstance)
      .then(posts => {
        res.json(posts)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { post_id, post_description, post_uploader_id, content_url, date_created } = req.body
    const newPost = { post_id, post_description, post_uploader_id, content_url, date_created }

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
          .location(`/posts/${post.id}`)
          .json(post)
      })
      .catch(next)
  })

postsRouter
  .route('/:post_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PostsService.getById(knexInstance, req.params.post_id)
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

module.exports = postsRouter