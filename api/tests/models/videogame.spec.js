const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
// const supertest = require('supertest-as-promised')(require('../../src/app.js'))

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    //*name
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' })
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

    //*description
    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should work when its a valid description', () => {
        Videogame.create({ description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut!
        `})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

     //*image
    describe('image', () => {
      it('should throw an error if image is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid image')))
          .catch(() => done());
      });
      it('should work when its a valid image', () => {
        Videogame.create({ image: "https://t3.ftcdn.net/jpg/01/23/29/38/360_F_123293816_PvnD8vbMlABfywNSfZdpRRxfwPe71yVG.jpg"})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

    //*released:
    //todo VER ERROR QUE SALE EN CONSOLA
    describe('released', () => {
      it('should throw an error if date is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid date')))
          .catch(() => done());
      });
      it('should throw an error if date is not a date', (done) => {
        Videogame.create({released: 1 || [] || {} || 'hola'}) //must be a date
          .then(() => done(new Error('It requires a date type')))
          .catch(() => done());
      });
      it('should work when its a valid date', () => {
        Videogame.create({ released: "11/05/2022"})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

    //*rating
    describe('rating', () => {
      it('should throw an error if rating is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid rating')))
          .catch(() => done());
      });
      it('should throw an error if rating is not between 1 and 5', (done) => {
        Videogame.create({rating: this.rating<1 || this.rating>5})  //must be between 1 and 5
          .then(() => done(new Error('It must be between 1 and 5')))
          .catch(() => done());
      });
      it('should work when its a valid rating', () => {
        Videogame.create({ rating: this.rating>=1 && this.rating<=5})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

    //*platforms
    describe('platforms', () => {
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid platforms')))
          .catch(() => done());
      });
      it('should throw an error if platforms is not an array', (done) => {
        Videogame.create({platforms: 1 || {} || 'hola'}) //must be an array
          .then(() => done(new Error('It requires an array type')))
          .catch(() => done());
      });
      it('should work when its a valid platforms', () => {
        Videogame.create({ released: "PC"})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });

    //*genre
    describe('genre', () => {
      it('should throw an error if genre is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid genre')))
          .catch(() => done());
      });
      it('should throw an error if genre is not an array', (done) => {
        Videogame.create({genres: 1 || {} || 'hola'}) //must be a date
          .then(() => done(new Error('It requires an array type')))
          .catch(() => done());
      });
      it('should work when its a valid genre', () => {
        Videogame.create({ released: "Action"})
        .then(()=> done('Success'))
        .catch(()=> done())
      });
    });
  });
});
