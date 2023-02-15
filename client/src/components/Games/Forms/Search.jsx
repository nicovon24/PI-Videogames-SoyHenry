import styles from "./Forms.module.css"
// import "nes.css/css/nes.min.css";

export default function Search(){
    return(
        <form className={styles.search_container}>
            <input type="text" placeholder="Search..." className={`retro-input ${styles.input}`}/>
        </form>
    )
}