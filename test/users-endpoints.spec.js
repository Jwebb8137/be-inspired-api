const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE2MDQ0NDIxNjIsImV4cCI6MTYwNDQ0NTc2Mn0.UU-ZbtzDAql7BkR2RYl3RYDf3zDkuFUFJllotbrJUmM";

it('retrieves list of users, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .get('/api/users')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                              
  });
});


it('retrieves target user, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .get('/api/users/1')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                              
  });
});

it('creates a user if it does not exist, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .post('/api/users')
  .set({
    "Content-type": "application/json",
    "body":"JSON.stringify(body)",
  })
  .send({ 
    "username": "Tester1",
    "user_password": "Testing123", 
    "first_name": "Testing", 
    "last_name": "Testall",
    "profile_img_url": "example.com/example.jpg"
  })
  .then((res) => {
    expect(res).to.have.status(200);
    done();
  })
  .catch(function (err) {
    throw err;
  });
});