import styles from "./Favorites.module.css"
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import { removeFavorite } from "../../redux/actions";

export default function Favorites(){
    
    const {favorites} = useSelector(s=>s)

    const dispatch = useDispatch()

    function deleteFav(id){
        dispatch(removeFavorite(id))
    }

    return(
        <>
            <Nav showSearch={false}/>
            <div className={styles.cards_container}>
                <div className={styles.cards_container2}>
                    {favorites.length>0 ? 
                    <>
                        <h1>Favorites</h1>
                        <div className={styles.cards_subcontainer}>
                            {favorites?.map(f=>{
                                return(
                                    <div className={styles.card} key={f?.idGame}>
                                        <img src={require('../../assets/delete_blue.png')}
                                        className={styles.card_deleteImage} alt="delete img"
                                        onClick={()=>deleteFav(f.idGame.toString())}/>
                                        <img src={f.image} alt="img of the fav game"
                                        className={styles.card_mainImage}/>
                                        <p className={`${styles.card_name} card_title`}>{f.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </> 
                    : <h1 className={styles.none_game}>None favorites games yet</h1>}
                </div>
            </div>
        </>
    )
}