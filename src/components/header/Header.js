import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaShoppingCart, FaUserCircle} from 'react-icons/fa';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {FaTimes} from 'react-icons/fa'
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLinks/hiddenLink';
import AdminOnyRoute, { AdminOnyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';






const logo=(
<div className={style.logo}>
                    <Link to='/'>
                        <h2>W<span>ome</span></h2>
                    </Link>
                </div>
)


const activeLink=({isActive})=>(isActive ? `${style.active}` : "");

const Header=()=>{
    const [showMenu, setShowMenu]=useState(false);
    const [displayName, setDisplayName]=useState('');
    const [scrollPage, setScrollPage]=useState(false);
    const cartTotalQuantity=useSelector(selectCartTotalQuantity)

useEffect(()=>{
    dispatch(CALCULATE_TOTAL_QUANTITY)
},[])

    const navigate=useNavigate();
    const dispatch=useDispatch()

    const fixNavbar=()=>{
        if(window.scrollY > 50){
            setScrollPage(true)
        }else{
        setScrollPage(false)
        }
    }
    window.addEventListener("scroll",fixNavbar)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              //console.log(user)
              //const uid = user.uid;
              //console.log(user.displayName)
              if(user.displayName==null){
                const u1=user.email.substring(0, user.email.indexOf("@"));
                const uName=u1.charAt(0).toUpperCase()+u1.slice(1)
                //console.log(uName);
                setDisplayName(uName)
              } else{
                setDisplayName(user.displayName)
              }
              

              dispatch(SET_ACTIVE_USER({
                email:user.email,
                userName:user.displayName ? user.displayName : displayName,
                userID:user.uid,
              }))
            } else {
              setDisplayName('')
              dispatch(REMOVE_ACTIVE_USER())
            }
          });
    },[dispatch,displayName])

    const toggleMenu=()=>{
        setShowMenu(!showMenu)
    };

    const hideMenu=()=>{
        setShowMenu(false)
    };
    const logoutUser=()=>{
        signOut(auth).then(() => {
            toast.success("Wylogowanie powiodło się")
            navigate("/")

          }).catch((error) => {
            toast.error(error.message)

          });
    }
    const cart=(
        <span className={style.cart}>
            <Link to='/koszyk'>
                Koszyk 
                <FaShoppingCart size={20}/>
                <p>{cartTotalQuantity}</p>
                </Link>
        </span>
    )

    return (
        <header className={scrollPage ? `${style.fixed}` : null}>
            <div className={style.header}>
                {logo}

                <nav className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}>
                    <div className={showMenu ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}` : `${style["nav-wraapper"]}`}
                    onClick={hideMenu}
                    ></div>

                    <ul onClick={hideMenu}>
                        <li className={style['logo-mobile']}>
                            {logo}
                            <FaTimes size={22} color='#fff' onClick={hideMenu}/>
                        </li>
                        

                        <li><AdminOnyLink><Link to='/administrator/strona-glowna'><button className="--btn --btn-primary">Administrator</button></Link></AdminOnyLink></li>
                        
                        <li>
                            <NavLink to="/" className={activeLink}>Strona główna</NavLink>
                        </li>
                        <li>
                            <NavLink to="/kontakt" className={activeLink}>Kontakt</NavLink>
                        </li>
                    </ul>

                    <div className={style["header-right"]} onClick={hideMenu}>
                        <span className={style.links}>
                            <ShowOnLogout>
                            <NavLink to="/logowanie" className={activeLink}>Logowanie</NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                            <a href="#home"><FaUserCircle size={16}/>{displayName}</a>
                            </ShowOnLogin>
                           <ShowOnLogin>
                            <NavLink to="/zamowienia" className={activeLink}>Zamówienia</NavLink>
                            </ShowOnLogin>
                            <ShowOnLogin>
                            <NavLink to="/ " onClick={logoutUser}>Wyloguj się</NavLink>
                            </ShowOnLogin>
                        </span>
                        {cart}
                    </div>
                    
                </nav>

                <div className={style["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
                </div>

            </div>
        </header>
    )
}
export default Header