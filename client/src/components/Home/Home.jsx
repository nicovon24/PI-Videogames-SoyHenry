import { useNavigate } from "react-router-dom"
import styles from "./Home.css"

export default function Home(){
  const navigate = useNavigate()
    return(
        <div className="home">
            <div className="btn-retro-container">
              <button className="btn-retro btn-retro-fourth" onClick={()=>navigate("/videogames")}>Videogames</button>
              {/* <button className="btn-retro btn-retro-tertiary">Sign up</button> */}
            </div>
            <div className="title">
              <p>Videospedia</p>
            </div>
        </div>
    )
}