import {useState} from 'react'; 
import style from './Authorisation.module.scss';
import limg from '../../resources/5140139.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../../firebaseIntegration/konfiguracja";
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from "firebase/auth";




const Logincom=()=>{

    const [email, setEmail]=useState(""); //aktualna wartość pola email to pusty string
    const [password,setPassword]=useState("");  //aktualna wartość pola hasło to pusty string

    const navigation=useNavigate();
    
    const login=(e)=>{
        e.preventDefault(); //stronie nie ulega przeładowaniu

        //logowanie za pomocą email i hasła
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Logowanie powiodło się");
          navigation("/");
         })
        .catch((error) => {
           toast.error("Logowanie nie powiodło się");
         });
    }

    //logowanie za pomocą konta Google
    
    const provider = new GoogleAuthProvider();
    const signGoogle=()=>{
        signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    toast.success("Logowanie powiodło się");
    navigation('/');
  }).catch((error) => {
    toast.error("Logowanie nie powiodło się")
  });
    }

    return(
        <section className={`container ${style.Authorisation}`}>
            <div className={style.img}>
                <img src={limg} alt="" width="400"/>

            </div>
            <div className={style.form}>
                <h1>Logowanie</h1>

                <form onSubmit={login}>
                    <input type="text" placeholder="Wprowadź swój email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Wprowadź hasło" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="btn blockBtn">Zaloguj się</button>
                    <div className={style.link}>
                         <Link to="/reset">NIe pamiętasz hasła?</Link>
                    </div>
                <p>-- lub --</p>
                </form>

                <button type="submit" className="btn mainBtn blockBtn" onClick={signGoogle}>Zaloguj się kontem Google</button>
                <span className={style.register}><p>Nie masz konta?</p>
                <Link to="/rejestracja">Zarejestruj się</Link></span>
            </div>
        </section>
    )
}
export default Logincom;