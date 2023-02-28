import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getCurrentPages, searchGame } from "../../../redux/actions"
import styles from "./Forms.module.css"

export default function Search(){
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const {allGames} = useSelector(state=>state)

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(search){ //if input, we search the game 
            dispatch(searchGame(search))
        }
        else{ //if not, we get back all the games
            dispatch(getCurrentPages(allGames))
        }
    }

    return(
        <form className={styles.form_search_container} onSubmit={handleSubmit}>
            <div className={`retro-input ${styles.btn_search_container}`}>
                <input type="text" placeholder="Search..." className={`${styles.input_search}`} onChange={e=>setSearch(e.target.value)}/>
                <button className={`${styles.btn_search}`} type="submit"><img src={require("../../../assets/nav/search.png")} alt="search img"/></button>   
            </div>
        </form>
    )
}