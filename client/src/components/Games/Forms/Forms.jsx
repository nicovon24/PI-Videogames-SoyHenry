import styles from "./Forms.module.css"
import { FilterBy } from "./Filter.jsx";
import Search from "./Search.jsx";
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
                    </>

                    : 
                    <>
                        Hide search and filters
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