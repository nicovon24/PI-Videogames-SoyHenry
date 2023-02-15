const axios  = require('axios');
const { Router } = require('express');
const { Videogame } = require('../db.js');
const { searchByName, searchByPage } = require('../controllers/videogames/searches.js');
const { postVideogame, deleteVideogame, putVideogame } = require('../controllers/videogames/crud.js');
const getGameById = require('../controllers/videogames/getGameById.js');

const routerVideogames = Router();

routerVideogames.get("/all", async (req, res)=>{
    try{
        const allVideogames = await Videogame.findAll()
        res.status(200).json(allVideogames)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.get("/", async (req, res)=>{
    try{
        const {name, page} = req.query
        if(!name || !page){
            //search all chars
            if(!name && (!page || page===1)){
                const allVideogames = await Videogame.findAll()
                const firstVideogames = [...allVideogames.slice(0, 20)] //20 first videogames
                res.status(200).json(firstVideogames)
            }

            //search by name, ?name=Gta
            else if(name && !page){
                searchByName(req, res, name)
            }

            else if(name && page){
                searchByName(req, res, name, true)
            }

            //search by page, ?page=2
            else if(!name && page){
                searchByPage(req, res, page)
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
            const {dataValues} = findedVideogame
            const {idAPI} = dataValues
            const dataVideogame = await getGameById(idAPI, id)
            res.status(200).json(dataVideogame)
        }
        else throw new Error(`Videogame with id ${id} does not exist`)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerVideogames.post("/", async (req, res)=>{
    try{
        const {name, description = "", image, released, rating} = req.body
        if(name && image && released && rating){
            const exists = await Videogame.findOne({
                where: {name: name}
            })
            if(!exists){
                const newGame = await postVideogame({name, description, image, released, rating})
                res.status(200).json({success: true, data_added: newGame})
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

routerVideogames.put("/:id", async (req, res)=>{
    try{
        let {id} = req.params
        let {body} = req

        if(id){
            const exists = await Videogame.findByPk(id)
            if(exists){
                await putVideogame(id, body)
                
                res.status(200).json({success: true})
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
