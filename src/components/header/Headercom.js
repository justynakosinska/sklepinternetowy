import React, { useEffect, useState } from "react";
import style from './Headermod.module.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseIntegration/konfiguracja";
import { toast } from "react-toastify";


function logoText() {
    return (
      <div className={style.logo}>
        <Link to="/">
          <h1>W<span>ome</span></h1>
        </Link>
      </div>
    );
  }
  const activeBtn=(({isActive})=>(
  isActive ? `${style.active}` :  "")

  )
  

const Headercom=()=>{
const navigation=useNavigate();
const [displayUserName, setDisplayUserName]=useState("");

//sprawdzanie czy użytkownik jest nadal zalogowany
useEffect(()=>{ //ta funkcja zostanie uruchomiona raz przy każdym przeładowaniu strony
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setDisplayUserName(user.displayName)
        } else {
            setDisplayUserName("");
      }});
},[])

const logout=()=>{
    signOut(auth).then(() => {  
        toast.success("Wylogowanie użytkownika powiodło się");
        navigation("/");
      }).catch((error) => {
        toast.error("Wylogowanie nie powiodło się")
      });
  }
  
    return(
        <header>
            <div className={style.header}>
                {logoText()}
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={activeBtn}>
                                Strona główna
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={activeBtn}>
                                Kontakt
                            </NavLink>
                        </li>
                    </ul>
                    <div className={style.rightplace}>
                    <span className={style.links}>
                        <NavLink to="/logowanie" className={activeBtn}>Logowanie</NavLink >
                        <a href="#">Hi, {displayUserName}</a>
                        <NavLink to="/rejestracja" className={activeBtn}>Rejestracja</NavLink>
                        <NavLink to="/zamowienia" className={activeBtn}>Zamówienia</NavLink>
                        <NavLink to="/koszyk" className={activeBtn}>Koszyk</NavLink>
                        <NavLink to="/" onClick={logout}>Wyloguj się</NavLink>
                    </span>
                    
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Headercom;