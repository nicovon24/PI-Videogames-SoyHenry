import styles from "./Nav.module.css"
import {NavLink} from "react-router-dom"
import Search from "../Games/Forms/Search.jsx"

export default function Nav({showSearch = true}){ //only search is active in games
    return(
        <header className={styles.header_container}>
            <div className={styles.header_desktop}>
                <div className={styles.title}>
                    <NavLink to="/">Videospedia</NavLink>
                </div>
                <nav className={styles.nav_desktop}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>About</NavLink></li>
                    </ul>
                </nav>
                {showSearch &&
                <div>
                    <Search/>
                </div>
                }
            </div>

            <div className={styles.header_mobile}>
                <nav className={styles.nav_mobile}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>About</NavLink></li>
                    </ul>
                </nav>
                {showSearch &&
                <div>
                    <Search/>
                </div>
                }
            </div>
        </header>
    )
}