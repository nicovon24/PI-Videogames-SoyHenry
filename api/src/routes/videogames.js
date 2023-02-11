const { Router } = require('express');
const {Videogame} = require('../db.js');
const { searchByName } = require('../controllers/videogames/searches.js');
// const {saveAllVideogames, getAllVideogames} = require('../controllers/videogames/saveVideogames.js')

const routerVideogames = Router();

routerVideogames.get("/", async (req, res)=>{
    try{
        const {name, page} = req.query
        if(!name || !page){
            //search all chars
            if(!name && !page){
                const allVideogames = await Videogame.findAll()
                res.status(200).json(allVideogames)
            }

            //search by name, ?name=Gta
            else if(name && !page){
                searchByName(req, res, name)
            }

            //search by page, ?page=2
            else if(!name && page){
                
            }
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const findedVideogame = await Videogame.findByPk(id)
        if(findedVideogame) {
            res.status(200).json(findedVideogame)
        }
        else throw new Error(`Videogame with id ${id} does not exist`)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})


module.exports = routerVideogames;
