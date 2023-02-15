import styles from "./Games.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { getInitialGames } from "../../../redux/actions"
import Card from "./Card.jsx"
import Menu from "../Pages/Menu.jsx"
import Forms from "../Forms/Forms.jsx"

export default function Games(){
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getInitialGames())
    }, [dispatch])

    const {pageGames} = useSelector(state=>state)

    return(
        <div>
            <div className={styles.cards_container}>
                <div>
                    <Forms/>
                </div>
                <div className={styles.cards_subcontainer}>
                    {pageGames.map(game=>{
                        return <Card game={game} key={game.id}/>
                    })}
                </div>
                <Menu/>
            </div>
        </div>
    )
}