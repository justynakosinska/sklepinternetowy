import React, { useState } from 'react';
import style from './auth.module.scss'
import registerImg from '../../assets/5140139.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';




const Register =()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cPassword,setCPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false);

    const navigate=useNavigate()

    const registerUser=(e)=>{
        e.preventDefault()
        if(password !== cPassword){
            toast.error("Hasła nie są takie same")
        }
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setIsLoading(false);
    toast.success("Rejestracja powiodła się")
    navigate("/logowanie")
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
  });

    }

return (
    <>

    
    {isLoading && <Loader/>}
    <section className={`container ${style.auth}`}>
        <div className={style.img}>
            <img src={registerImg} alt="Login" width="400"/>
        </div>
        <Card>
        <div className={style.form}>
            <h2>Rejestracja</h2>
            
            <form onSubmit={registerUser}>
                <input type="text" placeholder="adres email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="hasło" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type="password" placeholder="potwierdź hasło" required value={cPassword} onChange={(e)=>setCPassword(e.target.value)}/>
                <button type="submit" className='--btn --btn-primary --btn-block'>Zarejestruj się</button>
                
                
            </form>
            
            
            <span className={style.register}>
                <p>Masz konto? </p>
                <Link to="/logowanie"> Zaloguj się</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
)
}
export default Register;