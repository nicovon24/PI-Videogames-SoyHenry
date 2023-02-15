import styles from "./Games.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom"

export default function Card({game}){
    const {rating} = game
    let ratingStars = ""
    if(rating===5) ratingStars = getStars(5)
    else if(rating>4.5 && rating!==5) ratingStars = getStars(4, 1)
    else if(rating>4.0) ratingStars = getStars(4, 0, 1)
    else if(rating>3.5) ratingStars = getStars(3, 1, 0)
    else if(rating>3) ratingStars = getStars(3, 0, 2)
    else if(rating>2.5) ratingStars = getStars(2, 1, 0)
    else if(rating>2.0) ratingStars = getStars(2, 0, 3)
    else if(rating>1.5) ratingStars = getStars(1, 1, 0)
    else if(rating>1.0) ratingStars = getStars(1, 0, 4)
    else if(rating>0.5) ratingStars = getStars(0, 1, 4)
    else if(rating>0) ratingStars = getStars(0, 0, 5)

    return(
        <div className={styles.card}>
            <NavLink to={`/videogames/${game.id}`} style={{textDecoration: "none"}}>
                <img src={game.image} className={styles.card_img} alt="videogame img"/>
            </NavLink>
            <h1 className={`${styles.card_name} card_title`}>{game.name}</h1>
            <ul>
                {game.genres.map((el, index)=>{
                    if(game.genres.length-1===index) return <span key={index}>{el}</span>
                    else return <span key={index}>{el}, </span>
                })}
            </ul>
            {ratingStars}
            <span className={styles.rating_string}>Rating: {game.rating}</span>
            {/* <p>{game.released}</p> */}
        </div>
    )
}

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