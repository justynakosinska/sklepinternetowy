import React, { useEffect } from 'react';
import style from './Home.module.scss';
import Slider from '../../components/slider/Slider';
import AdminOnyRoute from '../../components/adminOnlyRoute/AdminOnlyRoute';
import Product from '../../components/product/Product';

const Home=()=>{
    const url=window.location.href;
    const scrollToProduct=()=>{
        if(url.includes("#produkty")){
            window.scrollTo({
                top:700,
                behavior:"smooth",
            })
            return
        }
    }
    useEffect(()=>{
    scrollToProduct()
    },[])
    return (
        <div>
            <Slider/>
            <Product/>
            
        </div>
    )
}
export default Home