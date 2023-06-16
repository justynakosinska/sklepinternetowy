import React from "react";
import style from "./Footermod.module.scss";

const date=new Date();
const year=date.getFullYear();

const Footercom=()=>{
    return(
        <div className={style.footer}>
            &copy; {year} All Rghts Reserved

        </div>
    )
}
export default Footercom;