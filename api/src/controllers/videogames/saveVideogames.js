const axios = require("axios");
const {Videogame} = require("../../db.js");
const {KEY_NAME} = process.env;
const getRevelantDataFromAPI = require('../../functions/getRevelantData.js')

const getAllVideogames = async ()=>{
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

const saveAllVideogames = async (name)=>{
    try {
        if(!name){
            const allVideogames = await getAllVideogames();
            await Videogame.bulkCreate(allVideogames); //passing all the game objects to the db
            return allVideogames
        }
        else{
            const allVideogames = await getAllVideogames(name);
            await Videogame.bulkCreate(allVideogames);
            return allVideogames
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {getAllVideogames, saveAllVideogames}