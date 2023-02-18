import Nav from "../Nav/Nav"
import styles from "./CreateGame.module.css"
import { useSelector } from "react-redux"

export default function CreateGame(){
    const {platforms, genres} = useSelector(state=>state)
    
    return(
        <div className={styles.create_container}>
            <Nav showSearch={false}/>

            <div className={styles.create_container}>
                <form className={styles.create_container_form}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name"></input>

                    <label htmlFor="image">Image</label>
                    <input type="url" name="image" id="image"></input>

                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description"></textarea>

                    <label htmlFor="platforms">Platforms</label>
                    <select className={styles.genres_container} size="4" multiple>
                        {genres.map(genre=>{
                                return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                                // return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                        })}
                    </select>

                    <label htmlFor="released">Released date</label>
                    <input type="date" name="released" id="released"></input>

                    <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" id="rating"></input>

                    <label htmlFor="genre">Genres</label>
                    <select name="genre" id="genre" size="4" multiple>
                        {platforms.map(platf=>{
                            return <option name={platf.name} key={platf.name} value={platf.name}>{platf.name}</option>
                        })}
                    </select>
                                        
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    )
}

// Nombre.
// Imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.