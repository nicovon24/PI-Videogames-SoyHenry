const printHomeMessage = ()=>{
    try{
        const message = [
            {get_all_videogames: "http://localhost:3001/videogames/all"},
            {get_initial_videogames: "http://localhost:3001/videogames"},
            {get_videogames_per_name: "http://localhost:3001/videogames?name=the&witcher"},
            {get_platform: "http://localhost:3001/platforms"},
            {get_genres: "http://localhost:3001/genres"},
            {get_favorites: "http://localhost:3001/favorites"},
            {get_users: "http://localhost:3001/users"}
        ]
        return message
    }
    catch{
        throw new Error("Could not make the initial message!!")
    }
}

module.exports = printHomeMessage