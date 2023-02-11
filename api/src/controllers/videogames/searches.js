const {Op} = require('sequelize')
const axios = require('axios')
const {Videogame} = require("../../db.js");

const searchByName = async (req, res, name)=> {
    //todo getting upper, lower and capital combinations to get the videogames in the search
    //first we want the name query string
    let urlArr = req.url.split("/") //['videogames/', '?name=The&Witcher']
    let urlTotalQuery = urlArr[urlArr.length-1].split("=") //['?name?=', 'The&Witcher']
    urlTotalQuery = urlTotalQuery[urlTotalQuery.length-1]
    let nameQuery = urlTotalQuery.split("&").join(" ") //The Witcher

    //all the words from the query, capitalized
    const nameCombinations = [`%${nameQuery.toLowerCase()}`, `%${nameQuery.toUpperCase()}`] //deben empezar en estos con el name
    const capitalizedName = nameQuery.split(" ")
    nameCombinations.push(`%${capitalizedName.map(name=>name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase()).join(" ")}%`); //en estos, empezar o terminar

    const gamesDB = await Videogame.findAll({
        where: {
            "name": { 
                [Op.like]: {[Op.any]: nameCombinations  } //all posible combinations
            }
        }
    })

    //getting matched games from api
    const gamesAPI = await axios(`https://api.rawg.io/api/games?key=9418ffce5c744c1db900bab3e248fdc7&name=${urlTotalQuery}`) //the&witcher
    const gameAPIData = gamesAPI.data

    

    if(gamesDB.length>0) res.status(200).json(gamesDB)
    else res.status(400).json({error: `Game with name ${name} does not exist in the database`})
}

module.exports = {searchByName}