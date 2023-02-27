import styles from "./Games.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, deleteGame, removeFavorite } from "../../../redux/actions"
import { useEffect, useState } from "react"

export default function Card({game}){
    let [isFavorite, setIsFavorite] = useState(false)
                

    const dispatch = useDispatch()
    
    //*getting stars img of the game
    const {rating, name, image, id} = game

    let ratingStars = ""
    if(rating===5) ratingStars = getStars(5)
    else if(rating>=4.5 && rating!==5) ratingStars = getStars(4, 1)
    else if(rating>=4.0) ratingStars = getStars(4, 0, 1)
    else if(rating>=3.5) ratingStars = getStars(3, 1, 0)
    else if(rating>=3) ratingStars = getStars(3, 0, 2)
    else if(rating>=2.5) ratingStars = getStars(2, 1, 0)
    else if(rating>=2.0) ratingStars = getStars(2, 0, 3)
    else if(rating>=1.5) ratingStars = getStars(1, 1, 0)
    else if(rating>=1.0) ratingStars = getStars(1, 0, 4)
    else if(rating>=0.5) ratingStars = getStars(0, 1, 4)
    else if(rating>0) ratingStars = getStars(0, 0, 5)

    
    const handleDeleteGame = (id) => {
        dispatch(deleteGame(id))
    }

    const {favorites} = useSelector(s=>s)

    const handleChangeFav = () => {
        const find = favorites.find(f=>Number(f.idGame)===id)
        if(!find){     
            setIsFavorite(true)
            dispatch(addFavorite({idGame: id.toString(), name, image}))
        }
        else{
            setIsFavorite(false)
            dispatch(removeFavorite(game.id))
        }
    }

   //*checking if it is already in favorites
    useEffect(()=>{
        const find = favorites?.find(f=>{
            return f?.idGame===game?.id?.toString()
        })
        if(find) setIsFavorite(true)
        else setIsFavorite(false)
    }, [favorites])

    return(
        <>
            {Object.values(game).length>0 &&
            <div>
                
                <div className={styles.card}>
                    <div className={styles.card_subcontainer}> {/* responsively adjust vertically in screens height
                    lowe than 720px */}
                        <div className={styles.fav_btn}>
                            {!isFavorite 
                                ? <img src={require("../../../assets/unfavorite.png")} alt="fav btn"
                                onClick={handleChangeFav}/>
                                : <img src={require("../../../assets/favorite.png")} alt="fav btn"
                                onClick={handleChangeFav}/>
                            }
                        </div>
                        
                        <NavLink to={`/videogames/${game?.id}`} style={{textDecoration: "none"}}>
                            {/* default image */}
                            <img src={(game.image.match(/\.(jpeg|jpg|gif|png)$/) || !game.image) ? game?.image : "https://media.discordapp.net/attachments/1073407771166380107/1079132104325087362/xbox-series-x-controller.webp"} className={styles.card_img} alt="videogame img"/>
                        </NavLink>
                        <h1 className={`${styles.card_name} card_title`}>{game?.name}</h1>
                        {/* <ul>
                            {game?.genres?.map((el, index)=>{
                                if(game?.genres?.length-1===index) return <span key={index}>{el}</span>
                                else return <span key={index}>{el}, </span>
                            })}
                        </ul> */}
                        <ul className={styles.genres}>
                            {game?.genres?.map((el, index)=>{
                                const img = <img className={styles.genre_img}
                                src={require(`../../../assets/genres/${el.split(" ").join("-")}.png`)} alt="img genre"/>
                                
                                if(img) {
                                    return (
                                        <div key={index}>
                                            {img}
                                            <p>{el}</p>
                                        </div>
                                    )
                                }
                                else return null
                            })}
                        </ul>
                        {ratingStars}
                        <span className={styles.rating_string}>Rating: {game?.rating}</span>
                        {   
                            game.hasOwnProperty("createdByUser") &&
                            <button className={styles.btn_delete} onClick={(id)=>handleDeleteGame(game?.id)}>Delete</button>
                        }
                        {/* <p>{game?.released}</p> */}
                    </div>
                </div>
            </div>}
        </>
    )
}

//*getting stars img of the game
function getStars(num, numHalfStar, numNullStars){
    let imgsCompleteStar = []
    for(let i = 0; i < num; i++){
        imgsCompleteStar.push(<FontAwesomeIcon className={`${styles.star_img} ${styles.star_complete}`} key={`completed-${i}`} icon={faStar}/>)
    }
    const imgsNullStars = []
    for(let i = 0; i < numNullStars; i++){
        imgsNullStars.push(<FontAwesomeIcon className={`${styles.star_img} ${styles.star_null}`} key={`null-${i}`} icon={faStar}/>)
    }
    return(
        <div className={styles.card_container}>
            {imgsCompleteStar.map(img=>img)}
            {numHalfStar ? <FontAwesomeIcon className={`${styles.star_img} ${styles.star_half}`} icon={faStarHalfStroke}/> : ""}
            {numNullStars ? imgsNullStars.map(img=>img) : ""}
        </div>
    )
}