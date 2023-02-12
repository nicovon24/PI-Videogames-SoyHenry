let {ID_NEW_GAMES} = process.env;

const getRevelantDataFromAPI = (array, needsID)=>{ 
    let relevantData = array.map(game=>{
        let {name, rating, platforms, released, background_image, genres} = game
        let arrPlatforms = []
        platforms.forEach(platf=>{ //getting only platforms name
            arrPlatforms.push(platf.platform.name)
        })
        let arrGenres = []
        genres.forEach(genre=>{ //getting only platforms name
            arrGenres.push(genre.name)
        })
        if(needsID){
            return {
                name, id: ID_NEW_GAMES++, idAPI: game.id, description: "",  
                platforms: arrPlatforms, image: background_image, genres: arrGenres,
                released, rating
            }
        }
        else{
            return {
                name, description: "",  
                platforms: arrPlatforms, idAPI: game.id, image: background_image, genres: arrGenres,
                released, rating
            }
        }
    })
    return relevantData
}

module.exports = getRevelantDataFromAPI