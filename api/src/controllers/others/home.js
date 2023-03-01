const printHomeMessage = ()=>{
    try{
        const message = [
            {get_all_videogames: `https://pi-videogames-soyhenry-production-b313.up.railway.app/videogames/all`},
            {get_initial_videogames: `https://pi-videogames-soyhenry-production-b313.up.railway.app/videogames`},
            {get_videogames_per_name: `https://pi-videogames-soyhenry-production-b313.up.railway.app/videogames?name=the&witcher`},
            {get_platform: `https://pi-videogames-soyhenry-production-b313.up.railway.app/platforms`},
            {get_genres: `https://pi-videogames-soyhenry-production-b313.up.railway.app/genres`},
            {get_favorites: `https://pi-videogames-soyhenry-production-b313.up.railway.app/favorites`}
        ]
        return message
    }
    catch{
        throw new Error("Could not make the initial message!!")
    }
}

module.exports = printHomeMessage