import styles from "./Forms.module.css"
import { FilterBy } from "./Filter.jsx";
// import Search from "./Search";

export default function Forms(){
    return(
        <div className={styles.forms}>
            <div className={styles.forms_filters}>
                <FilterBy/>
            </div>
        </div>
    )
}