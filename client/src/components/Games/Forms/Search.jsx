import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getCurrentPages, searchGame } from "../../../redux/actions"
import styles from "./Forms.module.css"

export default function Search(){
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [isLoaded, setIsLoaded] = useState("not yet")
    const dispatch = useDispatch()
    const {allGames} = useSelector(state=>state)

    const handleSubmit = (e)=>{
        e.preventDefault()
        setIsLoaded(false)
        let trimmedSearch = search.trim()
        const regexOnlyNumText = new RegExp('^[A-Za-z0-9 ]+$', 'i');
        if(!search){ //can not the search be "   "
            dispatch(getCurrentPages(allGames))
            setIsLoaded("not yet")
        }
        else if(!trimmedSearch){
            dispatch(getCurrentPages(allGames))
            setError("The search must contain data, not only a space")
        }
        else if(!regexOnlyNumText.test(search)){
            dispatch(getCurrentPages(allGames))
            setError("The search must be only numbers and text")
            setIsLoaded("not yet")
        }
        else if(!regexOnlyNumText.test(search)){
            dispatch(getCurrentPages(allGames))
            setError("The search must be only numbers and text")
            setIsLoaded("not yet")
        }
        
        else if(search.length>40){
            dispatch(getCurrentPages(allGames))
            setError("The search must have less than 40 characters")
            setIsLoaded("not yet")
        }
        else{ 
            setError("")
            dispatch(searchGame(search)).then(d=>setIsLoaded(true))
        }
    }

    return(
        <form className={styles.form_search_container} onSubmit={handleSubmit}>
            <div className={`retro-input ${styles.btn_search_container}`}>
                <input type="text" placeholder="Search..." className={`${styles.input_search}`} onChange={e=>setSearch(e.target.value)}/>
                <button className={`${styles.btn_search}`} type="submit"><img src={require("../../../assets/nav/search.png")} alt="search img"/></button>   
                
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {(!isLoaded ) && <p className={styles.loading}>Loading...</p>}
        </form>
    )
}