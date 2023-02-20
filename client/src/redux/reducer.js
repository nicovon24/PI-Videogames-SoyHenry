import { 
GET_ALL_GAMES, GET_GAME_BY_ID, GET_INITIAL_GAMES,  FILTER_GAMES, GET_PLATFORMS_GENRES,
INCREASE_PAGE, DECREASE_PAGE, GET_CURRENT_PAGES, RESTART_CURRENT_PAGE, CHANGE_PAGE, SEARCH_GAME, DELETE_GAME, CREATE_GAME } from "./action-types.js"

const initialState = {
    allGames: [],
    initialGames: [],
    pageGames: [], //todo VER COMO BORRAR
    currentPages: [],
    filteredPages: [],
    detailsGame: {},
    platforms: [],
    genres: [],
    page: 1,  //current page
    pages: 5  //total pages
}

const rootReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case GET_ALL_GAMES: return {
            ...state, 
            allGames: payload
        }

        case GET_INITIAL_GAMES: return {
            ...state,
            pageGames: payload,
            initialGames: payload,
            page: 1
        }

        case GET_CURRENT_PAGES: return { //
            ...state,
            currentPages: payload,
            pages: payload.length
        }

        case SEARCH_GAME: return {
            ...state,
            currentPages: payload,
            pages: payload.length,
            counterGames: payload.length,
            page: 1
        }

        case RESTART_CURRENT_PAGE: return {
            ...state,
            currentPages: payload,
            pages: payload.length,
            page: 1,
        }

        case FILTER_GAMES: return { //filtering games
            ...state, 
            currentPages: payload,
            filteredPages: payload,
            page: 1,
            pages: payload.length
        }

        case GET_GAME_BY_ID: return {
            ...state,
            detailsGame: {...payload}
        }

        case CREATE_GAME: return {
            ...state,
            allGames: [...state.allGames, payload]
        }


        case DELETE_GAME: return {
            ...state,
            allGames: state.allGames.filter(g=>g.id!==payload)
        }

        case INCREASE_PAGE: return {
            ...state, 
            page: state.page<state.pages ? state.page+1 : state.page
        }

        case DECREASE_PAGE: return {
            ...state, 
            page: state.page>1 ? state.page-1 : state.page
        }

        case CHANGE_PAGE: return {
            ...state,
            page: payload
        }

        case GET_PLATFORMS_GENRES: return { //for filter options
            ...state,
            platforms: payload.platforms,
            genres: payload.genres
        }

        default: return {
            ...state
        }
    }
}
export default rootReducer;