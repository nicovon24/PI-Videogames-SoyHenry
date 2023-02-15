import axios from "axios"
import { GET_ALL_GAMES, GET_INITIAL_GAMES, GET_GAME_BY_ID, GET_INITIAL_GAMES_PAGE, GET_FILTERED_GAMES, INCREASE_PAGE, DECREASE_PAGE, GET_PLATFORMS_GENRES } from "./action-types.js"

export const getAllGames = ()=>{ //the 100 games
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames/all`)
            return dispatch({
                    type: GET_ALL_GAMES,
                    payload: response.data
                }
            )
        }
        catch(err){
            throw new Error('Could not fetched the videogames')
        }
    }
}

export const getInitialGames = ()=>{ //the first 20 games
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames`)
            return dispatch({
                    type: GET_INITIAL_GAMES,
                    payload: response.data
                }
            )
        }
        catch(err){
            throw new Error('Could not fetched the initial videogames')
        }
    }
}

//the other 80 games
export function getInitialGamesPage(page){ //games without filters
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/videogames/?page=${page}`)
        return dispatch({
            type: GET_INITIAL_GAMES_PAGE,
            payload: response.data
        })
    }
}

export function getPagesPerGame(currentGames){
    let slicedGames = [{1: currentGames.slice(0, 20)}] //initial games

    let i = 2
    let {length} = currentGames

    while(i<Math.ceil(length/20)){
        slicedGames.push({i: currentGames.slice(20*(i-1), 20*i)})
        i++
    }

    return slicedGames
}

export function getFilteredGames(allGames, {genre, platform}){ //games without filters
    let results = allGames
    if(genre){
        let filterByGenre = results.filter(game=>{
            let flag = false
            game.genres.forEach(g=>{
                const some = g===genre
                if(some) flag = true
            })
            if(flag) return game
            else return null
        })
        results = filterByGenre
    }
    if(platform){
        let filterByPlatform = results.filter(game=>{
            let flag = false
            game.platforms.forEach(p=>{
                const some = p===platform
                if(some) flag = true
            })
            if(flag) return game
            else return null
        })
        results = filterByPlatform
    }

    return {
        type: GET_FILTERED_GAMES,
        payload: results.slice(0, 20)
    }
}

export function getGameByID(id){
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                    type: GET_GAME_BY_ID,
                    payload: response.data
                }
            )
        }
        catch(err){
            throw new Error('Could not fetched the videogame')
        }
    }
}

export function increasePage(){
    return {
        type: INCREASE_PAGE
    }
}

export function decreasePage(){
    return {
        type: DECREASE_PAGE
    }
}

export function getPlatformsGenres(){
    return async function(dispatch){
        const platforms = await axios.get(`http://localhost:3001/platforms`)
        const genres = await axios.get(`http://localhost:3001/genres`)
        return dispatch({
            type: GET_PLATFORMS_GENRES,
            payload: {platforms: platforms.data, genres: genres.data}
        })
    }
}