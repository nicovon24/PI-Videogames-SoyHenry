import { NavLink } from "react-router-dom"
import styles from "./Home.module.css"

export default function Home(){
    return(
        <div className={styles.home}>
            <div className="btn-retro-container">
            <NavLink to="/videogames">
              <button className="btn-retro btn-retro-fourth">Videogames</button>
            </NavLink>
              {/* <button className="btn-retro btn-retro-tertiary">Sign up</button> */}
            </div>
            <div className={styles.title}>
              <p>Videospedia</p>
            </div>
        </div>
    )
}