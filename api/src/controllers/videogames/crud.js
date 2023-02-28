// const axios = require("axios");
const {Videogame} = require("../../db.js");

const postVideogame = async (newData)=>{
    try{
        const createdGame = await Videogame.create(newData) //creating game
        return createdGame
    }
    catch(err){
        throw new Error(err)
    }
}

const deleteVideogame = async (id)=>{
    try{
        const deletedGame = await Videogame.destroy({ //deleting it
            where: {id: id}
        })
        return deletedGame
    }
    catch(err){
        throw new Error(err)
    }
}

module.exports = {postVideogame, deleteVideogame}


//{"name": "shadow of rome", "description": "", "image": "https://media.vandal.net/m/3220/2004129113946_1.jpg", "released": "2022-12-01", "rating": "3.5"}

// const putVideogame = async (id, attributes)=>{
//     try{
//         if(attributes.length>0){ //checking if the are attributes
//             const every = attributes.every(attr=>{ //?checking if they arey ok
//                 attr = Object.keys(attr)[0]
//                 return attr==="name" || attr==="description" || attr==="image" || attr==="platforms" || attr==="released"
//                 || attr==="rating"
//             })

//             if(every){ //if they are ok
//                 const updatedGame = attributes.map(async (attr)=>{ //update them
//                     let data = Object.entries(attr)
//                     return await Videogame.update(
//                         { [data[0][0]]: data[0][1] },
//                         {where: {
//                             id: id
//                         }}
//                     )
//                 })
        
//                 return updatedGame
//             }
//             else{
//                 throw new Error('There is an attribute or more which do not exist in the data base')
//             }
//         }
//         else{
//             throw new Error('Fails in the attributes, must be an array and have a length greater than one.')
//         }
//     }
//     catch(err){
//         throw new Error(err)
//     }
// }