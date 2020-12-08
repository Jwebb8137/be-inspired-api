const path = require('path')
const express = require('express')
const xss = require('xss')
const LikesService = require('./likes-service')

const likesRouter = express.Router()
const jsonParser = express.json()

const serializeLike = like => ({
  post_id: like.post_id,
  post_user_like_id: like.post_user_like_id
})

likesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LikesService.getAllLikes(knexInstance)
      .then(likes => {
        res.json(likes.map(serializeLike))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { post_id, post_user_like_id } = req.body
    const newLike = { post_id, post_user_like_id }

    for (const [key, value] of Object.entries(newLike))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    LikesService.insertLike(
      req.app.get('db'),
      newLike
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${like.id}`))
          .json(serializeLike(like))
      })
      .catch(next)
  })

likesRouter
  .route('/:like_id')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    LikesService.getLikesByPostId(knexInstance, req.params.like_id)
      .then(likes => {
        res.json(likes.map(serializeLike))
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    LikesService.deleteLike(
      req.app.get('db'),
      req.params.like_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = likesRouter