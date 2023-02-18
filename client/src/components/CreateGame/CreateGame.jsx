import Nav from "../Nav/Nav"
import styles from "./CreateGame.module.css"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function CreateGame(){
    let {data, setData} = useState({
        name: "",
        description: "",
        image: "",
        platforms: [],
        released_date: "",
        rating: "",
        genres: []
    })

    const {platforms, genres} = useSelector(state=>state)

    const handleChangeInput= (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault()
    }
    
    return(
        <div className={styles.create_container}>
            <Nav showSearch={false}/>

            <div className={styles.create_container}>
                <form className={styles.create_container_form} onSubmit={handleSubmitForm}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChangeInput}></input>

                    <label htmlFor="image">Image</label>
                    <input type="url" name="image" id="image" onChange={handleChangeInput}></input>

                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" onChange={handleChangeInput}></textarea>

                    <label htmlFor="platforms">Platforms</label>
                    <select className={styles.genres_container} size="4" multiple name="genres" onChange={handleChangeInput}>
                        {genres.map(genre=>{
                                return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                                // return <option name={genre.name} key={genre.name} value={genre.name}>{genre.name}</option>
                        })}
                    </select>

                    <label htmlFor="released_data">Released date</label>
                    <input type="date" name="released_data" id="released_data" onChange={handleChangeInput}></input>

                    <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" id="rating" min={1} max={5} onChange={handleChangeInput}></input>

                    <label htmlFor="genre">Genres</label>
                    <select name="genre" id="genre" size="4" multiple onChange={handleChangeInput}>
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