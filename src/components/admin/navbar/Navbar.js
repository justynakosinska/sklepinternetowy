import React from 'react';
import style from './Navbar.module.scss'
import { NavLink } from 'react-router-dom';

const activeLink=({isActive})=>(isActive ? `${style.active}` : "");

const Navbar=()=>{
    return(
        <div className={style.navbar}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/administrator/strona-glowna" className={activeLink}>
                            Strona Główna
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/administrator/produkty" className={activeLink}>
                            Produkty
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/administrator/dodaj-produkt/ADD" className={activeLink}>
                            Dodaj Produkt
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/administrator/zamowienia" className={activeLink}>
                            Zamówienia
                        </NavLink>
                    </li>
                </ul>
            </nav>

        </div>
    )
}
export default Navbar;