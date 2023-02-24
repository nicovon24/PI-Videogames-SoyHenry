//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { saveAllVideogames, getAllVideogames } = require("./src/controllers/videogames/saveVideogames.js")
const { saveAllGenres } = require('./src/controllers/others/genre.js');
const { saveAllPlatforms } = require('./src/controllers/others/platforms.js')
const { conn } = require('./src/db.js');
const { saveUsersData } = require('./src/controllers/others/users.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  // await saveAllGenres()
  // await saveAllPlatforms()
  // await saveUsersData()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});