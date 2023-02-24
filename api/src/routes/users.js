const { Router } = require('express');
const {User} = require('../db.js')

const routerUsers = Router();

routerUsers.get('/', async (req, res)=>{
    try{
        const allUsers = await User.findAll()
        res.status(200).json(allUsers)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerUsers.get("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const findedUser = await User.findOne({where: {id: id}})
        if(findedUser) {
            res.status(200).json(findedUser)
        }
        else throw new Error(`User with id ${id} does not exist`)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerUsers.post("/", async (req, res)=>{
    try{
        const {username, password} = req.body
        if(username && password){
            const find = await User.findOne({where: {username: username}})
            if(!find){
                await User.create({username, password})
                res.status(200).json({success: true, data_added: {username, password}})
            } else{
                throw new Error('User already exists in the data base')
            }
        }
        else {
            throw new Error('Data uncompleted in the creation of the user')
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

routerUsers.delete("/:id", async (req, res)=>{
    try{
        const {id} = req.params
        const find = await User.findOne({where: {id: id}})
        if(!find){
            throw new Error('User does not exist in the data base')
        } else{
            User.destroy({where: {id: id}})
            res.status(200).json({success: true})
        }
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})


module.exports = routerUsers