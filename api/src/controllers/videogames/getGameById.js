const axios = require("axios");
require("dotenv").config();
const {KEY_NAME} = process.env

const getGameById = async (idApi, idDB)=>{
    const dataVideogame = await axios(`https://api.rawg.io/api/games/${idApi}?key=${KEY_NAME}`)
    console.log(dataVideogame.data);

    const {data} = dataVideogame
    const {name, description_raw, released, background_image, rating, genres, platforms} = data
    // console.log({name, description_raw, released, background_image, rating, genres, platforms});

    let arrPlatforms = []
    platforms.forEach(platf=>{ //getting only platforms name
        arrPlatforms.push(platf.platform.name)
    })

    let arrGenres = []
    genres.forEach(genre=>{ //getting only platforms name
        arrGenres.push(genre.name)
    })


    return {id: Number(idDB), idAPI: idApi, name, description: description_raw,  
    platforms: arrPlatforms, image: background_image, genres: arrGenres, released, rating}
}

module.exports = getGameById