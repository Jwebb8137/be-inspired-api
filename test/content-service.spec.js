const ContentService = require('../src/content-service')
const knex = require('knex')
const { expect } = require('chai')

describe(`Content service object`, function() {
  let db
  let testUsers = [
    {
      id: 1,
      username: 'bobTheTester',
      first_name: 'Bob',
      last_name: 'Barker'
    },
    {
      id: 2,
      username: 'johnTheTester',
      first_name: 'John',
      last_name: 'Carter'
    },
    {
      id: 3,
      username: 'gandalfTheTester',
      first_name: 'Gandalf',
      last_name: 'TheWizard'
    },
  ]
  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })
  
  before(() => db('users').truncate())
  
  afterEach(() => db('users').truncate())
  
  after(() => db.destroy())
  
  context(`Given 'users' has data`, () => {
    beforeEach(() => {
      return db
        .into('users')
        .insert(testUsers)
      })
      
      it(`getsAllUsers() resolves all users from 'users' table`, () => {
        return ContentService.getAllUsers(db)
        .then(actual => {
          expect(actual).to.eql(testUsers)
        })
      })

      it(`getUserById() resolves an user by id from 'users' table`, () => {
        const thirdId = 3
        const thirdTestUser = testUsers[thirdId - 1]
        return ContentService.getUserById(db, thirdId)
          .then(actual => {
            expect(actual).to.eql({
              id: thirdId,
              username: thirdTestUser.username,
              first_name: thirdTestUser.first_name,
              last_name: thirdTestUser.last_name,
            })
          })
      })

      it(`deleteUser() removes a user by id from 'users' table`, () => {
        const userId = 3
        return ContentService.deleteUserById(db, userId)
          .then(() => ContentService.getAllUsers(db))
          .then(allUsers => {
            // copy the test users array without the "deleted" user
            const expected = testUsers.filter(user => user.id !== userId)
            expect(allUsers).to.eql(expected)
          })
      })

      it(`updateUser() updates a user from the 'users' table`, () => {
        const idOfUserToUpdate = 3
        const newUserData = {
          username: 'NewGandyWizard',
          first_name: 'Improved',
          last_name: 'Gandy',
        }
        return ContentService.updateUser(db, idOfUserToUpdate, newUserData)
          .then(() => ContentService.getUserById(db, idOfUserToUpdate))
          .then(user => {
            expect(user).to.eql({
              id: idOfUserToUpdate,
              ...newUserData,
            })
          })
      })

    })
    
    context(`Given 'users' has no data`, () => {
      
    it(`getAllUsers() resolves an empty array`, () => {
      return ContentService.getAllUsers(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })


    it(`insertArticle() inserts an article and resolves the article with an 'id'`, () => {
      const newUser = {
        username: 'theTestingWiz',
        first_name: 'Testing',
        last_name: 'Wizard',
      }
      return ContentService.insertUser(db, newUser)
      .then(actual => {
        expect(actual).to.eql({
          id: 1,
          username: newUser.username,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        })
      })
    })
  })
})