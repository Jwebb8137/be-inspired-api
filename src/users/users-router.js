const path = require('path')
const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,
  first_name: xss(user.first_name),
  last_name: xss(user.last_name),
  username: xss(user.username),
  user_password: xss(user.user_password),
  profile_img_url: user.profile_img_url
})

usersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    UsersService.getAllUsers(knexInstance)
      .then(users => {
        res.json(users.map(serializeUser))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { username, first_name, last_name, user_password, profile_img_url } = req.body
    const newUser = { username, first_name, last_name, user_password, profile_img_url }

    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    UsersService.insertUser(
      req.app.get('db'),
      newUser
    )
      .then(user => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${user.id}`))
          .json(serializeUser(user))
      })
      .catch(next)
  })

usersRouter
  .route('/:user_id')
  .all((req, res, next) => {
    UsersService.getById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({
            error: { message: `User doesn't exist` }
          })
        }
        res.user = user
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeUser(res.user))
  })
  .delete((req, res, next) => {
    UsersService.deleteById(
      req.app.get('db'),
      req.params.user_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { fullname, username, nickname } = req.body
    const userToUpdate = { fullname, username, nickname }

    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'fullname', 'username', 'password' or 'nickname'`
        }
      })

    UsersService.updateUser(
      req.app.get('db'),
      req.params.user_id,
      userToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = usersRouter







// const express = require('express')
// const xss = require('xss')
// const ContentService = require('../content-service')

// const usersRouter = express.Router()
// const jsonParser = express.json()

// usersRouter
//   .route('/')
//   .get((req, res, next) => {
//     ContentService.getAllUsers(
//       req.app.get('db')
//     )
//       .then(users => {
//         res.json(users)
//       })
//       .catch(next)
//   })
//   .post(jsonParser, (req, res, next) => {
//     const { username, first_name, last_name } = req.body
//     const newUser = { username, first_name, last_name }
//     for (const [key, value] of Object.entries(newUser)) {
//       if (value == null) {
//         return res.status(400).json({
//           error: { message: `Missing '${key}' in request body` }
//         })
//       }
//     }
//     ContentService.insertUser(
//       req.app.get('db'),
//       newUser
//     )
//       .then(user => {
//         res
//           .status(201)
//           .location(`/api/users/${user.id}`)
//           .json(user)
//       })
//       .catch(next)
//   })

// usersRouter
//   .route('/:user_id')
//     .all((req, res, next) => {
//       ContentService.getUserById(
//         req.app.get('db'),
//         req.params.user_id
//       )
//       .then(user => {
//         if (!user) {
//           return res.status(404).json({
//             error: { message: `User doesn't exist` }
//           })
//         }
//         res.user = user // save the article for the next middleware
//         next() // don't forget to call next so the next middleware happens!
//     })
//     .catch(next)
//   })
//   .get((req, res, next) => {
//     res.json({
//       id: res.user.id,
//       username: xss(res.user.username),
//       first_name: xss(res.user.first_name), // sanitize title
//       last_name: xss(res.user.last_name), // sanitize content
//     })
//   })
//   .delete((req, res, next) => {
//     ContentService.deleteUserById(
//       req.app.get('db'),
//       req.params.user_id
//     )
//     .then(() => {
//       res.status(204).end()
//     })
//     .catch(next)  
//   })
//   .patch(jsonParser, (req, res, next) => {
//     const { username, first_name, last_name } = req.body
//     const userToUpdate = { username, first_name, last_name }

//     const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
//     if (numberOfValues === 0) {
//         return res.status(400).json({
//         error: {
//             message: `Request body must contain either 'username', 'first name' or 'last name'`
//         }
//         })
//     }
 
//     ContentService.updateUser(
//       req.app.get('db'),
//       req.params.user_id,
//       userToUpdate
//     )
//       .then(numRowsAffected => {
//         res.status(204).end()
//       })
//       .catch(next)
//   })

// module.exports = usersRouter;