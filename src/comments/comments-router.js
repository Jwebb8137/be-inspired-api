const path = require('path')
const express = require('express')
const xss = require('xss')
const CommentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

const serializeComment = comment => ({
  id: comment.id,
  comment: xss(comment.comment),
  date_commented: comment.date_commented,
  post_id: comment.post_id,
  user_id: comment.user_id
})

commentsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CommentsService.getAllComments(knexInstance, id)
      .then(comments => {
        res.json(comments.map(serializeComment))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { post_id, comment, user_id, user_img_url, username } = req.body
    const newComment = { post_id, comment, user_id, user_img_url, username }

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .json(serializeComment(comment))
      })
      .catch(next)
  })

commentsRouter
  .route('/:post_id')
  .post(jsonParser, (req, res, next) => {
    const { post_id, comment, user_id, user_img_url, username } = req.body
    const newComment = { post_id, comment, user_id, user_img_url, username }

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .json(serializeComment(comment))
      })
      .catch(next)
  })
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CommentsService.getAllComments(knexInstance, req.params.post_id)
      .then(comments => {
        res.json(comments.map(serializeComment))
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    CommentsService.deleteComment(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { text, date_commented } = req.body
    const commentToUpdate = { text, date_commented }

    const numberOfValues = Object.values(commentToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'text' or 'date_commented'`
        }
      })

    CommentsService.updateComment(
      req.app.get('db'),
      req.params.comment_id,
      commentToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = commentsRouter