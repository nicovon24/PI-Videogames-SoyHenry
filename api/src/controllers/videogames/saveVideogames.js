const axios = require("axios");
const {Videogame} = require("../../db.js");
const {KEY_NAME} = process.env;

const getAllVideogames = async (name)=>{
    try{
        //if query name does not exist
        let arrVideogames = []
        if(!name){
            for(let i = 1; i <= 3; i++){ //TODO AUMENTAR A 5 o 10
                let response = await axios(`https://api.rawg.io/api/games?key=${KEY_NAME}&page=${i}`)
                let map = response.data.results.map(game=>{
                    let {name, rating, platforms, released, background_image} = game
                    return {
                        name, description: "",  
                        platforms, image: background_image,
                        released, rating
                    }
                })
                arrVideogames = [...arrVideogames, ...map]
            }
            return arrVideogames;
        }
        else{
            let response = await axios(`https://api.rawg.io/api/games?key=${KEY_NAME}&search=${name}&page_size=15`)
            let map = response.data.results.map(game=>{
                let {name, rating, platforms, released, background_image} = game
                return {
                    name, description: "",  
                    platforms, image: background_image,
                    released, rating
                }
            })
            arrVideogames = map
            return arrVideogames
        }
        
    }
    catch(err){
        throw new Error(err)
    }
}

const saveAllVideogames = async (name)=>{
    try {
        if(!name){
            const allVideogames = await getAllVideogames();
            await Videogame.bulkCreate(allVideogames);
            return allVideogames
            //bulkCreate nos permite pasarle un array de objetos y los crea juntos en la DB
        }
        else{
            const allVideogames = await getAllVideogames(name);
            await Videogame.bulkCreate(allVideogames);
            return allVideogames
            //bulkCreate nos permite pasarle un array de objetos y los crea juntos en la DB
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {getAllVideogames, saveAllVideogames}