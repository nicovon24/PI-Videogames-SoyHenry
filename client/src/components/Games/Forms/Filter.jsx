import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPages, restartCurrentPage, clearFilters,  filterChangeValue, filterGames } from
 "../../../redux/actions"
import styles from "./Forms.module.css"

export function FilterBy(){
    const [flagExecuteFilterGames, setFlagExecuteFilterGames] = useState(false) //flag to execute the filter

    const dispatch = useDispatch()

    const handleChangeValue = (e)=>{ //getting checkboxes values
        dispatch(filterChangeValue(e.target.name, e.target.value))
        setFlagExecuteFilterGames(prev=>!prev)
    }

    let {allGames, filters, page, pages, platforms, genres} = useSelector(s=>s)

    useEffect(()=>{ //executng the function filter
        dispatch(filterGames(allGames, filters))
    }, [dispatch, allGames, filters, flagExecuteFilterGames])

    allGames = useSelector(s=>s.allGames) //updating it

    //executed every time the page and pages change, we get new data
    useEffect(()=>{
        //updating the data from current pages based by page
        if(pages>page){
            dispatch(getCurrentPages(allGames))
        }
    }, [dispatch, allGames, pages, page])

    const handleRestart = ()=>{
        const find = Object.values(filters).find(e=>e!=="") //["", "", "", ""] => not clearing the data
        if(find){  
            dispatch(clearFilters())
            dispatch(restartCurrentPage(allGames))
        }
    }

    return(
        <form className={styles.forms_filters}>
            <div className={styles.forms_filters_grid}>
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

                <div className={styles.btn_filters_container_mobile}>
                    <button onClick={()=>handleRestart()} 
                        className={`${styles.btn_filters} retro-input`}
                        >Clear
                    </button>
                </div>
            </div>

            <div className={styles.btn_filters_container_desktop}>
                <button onClick={()=>handleRestart()} type="button"
                    className={`${styles.btn_filters} retro-input`}
                    >Clear
                </button>
            </div>
        </form>
    )
}