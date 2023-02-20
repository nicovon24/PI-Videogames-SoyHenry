import styles from "./Forms.module.css"
import { FilterBy } from "./Filter.jsx";

export default function Forms(){
    return(
        <div className={styles.forms}>
            <div className={styles.forms_filters}>
                <FilterBy/>
            </div>
        </div>
    )
}