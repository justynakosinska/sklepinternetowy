import React, { useState } from 'react';
import style from './auth.module.scss';
import resetImg from '../../assets/5140139.jpg';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Reset =()=>{
    const [email,setEmail]=useState("");
    const [isLoading,setIsLoading]=useState(false);

const resetPassword=(e)=>{
    e.preventDefault();
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Sprawdź skrzynkę pocztową")
    setIsLoading(false)
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });
    }

return (
<>
{isLoading && <Loader/>}
<section className={`container ${style.auth}`}>
<div className={style.img}>
    <img src={resetImg} alt="Reset" width="400"/>
</div>
<Card>
<div className={style.form}>
    <h2>Resetuj hasło</h2>
    
    <form onSubmit={resetPassword}>
        <input type="text" placeholder="adres email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
       
        <button type="submit" className='--btn --btn-primary --btn-block'>Resetuj hasło</button>
        <div className={style.links}>
            <p>
            <Link to="/logowanie">Zaloguj się</Link>
            </p>
            <p>
            <Link to="/rejestracja">Zarejestruj się</Link>
            </p>
        </div>
        
    </form>
    
    
   
</div>
</Card>
</section>
</>
)
}
export default Reset;