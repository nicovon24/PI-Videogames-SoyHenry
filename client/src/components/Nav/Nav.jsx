import styles from "./Nav.module.css"
import {NavLink} from "react-router-dom"
import Search from "../Games/Forms/Search.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser, faGamepad, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Nav({showSearch = true}){ //only search is active in games
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
                {showSearch &&
                <div>
                    <Search/>
                </div>
                }
            </div>

            <div className={styles.prueba}></div>

            <div className={styles.header_mobile}>
                <nav className={styles.nav_mobile}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>About</NavLink></li>
                        <li><NavLink to="/favorites" className={({isActive}) => isActive ? styles.active : ""}>Favorites</NavLink></li>
                    </ul>
                </nav>
                {showSearch &&
                <div className={styles.search_container}>
                    <Search/>
                </div>
                }
            </div>
        </header>
    )
}