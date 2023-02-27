import styles from "./Forms.module.css"
import { FilterBy } from "./Filter.jsx";
import Search from "./Search.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp  } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

export default function Forms(){
    const [isFormShown, setIsFormShown] = useState(true)
    return(
        <>
            <div className={styles.forms}>
                <p className={styles.show}
                onClick={()=>setIsFormShown(prev=>!prev)}>
                    {!isFormShown 
                    ? 
                    <>
                        Show search and filters 
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </>

                    : 
                    <>
                        Hide search and filters
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </>}
                </p>
                {isFormShown && 
                <>
                    <div className={styles.forms_desktop}>
                    <Search/>
                    <div className={styles.forms_filters}>
                        <FilterBy/>
                    </div>
                    </div>
                    <div className={styles.forms_mobile}>
                        <Search/>
                        <div className={styles.forms_filters}>
                            <FilterBy/>
                        </div>
                    </div>
                </>}
            </div>
            </>
    )
}