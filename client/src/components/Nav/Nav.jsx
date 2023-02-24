import styles from "./Nav.module.css"
import {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser, faGamepad, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch} from "react-redux"
import { toggleDarkMode } from "../../redux/actions"

export default function Nav(){ //only search is active in games
    const dispatch = useDispatch()

    const handleChangeMode = ()=>{
        dispatch(toggleDarkMode())
    }

    return(
        <header className={styles.header_container}>
            <div className={styles.header_desktop}>
                <div className={styles.title}>
                    <NavLink to="/">Videospedia</NavLink>
                </div>
                <nav className={styles.nav_desktop}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}><FontAwesomeIcon icon={faGamepad}/>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}><FontAwesomeIcon icon={faUserPlus}/>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}><FontAwesomeIcon icon={faUser}/>About</NavLink></li>
                        <li><NavLink to="/favorites" className={({isActive}) => isActive ? styles.active : ""}><FontAwesomeIcon icon={faHeart}/>Favorites</NavLink></li>
                        
                    </ul>
                </nav>
                <button className={`light_mode_button`} aria-label="Toggle Light Mode" 
                onClick={handleChangeMode}>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={styles.header_mobile}>
                <nav className={styles.nav_mobile}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>About</NavLink></li>
                        <li><NavLink to="/favorites" className={({isActive}) => isActive ? styles.active : ""}>Favorites</NavLink></li>
                    </ul>
                </nav>
                <button className={`light_mode_button`} aria-label="Toggle Light Mode" 
                onClick={handleChangeMode}>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}