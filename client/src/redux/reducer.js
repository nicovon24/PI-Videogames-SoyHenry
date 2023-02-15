import { 
GET_ALL_GAMES, GET_INITIAL_GAMES_PAGE, GET_GAME_BY_ID, GET_INITIAL_GAMES, GET_PAGES_PER_GAME, GET_FILTERED_GAMES, GET_PLATFORMS_GENRES,
INCREASE_PAGE, DECREASE_PAGE } from "./action-types.js"

const initialState = {
    allGames: [],
    initialGames: [],
    pageGames: [],
    gamesPerPage: [],
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
            initialGames: payload,
            pageGames: payload,
            page: 1
        }

        case GET_PAGES_PER_GAME: return {
            ...state,
            pages: Math.ceil(state.gamesPerPage.length / 20),
            gamesPerPage: payload
        }

        case GET_INITIAL_GAMES_PAGE: return {
            ...state, 
            pageGames: payload
        }

        case GET_FILTERED_GAMES: return {
            ...state, 
            pageGames: payload
        }

        case GET_GAME_BY_ID: return {
            ...state,
            detailsGame: {...payload}
        }

        case INCREASE_PAGE: return {
            ...state, 
            page: state.page<state.pages ? state.page+1 : state.page
        }

        case DECREASE_PAGE: return {
            ...state, 
            page: state.page>1 ? state.page-1 : state.page
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