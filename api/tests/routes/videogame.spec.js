/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);
const supertest = require('supertest-as-promised')(require('../../src/app.js'))
const { Videogame, conn } = require('../../src/db.js');

const videogame = {
  name: 'Super Mario Bros',
  description: "lorem ipsum",
  image: "https://media.gettyimages.com/id/533801804/es/foto/silver-back-gorilla.jpg?s=612x612&w=gi&k=20&c=fdyxlSisLTJx_z1kU1y6W0UFHKTp8kjTmSaSLACnY3I=",
  rating: 4.5,
  genres: ['Action'],
  platforms: ['PC'],
  released: '2022-05-11'
};

const videogameError = { //**uncompleted data, we use it to expect errors in the app
  name: 'Super Mario Bros'
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  describe('GET /videogames', () => {
    it('/videogames should get 200 and return a json', () =>{
      return supertest
        .get('/videogames')
        .expect(200)
        .expect('Content-Type', /json/)
    });
    it('/:id should return a status 200 and a json', () =>{
      return supertest
        .get('/videogames/3498')
        .expect(200)
        .expect('Content-Type', /json/)
    });
    it('/:id should return a status 400 if the movie does not exist', () =>{
      return supertest
        .get('/videogames/100000000000')
        .expect(400)
        .expect('Content-Type', /json/)
    });
});

describe('POST /videogames', () => {
  it('/ returns status 400 if data is uncompleted', function () {
    return supertest
      .post('/videogames')
      .send(videogameError)
      .expect(400)
  })
});

})



