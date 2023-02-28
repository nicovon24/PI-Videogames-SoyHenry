import Nav from "../Nav/Nav"
import styles from "./CreateGame.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { changePage, createGame } from "../../redux/actions"

function validate(input){
    let errors = {}
    const regexName = new RegExp('^[A-Za-z0-9 ]+$', 'i');
    if(!input.name){
        errors.name = 'Name is required'
    } else if(!regexName.test(input.name)){
        errors.name = 'Name must be only letters or numbers'
    } else if(!input.image){
        errors.image = 'Image is required'
    } else if(input.genres.length===0){
        errors.genres = 'Genre is required'
    } else if(!input.released){
        errors.released = 'Released date is required'
    } else if(!input.rating || input.rating < 1 || input.rating > 5){
        errors.rating = 'Rating must be a number between "1" to "5"'
    } else if(input.platforms.length === 0){
        errors.platforms = 'Platform is required'
    } else if(!input.description){
        errors.description = 'Description is required'
    }
    return errors
}

export default function CreateGame(){
    let [data, setData] = useState({
        name: "",
        description: "",
        image: "",
        platforms: [],
        genres: [],
        released: "",
        rating: ""
    })

    let [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {platforms, genres, pages} = useSelector(state=>state)

    const handleChangeInput= (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...data,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeGenres = (e)=>{
        const {genres} = data
        const find = genres.find(f=>f===e.target.value)
        if(!find){
            setData({
                ...data,
                genres: [...data.genres, e.target.value]
            })
            setErrors(validate({
                ...data,
                [e.target.name]: e.target.value
            }))
        }
    }

    const handleChangePlatforms = (e)=>{
        const {platforms} = data
        if(!data.image){ //defaultImage
            setData({
                ...data,
                image: 'https://thumbs.dreamstime.com/b/gorila-gorila-del-silverback-22730829.jpg'
            })
        }
        const find = platforms.find(f=>f===e.target.value)
        if(!find){
            setData({
                ...data,
                platforms: [...data.platforms, e.target.value]
            })
            setErrors(validate({
                ...data,
                [e.target.name]: e.target.value
            }))
        }
        
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault()
        dispatch(createGame(data)) 
        if(Object.values(data).length===7){ //getting all data
            setData({
                name: "",
                description: "",
                image: "",
                platforms: [],
                genres: [],
                released: "",
                rating: ""
            })
            alert("You have created the game successfully!")
            navigate("/videogames")
            dispatch(changePage(pages)) //reinitiating the page to 
        }
    }

    function deleteSelectValue(property, value){
        setData({
            ...data,
            [property]: data[property].filter(p=>p!==value)
        })
    }
    return(
        <div className={styles.create_container}>
            <Nav/>

            <div className={styles.create_container}>
                <h1>Register your game!</h1>
                <form className={styles.create_container_form} onSubmit={handleSubmitForm}>
                    <div className={styles.create_container_subform}>
                        <label htmlFor="name" className={styles.property}>Name</label>
                        <input type="text" 
                            id="name" 
                            name="name" 
                            value={data.name} placeholder="Nati"
                            onChange={handleChangeInput}>
                        </input>
                        {errors.name && <label className={styles.errors}>{errors.name}</label>}

                        <label htmlFor="image" className={styles.property}>Image</label>
                        <input 
                            type="url" 
                            name="image" 
                            id="image" 
                            accept='.jpg, .jpeg, .png, .webp' //todo REVISAR
                            value={data.image} 
                            placeholder="https://thumbs.dreamstime.com/b/gorila-gorila-del-silverback-22730829.jpg"
                            onChange={handleChangeInput}>
                        </input>
                        {errors.image && <label className={styles.errors}>{errors.image}</label>}

                        <div className={styles.description_mobile}>
                            <label htmlFor="description" className={styles.property}>Description</label>
                            <textarea 
                                type="text" 
                                name="description"
                                id="description"
                                r
                                value={data.description} placeholder="Lorem ipsum..."
                                onChange={handleChangeInput}> 
                            </textarea>
                            {errors.description && <label className={styles.errors}>{errors.description}</label>}      
                        </div>

                        <label htmlFor="platforms" className={styles.property}>Genres</label>
                        <select className={styles.genres_container} 
                        name="genres" value={data.genres.length===0 ? "" : data.genres[data.genres.length-1]}
                        onChange={handleChangeGenres}>
                            <option>Select one or more options...</option>
                            {genres.sort((a,b)=>a?.name.localeCompare(b?.name)).map((genre)=>{
                                return <option name={genre?.name} key={genre?.name} value={genre?.name}>{genre?.name}</option>
                            })}
                        </select>
                        {errors.genres ? <label className={styles.errors}>{errors.genres}</label>
                        : <div className={styles.genre_platf_str}> 
                            {data.genres.map((d,index)=>{
                                if(d!=='Select one or more options...'){ //select one or more can not be selected
                                    return(<>
                                        <button key={index} type="button" onClick={()=>deleteSelectValue("genres", d)}>x</button>
                                        <label>{d}
                                        {index===data?.genres.length-1 ? "" : ","}</label> {/* separando por coma menos al final */}
                                    </>)
                                }
                                return null
                            })}
                        </div>}

                        <label htmlFor="released" className={styles.property}>Released date</label>
                        <input type="date"
                            name="released" 
                            id="released"
                            value={data?.released}
                            onChange={handleChangeInput}>
                        </input>
                        {errors.released && <label className={styles.errors}>{errors.released}</label>}

                        <label htmlFor="rating">Rating</label>
                        <input type="number" 
                            name="rating" 
                            id="rating" 
                            min={1} max={5} step={0.1}
                            value={data?.rating} 
                            onChange={handleChangeInput}
                            placeholder="4.5"> 
                        </input>
                        {errors.rating && <label className={styles.errors}>{errors.rating}</label>}

                        <label htmlFor="platforms" className={styles.property}>Platforms</label>
                        <select name="platforms" id="platforms" value={data.platforms.length===0 ? "" : data.platforms[data.platforms.length-1]} onChange={handleChangePlatforms}>
                            <option>Select one or more options...</option>
                            {platforms.sort((a,b)=>a.name.localeCompare(b.name)).map(platf=>{
                                return <option name={platf.name} key={platf.name} value={platf.name}>{platf.name}</option>
                            })}
                        </select>
                        {errors.platforms ? <label className={styles.errors}>{errors.platforms}</label>
                        : <div className={styles.genre_platf_str}> 
                            {data?.platforms.map((d,index)=>{
                                if(d!=='Select one or more options...'){
                                    return(<>
                                        <button type="button" onClick={()=>deleteSelectValue("platforms", d)} key={index}>x</button>
                                        <label>{d}
                                        {index===data.platforms.length-1 ? "" : ","}</label> {/* separando por coma menos al final */}
                                    </>)
                                }
                                return null
                            })}
                        </div>}
    
                        <button 
                            type="submit" 
                            className={styles.submit}
                            disabled={Object.values(errors).length>0}
                        >Submit</button>
                    </div>    
                    <div className={styles.description_desktop}>
                        <label htmlFor="description" className={styles.property}>Description</label>  
                        <textarea 
                                type="text" 
                                name="description"
                                id="description"
                                value={data.description} 
                                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem...."
                                onChange={handleChangeInput}> 
                        </textarea>
                        {errors.description && <label className={styles.errors}>{errors.description}</label>}      
                    </div>
                </form>
            </div>

        </div>
    )
}