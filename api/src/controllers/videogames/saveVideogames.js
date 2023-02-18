const axios = require("axios");
const {Videogame} = require("../../db.js");
const {KEY_NAME} = process.env;
const getRevelantDataFromAPI = require('../../functions/getRevelantData.js');
const Genre = require("../../models/Genre.js");

const getApiVideogames = async ()=>{ //getApiInfo
    try{
        let arrVideogames = []
        for(let i = 1; i <= 5; i++){ //trayendo primeros 100 personajes
            let response = await axios(`https://api.rawg.io/api/games?key=${KEY_NAME}&page=${i}`)
            let map = getRevelantDataFromAPI(response.data.results)
            arrVideogames = [...arrVideogames, ...map]
        }
        return arrVideogames;
        
    }
    catch(err){
        throw new Error(err)
    }
}

const getDbVideogames = async ()=>{ //getApiInfo
    try{
        return await Videogame.findAll()
        // return await Videogame.findAll([{
            //   model :Genre,
            //   attributes: ['name'],
            //   through : {
            //     attributes : [],
            //   }
            // },{ // ----
            //   model :Platform,
            //   attributes: ['name'],
            //   through : {
            //     attributes : [],
            //   }
            // }]
    }
    catch(err){
        throw new Error(err)
    }
}

const getAllVideogames = async ()=>{
    try {
        // const allVideogames = await getApiVideogames();
        // await Videogame.bulkCreate(allVideogames); //passing all the game objects to the db
        // return allVideogames
        const apiGames = await getApiVideogames()
        const dbGames  = await getDbVideogames()
        return [...apiGames, ...dbGames]
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {getApiVideogames, getAllVideogames}