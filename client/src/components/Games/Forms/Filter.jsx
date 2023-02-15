import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFilteredGames, getInitialGamesPage } from "../../../redux/actions"
import styles from "./Forms.module.css"

export function FilterBy(){
    const [filters, setFilters] = useState({
        genre: "",
        platform: ""
    })

    const dispatch = useDispatch()

    const {allGames, page} = useSelector(state=>state)

    const handleChangeValue = (e)=>{
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e=>{
        e.preventDefault()
        if(!filters.genre && !filters.platform){
            dispatch(getInitialGamesPage(page))
        }
        if(filters.genre || filters.platform){
            dispatch(getFilteredGames(allGames, filters))
        }
    }

    const {pageGames} = useSelector(state=>state)

    useEffect(()=>{
        if(pageGames.length===0){
            dispatch(getInitialGamesPage(page))
        }
    }, [dispatch, pageGames, page])

    const {platforms, genres} = useSelector(state=>state) //para options

    return(
        <form onSubmit={handleSubmit}>
            <select className={`${styles.select} retro-input`} name="genre" value={filters.genre} onChange={handleChangeValue}>
                <option className={styles.option}>genre</option>
                {genres.map(genre=>{
                    return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                })}
            </select>
            <select className={`${styles.select} retro-input`} name="platform" value={filters.platform} onChange={handleChangeValue}>
                <option className={styles.option}>platforms</option>
                {platforms.map(platf=>{
                    return <option name={platf.name} key={platf.name} value={platf.name}>{platf.name}</option>
                })}
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}