import React from 'react';
import style from './Admin.module.scss';
import Navbar from '../../components/admin/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from '../../components/admin/home/Home';
import ViewProducts from '../../components/admin/viewProducts/ViewProducts';
import AddProduct from '../../components/admin/addProduct/AddProduct';
import Orders from '../../components/admin/orders/Orders';
import OrderDetails from '../../components/admin/orderDetails/OrderDetails';

const Admin=()=>{
    return (
        <div className={style.admin}>
            <div className={style.navbar}>
                <Navbar/>
            </div>
            <div className={style.content}>
                <Routes>
                    <Route path="strona-glowna" element={<Home/>}/>
                    <Route path="produkty" element={<ViewProducts/>}/>
                    <Route path="dodaj-produkt/:id" element={<AddProduct/>}/>
                    <Route path="zamowienia" element={<Orders/>}/>
                    <Route path="szczegoly-zamowienia/:id" element={<OrderDetails/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default Admin