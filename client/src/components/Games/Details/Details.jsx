import styles from "./Details.module.css"
import { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {clearDetails, getGameByID} from "../../../redux/actions.js"
import Nav from "../../Nav/Nav.jsx"
import Loader from "../../Loader/Loader.jsx"

export default function Details(){
    const [isLoaded, setIsLoaded] = useState(false)

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getGameByID(id))
        setTimeout(()=>{
            setIsLoaded(true)
        }, [3000])
        return ()=>{
            dispatch(clearDetails())
        }
    }, [dispatch, id])

    const game = useSelector(state=>state.detailsGame)

    const {description, platforms, genres} = game

    const handleBackHome = ()=>{
        navigate("/videogames")
    }

    //TODO separating the descriptions, by \n if there are none in there
    //so the text do not show all in the same line and break the description container
    let splitDescrCreatedGames = []
    let newDescrCreatedGames = ""

    if(description){
        splitDescrCreatedGames = description.split("\n")
    }

    if(description && splitDescrCreatedGames.length===1){
        const counter = description.length / 50

        for(let i = 1; i <= Math.ceil(counter); i++){
            newDescrCreatedGames=newDescrCreatedGames + description.substring(50*(i-1), 50*i) + "\n" //30*(1-1),30*(2-1) = 0, 30
        }

    }

    if(description && splitDescrCreatedGames.length>1){
        newDescrCreatedGames = description
    }

    return(
        <>
            {isLoaded ?
            <div>
                <Nav/>
                <div className={styles.details_container}>
                    <div className={styles.details}>
                        <div className={styles.details_image_container}>
                            <img src={(game?.image?.match(/\.(jpeg|jpg|gif|png)$/) || !game.image) ? game?.image : "https://media.discordapp.net/attachments/1073407771166380107/1079132104325087362/xbox-series-x-controller.webp"} alt="game img"/>
                            <div className={styles.details_info}>
                                <h1>{game?.name}</h1>
                                {platforms && <p><b>Platforms:</b> {platforms.join(",")}</p>}
                                {genres && <p><b>Genres:</b> {genres?.join(",")}</p>}
                                <p><b>Rating:</b> {game?.rating}</p>
                                <p><b>Released:</b> {game?.released}</p>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <p>{game.createdByUser ? newDescrCreatedGames : game?.description}</p>
                        </div>
                    </div>
                    <div>
                        <button className={styles.back_home} onClick={handleBackHome}>Back to home</button>
                    </div>
                </div>
            </div> :
            <Loader/>}
        </>
    )
}