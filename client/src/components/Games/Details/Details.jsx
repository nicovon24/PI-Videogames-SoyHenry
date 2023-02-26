import styles from "./Details.module.css"
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getGameByID} from "../../../redux/actions.js"
import Nav from "../../Nav/Nav.jsx"
import Loader from "../../Loader/Loader.jsx"

export default function Details(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        dispatch(getGameByID())
        dispatch(getGameByID(id))
        setTimeout(()=>{
            setIsLoaded(true)
        }, [4500])
    }, [dispatch, id])

    const game = useSelector(state=>state.detailsGame)

    const {description, platforms, genres} = game

    return(
        <>
            {isLoaded ?
            <>
                <Nav/>
                <div className={styles.details_container}>
                    <div className={styles.details}>
                        <div className={styles.details_image_container}>
                            <img src={game.image} alt="detail img"/>
                            <div className={styles.details_info}>
                                <h1>{game.name}</h1>
                                {platforms && <p><b>Platforms:</b> {platforms.join(",")}</p>}
                                {genres && <p><b>Genres:</b> {genres.join(",")}</p>}
                                <p><b>Rating:</b> {game.rating}</p>
                                <p><b>Released:</b> {game.released}</p>
                            </div>
                        </div>
                        <div className={styles.description} id="description">
                            {description}
                        </div>
                    </div>
                </div>
            </> :
            <Loader/>}
        </>
    )
}