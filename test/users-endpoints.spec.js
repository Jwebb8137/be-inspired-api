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
  })
  describe.only(`POST /articles`, () => {
    it(`creates an article, responding with 201 and the new article`,  function() {
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
  })
})