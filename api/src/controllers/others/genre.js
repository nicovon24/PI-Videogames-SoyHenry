require('dotenv').config();
const axios = require('axios')
const {Genre} = require('../../db.js')

const {
    KEY_NAME
  } = process.env;

const getAllGenres = async ()=>{
    try{
        let response = await axios(`https://api.rawg.io/api/genres?key=${KEY_NAME}`)
        let map = response.data.results.map(genre=>{
            return {name: genre.name}
        })
        return map
    }
    catch(err){
        throw new Error(err)
    }
}

const saveAllGenres = async ()=>{
    try{
        const allGenres = await getAllGenres()
        allGenres.forEach(g=>{
            Genre.findOrCreate({
                where: {name: g.name}
            })
        })
        return allGenres
    }
    catch(err){
        console.log(err);
        throw new Error(err)
    }
}


module.exports = {getAllGenres, saveAllGenres}