const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE2MDQ0NDIxNjIsImV4cCI6MTYwNDQ0NTc2Mn0.UU-ZbtzDAql7BkR2RYl3RYDf3zDkuFUFJllotbrJUmM";

it('retrieves list of posts, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .get('/api/posts')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                              
  });
});


it('retrieves target post & data, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .get('/api/posts/21')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                              
  });
});

it('submits a post, as expected', function(done) { 
  chai.request('https://be-inspired-api.herokuapp.com')
  .post('/api/posts')
  .set({
    "Content-type": "application/json",
    "body":"JSON.stringify(body)",
  })
  .send({ 
    "id": "14",
    "post_uploader_id": "1", 
    "post_description": "Life has no limitations, except the ones you make.", 
    "content_url": "" 
  })
  .then((res) => {
    expect(res).to.have.status(201);
    done();
  })
  .catch(function (err) {
    throw err;
  });
});