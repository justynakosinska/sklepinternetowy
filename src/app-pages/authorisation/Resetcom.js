import React, { useState } from 'react';
import style from "./Authorisation.module.scss";
import limg from "../../resources/5140139.jpg";
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebaseIntegration/konfiguracja';

const Resetcom=()=>{

    const [email, setEmail]=useState("");

    const reset=(e)=>{
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
         .then(() => {
            toast.success("Sprawdź swoją skrzynkę pocztową");
         })
        .catch((error) => {
            toast.error("Nie wysłano linku resetującego")
         });
    }

    return(
        <>
        <section className={`container ${style.Authorisation}`}>
            <div className={style.img}>
                <img src={limg} alt="" width="400"/>

            </div>
            <div className={style.form}>
                <h1>Reset hasła</h1>
                <form onSubmit={reset}>
                    <input type="text" placeholder="Wprowadź swój email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button type="submit" className="btn blockBtn">Zresetuj hasło</button>
                <div className={style.links}>
                    <p>
                    <Link to="/logowanie">Zaloguj się
                    </Link> 
                    </p>
                    <p>
                    <Link to="/rejestracja">Zarejestruj się
                    </Link> 
                    </p>
                    

                </div>

                </form>
                
            </div>
        </section>
        </>
    )

}
export default Resetcom;