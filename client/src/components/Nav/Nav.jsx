import styles from "./Nav.module.css"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { toggleDarkMode } from "../../redux/actions"
import { useState } from "react"

export default function Nav(){ //only search is active in games
    const dispatch = useDispatch()
    const [showMobileNav, setShowMobileNav] = useState(false)

    const {favorites, darkmode} = useSelector(s=>s)

    const handleChangeMode = ()=>{
        dispatch(toggleDarkMode())
    }

    const toggleMobileNav = ()=>{
        setShowMobileNav(prev=>!prev)
    }

    return(
        <header className={styles.header_container}>
            <div className={styles.header_desktop}>
                <div className={styles.title}>
                    Videospedia
                </div>
                <nav className={styles.nav_desktop}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>
                            Games
                        </NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>
                            Create
                        </NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>
                            About
                        </NavLink></li>
                        <li><NavLink to="/favorites" className={({isActive}) => isActive ? styles.active : ""}>
                            Favorites({favorites.length})
                        </NavLink></li>
                    </ul>
                </nav>
                <button className={`light_mode_button`} aria-label="Toggle Light Mode" 
                onClick={handleChangeMode}>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={styles.header_mobile_icon}>
                <p onClick={toggleMobileNav}>{showMobileNav 
                ? "X" 
                : <img src={!darkmode ? require("../../assets/nav/blue_menu.png") : require("../../assets/nav/green_menu.png")} alt="hamburger icon"/>}</p>
            </div>
            <div className={`${styles.header_mobile} ${showMobileNav ? styles.active : styles.inactive}`}>
                <nav className={styles.nav_mobile}>
                    <ul>
                        <li><NavLink to="/videogames" className={({isActive}) => isActive ? styles.active : ""}>Games</NavLink></li>
                        <li><NavLink to="/create" className={({isActive}) => isActive ? styles.active : ""}>Create</NavLink></li>
                        <li><NavLink to="/about" className={({isActive}) => isActive ? styles.active : ""}>About</NavLink></li> 
                    </ul>
                </nav>
                <button className={`light_mode_button ${styles.light_mode_button}`} aria-label="Toggle Light Mode" 
                    onClick={handleChangeMode}>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}