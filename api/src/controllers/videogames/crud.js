// const axios = require("axios");
const {Videogame, Favorite} = require("../../db.js");

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
        // const findFav = await Favorite.findOne({
        //     where: {idGame: id}
        // })
        // if(findFav){
        //     await Favorite.destroy({
        //         where: {idGame: id}
        //     })
        // }
        return deletedGame
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = {postVideogame, deleteVideogame}