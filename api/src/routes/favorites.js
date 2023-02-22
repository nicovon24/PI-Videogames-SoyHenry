const { Router } = require('express');
const {Favorite} = require('../db.js')

const routerFavorites = Router();

routerFavorites.get('/', async (req, res)=>{
    try{
        const allFavs = await Favorite.findAll()
        res.status(200).json(allFavs)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerFavorites.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const findedFav = await Favorite.findOne({where: {idGame: id}})
        if(findedFav) {
            res.status(200).json(findedFav)
        }
        else throw new Error(`Favorite with id ${id} does not exist`)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerFavorites.post("/", async (req, res)=>{
    try{
        const {idGame, name, image} = req.body
        if(idGame && name && image){
            const find = await Favorite.findOne({where: {idGame: idGame.toString()}})
            if(!find){
                await Favorite.create({idGame, name, image})
                res.status(200).json({success: true, data_added: {idGame, name, image}})
            } else{
                throw new Error('Game already exists in favorites')
            }
        }
        else {
            throw new Error('Data uncompleted in the post of the character')
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerFavorites.delete("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const find = await Favorite.findOne({where: {idGame: id}})
        if(!find){
            throw new Error('Game does not exist in favorites')
        } else{
            Favorite.destroy({where: {idGame: id}})
            res.status(200).json({success: true})
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})


module.exports = routerFavorites