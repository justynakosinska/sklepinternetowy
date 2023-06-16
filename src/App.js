import { BrowserRouter, Route, Routes } from "react-router-dom";

// komponenty, które będą na wszystkich podstronach
import {Headercom, Footercom, } from "./components/index";
//strony
import {Homecom, Contactcom, Logincom, Registercom, Resetcom} from "./app-pages/index";
//powiadomienia
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
     <BrowserRouter> 
     <ToastContainer/>
     <Headercom/>
        <Routes>
          <Route path="/" element={<Homecom/>}/>
          <Route path="/kontakt" element={<Contactcom/>}/>
          <Route path="/logowanie" element={<Logincom/>}/>
          <Route path="/rejestracja" element={<Registercom/>}/>
          <Route path="/reset" element={<Resetcom/>}/>
        </Routes>
     <Footercom/>
     </BrowserRouter>
    </>
  );
}

export default App;
