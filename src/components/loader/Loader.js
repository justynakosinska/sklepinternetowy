import style from './Loder.module.scss';
import loaderImg from '../../assets/loader.gif';
import React from 'react';
import ReactDOM from 'react-dom';

const Loader=()=>{
return ReactDOM.createPortal (
    <div className={style.wrapper}>
        <div className={style.loader}>
            <img src={loaderImg} alt='Ładowanie'/>
        </div>
    </div>,
    document.getElementById("loader")
)
}
export default Loader