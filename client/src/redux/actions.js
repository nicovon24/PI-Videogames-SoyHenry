import axios from "axios"
import { GET_ALL_GAMES, GET_INITIAL_GAMES, GET_GAME_BY_ID, SEARCH_GAME, INCREASE_PAGE, DECREASE_PAGE, 
GET_PLATFORMS_GENRES, GET_CURRENT_PAGES, RESTART_CURRENT_PAGE, FILTER_GAMES, CHANGE_PAGE, DELETE_GAME, 
CREATE_GAME, ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES, TOGGLE_DARK_MODE, CLEAR_DETAILS } from "./action-types.js"

export const getAllGames = ()=>{ //the 100 games
    return async function(dispatch){
        try{
            const response = await axios.get(`/videogames/all`)
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
            const response = await axios.get(`/videogames`)
            return dispatch({
                    type: GET_INITIAL_GAMES,
                    payload: [[1, response.data]]
                }
            )
        }
        catch(err){
            throw new Error('Could not fetched the initial videogames')
        }
    }
}

export function getCurrentPages(currentGames){ //pages, getting the data for the pages
    try{
        if(currentGames){
            let games= currentGames
            let max = Math.ceil(games.length / 15) //7
    
            let slicedGames = [[1, games.slice(0, 15)]]
            let i = 2
    
            while(max>1){ //7>1, 6>1, etc
                slicedGames.push([i, games.slice(15*(i-1), 15*i)])
                i++
                max--
            }
    
            return ({
                type: GET_CURRENT_PAGES,
                payload: slicedGames
            })
        }
    }
    catch(err){
        throw new Error('Could not get the current pages')
    }
}

export function restartCurrentPage(allGames){ //pages 
    return async function(dispatch){
        try{
            if(allGames){
                const games = await getCurrentPages(allGames).payload
                return dispatch({
                    type: RESTART_CURRENT_PAGE,
                    payload: games
                })
            }
        }
        catch(err){
            throw new Error('Could not restart the current pages')
        }
    }
}

export function getGameByID(id){
    return async function(dispatch){
        try{
            if(id){
                const response = await axios.get(`/videogames/${id}`)
                return dispatch({
                        type: GET_GAME_BY_ID,
                        payload: response.data
                    }
                )
            }
            else{
                return dispatch({
                    type: GET_GAME_BY_ID,
                    payload: {}
                }
            )
            }
        }
        catch(err){
            throw new Error('Could not find the videogame')
        }
    }
}

export function clearDetails(){
    return {
        type: CLEAR_DETAILS
    }
}

export function searchGame(search){
    return async function(dispatch){
        try{
            const searchArr = search.split(" ")
            const response = await axios.get(`/videogames?name=${searchArr.join("&")}`)
            const currentPages = await getCurrentPages(response.data) //formato paginas
            if(currentPages){
                return dispatch({
                    type: SEARCH_GAME,
                    payload: currentPages.payload
                    // payload: response.data
                })
            }
        }
        catch(err){
            throw new Error('Could not get the searched games')
        }
    }
}

export function filterGames(allGames, {genre, platform, order, originData}){ //filtering
    try{
        let results = [...allGames] //spread operator to not pisar de array

        //*filter by genre
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

        //*filter by platform
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

        //*order
        if(order){
            switch(order){
                case "max-min":
                    results = results.sort((a, b) => b.rating - a.rating);
                    break;
                case "min-max": 
                    results = results.sort((a, b) => a.rating - b.rating);
                    break;
                case "A-Z": 
                    results = results.sort((a,b)=>a.name.localeCompare(b.name))
                    break;
                case "Z-A": 
                    results = results.sort((a,b)=>b.name.localeCompare(a.name))
                    break;
                default: 
                    break;
            }
        }

        if(originData){
            switch(originData){
                case "all":
                    results = allGames
                    break;
                case "db": 
                    results = results.filter(game=>{
                        if(game.id.toString().length>10) return game
                        return null
                    })
                    break;
                case "api":
                    results = results.filter(game=>{
                        if(typeof(game.id)==="number") return game
                        return null
                    })
                    break;
                default:
                    break;
            }
        }

        const passToPages = getCurrentPages(results).payload //lo paso a formato 
        //[[1: { [ {...}]} ]...]

        return {
            type: FILTER_GAMES,
            payload: passToPages
        }
    }
    catch(err){
        throw new Error('Could not filter the videogames neither by platform nor by genre')
    }
}

export function createGame(data){
    return async function(dispatch){
        try{
            await axios.post(`/videogames`, data)
            return dispatch({
                type: CREATE_GAME,
                payload: data
            }
        )
        }
        catch(err){
            throw new Error('Could not create the game')
        }
    }
}


export function deleteGame(id){
    return async function(dispatch){
        try{
            await axios.delete(`/videogames/${id}`)
            return dispatch({
                    type: DELETE_GAME,
                    payload: id
                }
            )
        }
        catch(err){
            throw new Error('Could not delete the videogame')
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

export function changePage(page){
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}

export function getPlatformsGenres(){ //for selects
    return async function(dispatch){
        try{
            const platforms = await axios.get(`/platforms`)
            const genres = await axios.get(`/genres`)
            return dispatch({
                type: GET_PLATFORMS_GENRES,
                payload: {
                    platforms: platforms.data.sort((a,b)=>{
                        if (a.name < b.name) {
                            return -1;
                          }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return null
                    }), 
                    genres: genres.data.sort((a,b)=>{
                        if (a.name < b.name) {
                            return -1;
                          }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return null
                    }), 
                }
            })
        }
        catch(err){
            throw new Error('Could not get all the platforms and games from the data base')
        }
    }
}

export const getFavorites = () => {
    return async function(dispatch){
        try{
            const response = await axios.get(`/favorites`)
            return dispatch({
                type: GET_FAVORITES,
                payload: response.data
            }
        )
        }
        catch(err){
            throw new Error('Could not add the favorite')
        }
    }
}

export const addFavorite = (character) => {
    return async function(dispatch){
        try{
            await axios.post(`/favorites`, character)
            return dispatch({
                type: ADD_FAVORITE,
                payload: character
            }
        )
        }
        catch(err){
            throw new Error('Could not add the favorite')
        }
    }
}

export const removeFavorite = (id) => {
    return async function(dispatch){
        try{
            await axios.delete(`/favorites/${id}`)
            return dispatch({
                type: REMOVE_FAVORITE,
                payload: id
            }
        )
        }
        catch(err){
            throw new Error(`Could not remove the favorite with id ${id}`)
        }
    }
}

export const toggleDarkMode = ()=>{
    return {
        type: TOGGLE_DARK_MODE
    }
}