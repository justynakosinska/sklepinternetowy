import React, { useState } from 'react';
import style from './auth.module.scss';
import loginImg from '../../assets/5140139.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';


const Login =()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false);

    const previousURL=useSelector(selectPreviousURL)
    const navigate=useNavigate()

    const redirectUser=()=>{
      if(previousURL.includes("koszyk")){
        return navigate("/koszyk")
      }
      navigate("/")
    }

    

  const loginUser=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setIsLoading(false)
    toast.success("Logowanie powiodło się")
    redirectUser()
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
  });
    }

    const provider = new GoogleAuthProvider();

    const signInWithGoogle=()=>{
        signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success("Logowanie powiodło się")
    redirectUser()
  }).catch((error) => {
    toast.error(error.message)
  });
    }

return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${style.auth}`}>
        <div className={style.img}>
            <img src={loginImg} alt="Login" width="400"/>
        </div>
        <Card>
        <div className={style.form}>
            <h2>Logowanie</h2>
            
            <form onSubmit={loginUser}>
                <input type="text" placeholder="adres email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="hasło" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='--btn --btn-primary --btn-block'>Zaloguj się</button>
                <div className={style.links}>
                    <Link to="/reset">Resetuj hasło</Link>
                </div>
                <p>-- lub --</p>
            </form>
            
            <button type="submit" className='--btn --btn-danger --btn-block' onClick={signInWithGoogle}>  Zaloguj się Kontem Google</button>
            <span className={style.register}>
                <p>Nie masz jeszcze konta? </p>
                <Link to="/rejestracja"> Zarejestruj się</Link>
            </span>
        </div>
        </Card>
    </section>
    </>
)
}
export default Login;