const axios  = require('axios');
const { Router } = require('express');
const { Videogame, Platform, Genre } = require('../db.js');
const { searchByName, searchByPage } = require('../controllers/videogames/searches.js');
const { postVideogame, deleteVideogame, putVideogame } = require('../controllers/videogames/crud.js');
const getGameById = require('../controllers/videogames/getGameById.js');
const { getAllVideogames } = require('../controllers/videogames/saveVideogames.js');

const routerVideogames = Router();

routerVideogames.get("/all", async (req, res)=>{
    try{
        const allVideogames = await getAllVideogames()
        // const allVideogames = await Videogame.findAll()
        res.status(200).json(allVideogames)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.get("/", async (req, res)=>{
    try{
        const {name} = req.query
        if(!name){
            //search all chars
            if(!name){
                const allVideogames = await getAllVideogames()
                const firstVideogames = [...allVideogames.slice(0, 20)] //20 first videogames
                res.status(200).json(firstVideogames)
            }
        }
        else{
            searchByName(req, res, name)
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const allVideogames = await getAllVideogames()
        const findApi = allVideogames.find(g=>g.id===Number(id)) //in api it is type num
        const findDB = allVideogames.find(g=>g.id===id) //in db is type uuid (string)
        if(findApi || findDB) {
            if(findApi){
                const {id} = findApi
                const dataVideogame = await getGameById(id)
                res.status(200).json(dataVideogame)
            }
            if(findDB){
                const findDB = await Videogame.findByPk(id)
                console.log(findDB);
                res.status(200).json(findDB)
            }
        }
        else throw new Error(`Videogame with id ${id} does not exist`)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.post("/", async (req, res)=>{
    try{
        const {name, 
            description = "", 
            image, 
            released, 
            rating,
            platforms, 
            genres
        } = req.body

        if(name && image && released && rating && platforms && genres){
            const exists = await Videogame.findOne({
                where: {name: name}
            })
            if(!exists){
                const newGame = await Videogame.create({name, 
                    description, 
                    image, 
                    platforms, 
                    genres, 
                    released,  
                    rating, 
                    createdByUser: true
                })

                const genresDb = await Genre.findAll({
                    where: {name: genres}
                })

                const platformsDb = await Platform.findAll({
                    where: {name: platforms}
                })

                newGame.addGenres(genresDb)
                newGame.addPlatform(platformsDb)

                res.status(200).json({success: true, data_added: {name, description, image, released, rating, createdByUser: true}})
            }
            else{
                throw new Error(`The videogame with name ${name} already exists`)
            }
        }
        else{
            throw new Error(`Uncompleted data`)
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

//{
//     "idAPI": 45566666,
//     "name" : "fer",
//     "description": "lorem ipsum",
//     "image": "sss",
//     "released": "2022-12-01",
//     "platforms": ["Playstation 5"],
//     "genres": ["Action"],
//     "rating": "5",
//     "createdByUser": "false"
//   }

// routerVideogames.put("/:id", async (req, res)=>{
//     try{
//         let {id} = req.params
//         let {body} = req

//         if(id){
//             const exists = await Videogame.findByPk(id)
//             if(exists){
//                 await putVideogame(id, body)

//                 res.status(200).json({success: true})
//             }
//             else{
//                 throw new Error(`The videogame with id ${id} does not exist`)
//             }
//         }
//         else{
//             throw new Error(`Uncompleted data`)
//         }
//     }
//     catch(err){
//         res.status(400).json({error: err.message})
//     }
// })


routerVideogames.delete("/:id", async (req, res)=>{
    try{
        let {id} = req.params

        if(id){
            const exists = await Videogame.findByPk(id)
            if(exists){
                const deletedGame = await deleteVideogame(id)
                res.status(200).json({success: true, data_deleted: deletedGame})
            }
            else{
                throw new Error(`The videogame with id ${id} does not exist`)
            }
        }
        else{
            throw new Error(`Uncompleted data`)
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})



module.exports = routerVideogames;
