const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray } = require('./users.fixtures')

describe('Users Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('users').truncate())

  afterEach('cleanup', () => db('users').truncate())

  describe(`GET /api/users`, () => {

    context(`Given no users`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
        .get('/api/users')
        .expect(200, [])
      })
    })

    context('Given there are users in the database', () => {
      const testUsers = makeUsersArray()

      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })

      it('responds with 200 and all of the users', () => {
        return supertest(app)
          .get('/api/users')
          .expect(200, testUsers)
      })
    })
  })

  describe(`GET /api/users/:user_id`, () => {

    context(`Given no users`, () => {
      it(`responds with 404`, () => {
        const userId = 123456
        return supertest(app)
          .get(`/api/users/${userId}`)
          .expect(404, { error: { message: `User doesn't exist` } })
      })
    })

    context('Given there are users in the database', () => {
      const testUsers = makeUsersArray()

      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })

      it('responds with 200 and the specified user', () => {
        const userId = 2
        const expectedUser = testUsers[userId - 1]
        return supertest(app)
          .get(`/api/users/${userId}`)
          .expect(200, expectedUser)
      })
    })

    context(`Given an XSS attack article`, () => {
      const maliciousArticle = {
        id: 911,
        username: 'Naughty naughty very naughty <script>alert("xss");</script>',
        first_name: 'How-to',
        last_name: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
      }
    
      beforeEach('insert malicious article', () => {
        return db
          .into('users')
          .insert([ maliciousArticle ])
      })
    
      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/users/${maliciousArticle.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.username).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
            expect(res.body.last_name).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
          })
      })
    })
  })

  describe(`POST /users`, () => {
    it(`creates an user, responding with 201 and the new user`,  function() {
      const newUser = {
        username: 'TestJoe',
        first_name: 'Joe',
        last_name: 'Tester'
      }
      return supertest(app)
      .post('/api/users')
      .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body.username).to.eql(newUser.username)
          expect(res.body.first_name).to.eql(newUser.first_name)
          expect(res.body.last_name).to.eql(newUser.last_name)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
        })
        .then(postRes =>
          supertest(app)
            .get(`/api/users/${postRes.body.id}`)
            .expect(postRes.body)
        )
    })
    const requiredFields = ['username', 'first_name', 'last_name']

    requiredFields.forEach(field => {
      const newUser = {
        username: 'TestingWizard',
        first_name: 'Grandmaster',
        last_name: 'Tester'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newUser[field]

        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })
  })

  describe(`DELETE /api/users/:user_id`, () => {
    context(`Given no articles`, () => {
      it(`responds with 404`, () => {
        const userId = 123456
        return supertest(app)
          .delete(`/api/users/${userId}`)
          .expect(404, { error: { message: `User doesn't exist` } })
      })
    })
    context('Given there are users in the database', () => {
      const testUsers = makeUsersArray()
        beforeEach('insert users', () => {
          return db
            .into('users')
            .insert(testUsers)
      })
        it('responds with 204 and removes the user', () => {
        const idToRemove = 2
        const expectedUsers = testUsers.filter(user => user.id !== idToRemove)
        return supertest(app)
          .delete(`/api/users/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/users`)
              .expect(expectedUsers)
          )
      })
    })
  })
  describe(`PATCH /api/users/:user_id`, () => {
    context(`Given no users`, () => {
      it(`responds with 404`, () => {
        const userId = 123456
        return supertest(app)
          .patch(`/api/users/${userId}`)
          .expect(404, { error: { message: `User doesn't exist` } })
      })
    })
    context('Given there are users in the database', () => {
      const testUsers = makeUsersArray()
      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })

      it('responds with 204 and updates the user', () => {
        const idToUpdate = 2
        const updateUser = {
          username: 'updatedWizard',
          first_name: 'Updated',
          last_name: 'Wizard',
        }
        const expectedUser = {
          ...testUsers[idToUpdate - 1],
          ...updateUser
        }
        return supertest(app)
          .patch(`/api/users/${idToUpdate}`)
          .send(updateUser)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/users/${idToUpdate}`)
              .expect(expectedUser)
          )
      })
      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2
        return supertest(app)
          .patch(`/api/users/${idToUpdate}`)
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must contain either 'username', 'first name' or 'last name'`
            }
          })
      })
      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2
        const updateUser = {
          username: 'updatedWizard',
        }
        const expectedUser = {
          ...testUsers[idToUpdate - 1],
          ...updateUser
        }
      
        return supertest(app)
          .patch(`/api/users/${idToUpdate}`)
          .send({
            ...updateUser,
            fieldToIgnore: 'should not be in GET response'
          })
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/users/${idToUpdate}`)
              .expect(expectedUser)
          )
      })
    })
  })
})