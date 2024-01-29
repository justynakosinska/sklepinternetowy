import React, { useEffect, useState } from 'react';
import style from './Product.module.scss'
import ProductFilter from './productFilter/ProductFilter';
import ProductList from './productList/ProductList';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice';
import spinnerImg from '../../assets/spinner.jpg'
import { FaCogs } from 'react-icons/fa';

 

const Product=()=>{
    const {data,isLoading}=useFetchCollection("products")
    const [showFilter,setShowFilter]=useState(false)
    const products=useSelector(selectProducts)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(STORE_PRODUCTS({
               products:data,
           })) 
           dispatch(GET_PRICE_RANGE({
            products:data})) 
    },[dispatch,data])

    const toggleFilter=()=>{
        setShowFilter(!showFilter)
    }

    return(
        <section>
            <div className={`container ${style.product}`}>
                <aside className={showFilter ? `${style.filter} ${style.show}` : `${style.filter}`}>
                    {isLoading ? null : <ProductFilter/>}
                
                </aside>
                <div className={style.content}>
                    {isLoading ? (<img src={spinnerImg} alt="Ładowanie..." style={{width:"50px"}} className='--center-all'/>): (<ProductList products={products}/>)}
                    <div className={style.icon} onClick={toggleFilter}>
                        <FaCogs size={20} color="brown"/>
                        <p>
                            <b>{showFilter ? "Schowaj filtr" : "Pokaż filtr"}</b>
                        </p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
export default Product;