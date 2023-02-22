import styles from "./Games.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { getInitialGames } from "../../../redux/actions"
import Card from "./Card.jsx"
import Menu from "../Menu/Menu.jsx"
import Forms from "../Forms/Forms.jsx"
import Loader from "../../Loader/Loader.jsx"
import Nav from "../../Nav/Nav"

export default function Games(){
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const {page, currentPages} = useSelector(state=>state)
    
    useEffect(()=>{
        dispatch(getInitialGames())
        setTimeout(()=>{
            setIsLoaded(true)
        }, [5000])
    }, [dispatch])

    let data = currentPages[page-1]

    return(
        <div>
            {isLoaded ? 
            <>
                <Nav/>
                <div className={styles.cards_container}>
                <div>
                    <Forms/>
                </div>
                {data && data[1].length!==0 ?
                <>
                    <Menu/>
                    <div className={styles.cards_subcontainer}>
                        {data[1].map(game=>{
                            return <Card game={game} key={game.id}/>
                        })}
                    </div>
                </>
                : 
                <div className={styles.none_videogames_container}>
                    <h1 className={styles.none_videogames}>None videogames left</h1>
                </div>
                }
                </div>
            </>
            : <Loader/>}
        </div>
    )
}