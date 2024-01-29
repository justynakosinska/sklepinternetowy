import React from 'react';
import style from './Search.module.scss';
import {BiSearch} from 'react-icons/bi';

const Search=({value,onChange})=>{
    return(
        <div className={style.search}>
            <BiSearch size={18} className={style.icon}/>

            <input type="text" placeholder="Wyszukaj po nazwie" value={value} onChange={onChange}/>
        </div>
    )
}
export default Search;