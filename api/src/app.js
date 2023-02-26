const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const printHomeMessage = require("./controllers/others/home.js")
const routesVideogames = require('./routes/videogames.js');
const routesGenres = require('./routes/genre.js');
const routerPlatforms = require('./routes/platforms.js');
const routerFavorites = require('./routes/favorites.js');
const routerUsers = require('./routes/users.js');

const server = express();

server.name = 'API';
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

server.use(express.json())
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pi-videogames-soyhenry-production-b313.up.railway.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//*home
server.get("/", (req,res)=>{
  try{
    const messageHome = printHomeMessage()
    res.status(200).json(messageHome)
  }
  catch(err){
    res.status(400).json({error: err.message})
  }
})

//*other routes
server.use('/videogames', routesVideogames);
server.use('/genres', routesGenres);
server.use('/platforms', routerPlatforms)
server.use('/favorites', routerFavorites)
server.use('/users', routerUsers)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
