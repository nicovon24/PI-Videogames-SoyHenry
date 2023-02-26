import styles from "./Forms.module.css"
import { FilterBy } from "./Filter.jsx";
import Search from "./Search.jsx";

export default function Forms({onSearch}){
    return(
        <div className={styles.forms}>
            <Search/>
            <div className={styles.forms_filters}>
                <FilterBy/>
            </div>
        </div>
    )
}