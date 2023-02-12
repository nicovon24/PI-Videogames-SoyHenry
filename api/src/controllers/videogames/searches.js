const {Op} = require('sequelize')
const axios = require('axios')
const {Videogame} = require("../../db.js");
const getRevelantDataFromAPI = require('../../functions/getRevelantData.js');

//todo search by name
const searchByName = async (req, res, name, page, havePage)=> {
    //todo getting upper, lower and capital combinations to get the videogames in the search
    
    //first we want the name query string
    let urlArr = req.url.split("/") //['videogames/', '?name=The&Witcher']
    let urlQuery = urlArr[urlArr.length-1].split("=") //['?name?=', 'The&Witcher']
    urlQuery = urlQuery[urlQuery.length-1] //'The&Witcher'
    let nameQuery = urlQuery.split("&").join(" ") //The Witcher

    //all the words from the query, capitalized
    const nameCombinations = [`%${nameQuery.toLowerCase()}`, `%${nameQuery.toUpperCase()}`] //array to be used which will have the possible comb of the name query
    const capitalizedName = nameQuery.split(" ")
    nameCombinations.push(`%${capitalizedName.map(name=>name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase()).join(" ")}%`); //en estos, empezar o terminar

    const gamesDB = await Videogame.findAll({ //finding the videogames with name...
        where: {
            "name": { 
                [Op.like]: {[Op.any]: nameCombinations  } //all posible combinations
            }
        }
    })
    // todo, agregar??? 
    // const gamesAPI = await axios(`https://api.rawg.io/api/games?key=9418ffce5c744c1db900bab3e248fdc7&search=${urlQuery}&page_size=15`)
    // const gamesAPIRelevantData = getRevelantDataFromAPI(gamesAPI.data.results, true)
    
    // if(gamesDB.length>0 || gamesAPI.length>0) res.status(200).json([...gamesDB, ...gamesAPIRelevantData])

    if(gamesDB.length>0 || gamesAPI.length>0) res.status(200).json([...gamesDB])
    else res.status(400).json({error: `Game with name ${name} does not exist in the database`})

}


//todo search by page
const searchByPage = async (req, res, page)=> {
    const allVideogames = await Videogame.findAll()
    const firstVideogames = [...allVideogames.slice(20*(page-1), 20*page)] //20 siguientes juegos

    if(firstVideogames.length>0) res.status(200).json(firstVideogames)
    else res.status(400).json({error: `Page not found`})
}


module.exports = {searchByName, searchByPage}