import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Home, Contact, Login, Register, Reset, Admin} from "./pages";
import {Header, Footer} from "./components";
import AdminOnyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";






function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/kontakt" element={<Contact/>}/>
      <Route path="/logowanie" element={<Login/>}/>
      <Route path="/rejestracja" element={<Register/>}/>
      <Route path="/reset" element={<Reset/>}/>
      
      
      <Route path="/administrator/*" element={<AdminOnyRoute><Admin/></AdminOnyRoute>}/>
      
      <Route path="/szczegoly-produktu/:id" element={<ProductDetails/>}/>
      <Route path="/koszyk" element={<Cart/>}/>
      <Route path="/szczegoly-platnosci" element={<CheckoutDetails/>}/>
      <Route path="/platnosc" element={<Checkout/>}/>
      <Route path="/platnosc-powodzenie" element={<CheckoutSuccess/>}/>
      <Route path="/zamowienia" element={<OrderHistory/>}/>
      <Route path="/szczegoly-zamowienia/:id" element={<OrderDetails/>}/>
      <Route path="/ocena-produktu/:id" element={<ReviewProducts/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}
export default App;