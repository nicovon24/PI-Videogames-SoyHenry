
import styles from "./Pages.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux"
import {increasePage, decreasePage, getInitialGamesPage} from "../../../redux/actions.js"
import { useEffect } from "react"

export default function Menu(){
    const dispatch = useDispatch()

    const {page} = useSelector(state=>state)

    useEffect(()=>{
        dispatch(getInitialGamesPage(page))
    }, [dispatch, page])

    return(
        <div className={styles.menu}>
            <button onClick={()=>dispatch(decreasePage())}><FontAwesomeIcon icon={faArrowLeft}/></button>
            <label>{page}</label>
            <button onClick={()=>dispatch(increasePage())}><FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
    )
}