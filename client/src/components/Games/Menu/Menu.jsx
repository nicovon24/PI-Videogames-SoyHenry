
import styles from "./Menu.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux"
import {increasePage, decreasePage, changePage} from "../../../redux/actions.js"
import { useEffect, useState } from "react"

export default function Menu(){
    const [arrPages, setArrPages] = useState([])
    const dispatch = useDispatch()

    const {page, pages} = useSelector(state=>state)

    useEffect(()=>{
        let arr = []
        for(let i = 1; i <= pages; i++){ 
            arr.push(i)
        }
        setArrPages(arr) 
    }, [pages])

    const changePageFunct = (p)=>{
        dispatch(changePage(Number(p)))
    }

    return(
        <div className={styles.menu}>
            {page!==1 && <button onClick={()=>dispatch(decreasePage())}><FontAwesomeIcon icon={faArrowLeft}/></button>}
            {
                //all pages, and active page
                arrPages.map((p, index)=>{
                    return <button key={p}
                    className={`${p===page && styles.page_btn_active} ${styles.page_btn}`}
                    onClick={()=>changePageFunct(p)}>{p}</button>
                })
            }
            {page!==pages && <button onClick={()=>dispatch(increasePage())}><FontAwesomeIcon icon={faArrowRight}/></button>}
        </div>
    )
}