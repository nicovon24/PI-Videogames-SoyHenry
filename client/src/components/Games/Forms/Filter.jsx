import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPages, filterGames, restartCurrentPage } from "../../../redux/actions"
import styles from "./Forms.module.css"

export function FilterBy(){
    const [filters, setFilters] = useState({
        genre: "",
        platform: "",
        order: "",
        originData: ""
    })

    const dispatch = useDispatch()

    const handleChangeValue = (e)=>{ //getting checkboxes values
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const {allGames, page, pages, pageGames, platforms, genres} = useSelector(state=>state)

    useEffect(()=>{
        if(pageGames.length===0 && pages>page){
            dispatch(getCurrentPages(pageGames))
        }
    }, [dispatch, pageGames, pages, page])

    const handleSubmit = e=>{
        e.preventDefault()

        //*filtering
        if(filters.genre || filters.platform || filters.order){
            dispatch(filterGames(allGames, filters))
        }
        if(!filters.genre && !filters.platform){
            dispatch(restartCurrentPage(allGames))
        }

        //*order
        // const {order, originData} = filters
    }

    const handleRestart = ()=>{
        setFilters({
            genre: "",
            platform: "",
            order: "",
            originData: ""
        })
        dispatch(restartCurrentPage(allGames))
    }

    return(
        <form onSubmit={handleSubmit} className={styles.forms_filters}>
            <div>
                <select className={`${styles.select} retro-input`} name="genre" value={filters.genre} onChange={handleChangeValue}>
                    <option className={styles.option} value="" >genre</option>
                    {genres.map(genre=>{
                        return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                    })}
                </select>

                <select className={`${styles.select} retro-input`} name="platform" value={filters.platform} onChange={handleChangeValue}>
                    <option className={styles.option} value="" >platform</option>
                    {platforms.map(platf=>{
                        return <option name={platf.name} key={platf.name} value={platf.name}>{platf.name}</option>
                    })}
                </select>

                <select className={`${styles.select} retro-input`} name="order" value={filters.order} 
                onChange={handleChangeValue}>
                    <option className={styles.option} value="" >order by...</option>

                    <optgroup label="-rating">
                        <option value="max-min">Max to min</option>
                        <option value="min-max">Min to max</option>
                    </optgroup>

                    <optgroup label="-alphabetic">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </optgroup>
                </select>

                <select className={`${styles.select} retro-input`} name="originData" value={filters.originData} onChange={handleChangeValue}>
                    <option>Origin...</option>
                    <option value="all">All</option>
                    <option value="db">DB</option>
                    <option value="api">API</option>
                </select>
            </div>

            <div className={styles.btn_filters_container}>
                <button type="submit" className={`${styles.btn_filters}`}>Submit</button>
                <button onClick={()=>handleRestart()} className={`${styles.btn_filters}`}>Clear</button>
            </div>
        </form>
    )
}