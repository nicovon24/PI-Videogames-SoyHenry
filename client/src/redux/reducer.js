import { 
GET_ALL_GAMES, GET_GAME_BY_ID, GET_INITIAL_GAMES,  FILTER_GAMES, GET_PLATFORMS_GENRES,
INCREASE_PAGE, DECREASE_PAGE, GET_CURRENT_PAGES, RESTART_CURRENT_PAGE, CHANGE_PAGE, SEARCH_GAME,
DELETE_GAME, CREATE_GAME, ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES, TOGGLE_DARK_MODE, CLEAR_DETAILS,  CLEAR_FILTERS, FILTER_CHANGE_VALUE } from "./action-types.js"

const initialState = {
    allGames: [],
    initialGames: [],
    currentPages: [],
    filteredPages: [],
    detailsGame: {},
    filters: {
        genre: "",
        platform: "",
        order: "",
        originData: ""
    },
    platforms: [],
    genres: [],
    favorites: [],
    page: 1,  //current page
    pages: 5,  //total pages
    darkmode: true
}

const rootReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case GET_ALL_GAMES: return {
            ...state, 
            allGames: payload
        }

        case GET_INITIAL_GAMES: return {
            ...state,
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

        case FILTER_GAMES: 
            return {
                ...state, 
                currentPages: payload,
                filteredPages: payload,
                page: 1,
                pages: payload.length
            }

        case CLEAR_FILTERS: return {
            ...state,
            filters: {
                genre: "",
                platform: "",
                order: "",
                originData: ""
            }
        }

        case GET_GAME_BY_ID: return {
            ...state,
            detailsGame: {...payload}
        }

        case CLEAR_DETAILS: return {
            ...state, 
            detailsGame: {}
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

        case GET_FAVORITES: 
            return {
                ...state,
                favorites: payload
            }

        case ADD_FAVORITE: 
            return {
                ...state,
                favorites: [...state.favorites, payload]
            }

        case REMOVE_FAVORITE: return {
            ...state,
            favorites: state.favorites.filter(fav=>fav.idGame!==payload.toString())
        }

        case TOGGLE_DARK_MODE: return {
            ...state,
            darkmode: state.darkmode ? false : true
        }

        case FILTER_CHANGE_VALUE: return {
            ...state, 
            filters: {
                ...state.filters,
                [payload.property]: payload.value
            }
        }

        default: return {
            ...state
        }
    }
}
export default rootReducer;