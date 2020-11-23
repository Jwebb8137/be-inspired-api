const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/testing')
      .expect(200, 'Hello')
  })
})