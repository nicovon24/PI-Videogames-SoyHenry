// const axios = require("axios");
const {Videogame} = require("../../db.js");

const postVideogame = async (newData)=>{
    try{
        const createdGame = await Videogame.create(newData) //creating game
        return createdGame
    }
    catch(err){
        throw new Error(err)
    }
}

const deleteVideogame = async (id)=>{
    try{
        const deletedGame = await Videogame.destroy({ //deleting it
            where: {id: id}
        })
        return deletedGame
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = {postVideogame, deleteVideogame}