import React from 'react';
import style from './Footer.module.scss';

const date=new Date();
const year=date.getFullYear()

const Footer=()=>{
    return (
        <div className={style.footer}>
            &copy; {year}  Wwszystkie prawa zastrzeżone
        </div>
    )
}
export default Footer