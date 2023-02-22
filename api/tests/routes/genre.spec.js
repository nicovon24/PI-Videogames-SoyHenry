/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);
const supertest = require('supertest-as-promised')(require('../../src/app.js'))
const { Genre } = require('../../src/db.js');

describe('GET /genres', () => {
    it('/genres should get 200 and return a json', () =>{
      return supertest
        .get('/genres')
        .expect(200)
        .expect('Content-Type', /json/)
    });
    it('/:id should return a status 200 and a json', () =>{
        return supertest
          .get('/genres/e485a19e-ef56-4a1a-a5c4-d7aa6386452e')
          .expect(200)
          .expect('Content-Type', /json/)
      });
    it('/:id should return a status 400 if the genre does not exist', () =>{
        return supertest
            .get('/genres/938')
            .expect(400)
            .expect('Content-Type', /json/)
    });
});