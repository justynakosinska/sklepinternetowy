import {useState} from "react";
import React from 'react';
import style from "./Authorisation.module.scss";
import limg from "../../resources/5140139.jpg";
import { Link, useNavigate } from 'react-router-dom';

  import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebaseIntegration/konfiguracja";
import { toast } from "react-toastify";

 





const Registercom=()=>{
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");    
    const [confirmP, setconfirmP]=useState("");

    const navigation=useNavigate();

const register=(e)=>{
e.preventDefault(); ////strona nie ulega przeładowaniu
if(password!==confirmP){
    toast.error('Hasła nie są identyczne')
}

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    toast.success("Rejestracja powiodła się");
    navigation("/logowanie");
  })
  .catch((error) => {
    toast.error(error.message);
  });

}
    return(
        <>
    <section className={`container ${style.Authorisation}`}>

    <div className={style.form}>
        <h1>Rejestracja</h1>
        <form onSubmit={register}>
            <input type="text" placeholder="Wprowadź swój email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Wprowadź hasło" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder="Potwierdź hasło" required value={confirmP} onChange={(e)=>setconfirmP(e.target.value)}/>
            <button type="submit" className="btn blockBtn">Zarejestruj się</button>
       
      
        </form>
        <span className={style.register}><p>Masz już konto?</p>
        <Link to="/logowanie">Zaloguj się</Link></span>
    </div>
    <div className={style.img}>
        <img src={limg} alt="" width="400"/>

    </div>
</section>
</>
    )
}

export default Registercom;