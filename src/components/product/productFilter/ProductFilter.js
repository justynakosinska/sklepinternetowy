import React, { useEffect, useState } from 'react';
import style from './ProductFilter.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice';
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE, selectFilteredProducts } from '../../../redux/slice/filterSlice';



const ProductFilter=()=>{
    const [category, setCategory]=useState("Wszystkie")
    const [brand, setBrand]=useState("Wszystkie")
    const [price, setPrice]=useState(3000)
    const products=useSelector(selectProducts)
    const minPrice=useSelector(selectMinPrice)
    const maxPrice=useSelector(selectMaxPrice)

    const dispatch=useDispatch()

    const allCategories=[
        "Wszystkie",
        ...new Set(products.map((product)=>product.category))

    ]
    
    const allBrands=[
        "Wszystkie",
        ...new Set(products.map((product)=>product.brand))

    ]

    useEffect(()=>{
        dispatch(FILTER_BY_BRAND({products,brand}))
    },[dispatch,products,brand])

    useEffect(()=>{
        dispatch(FILTER_BY_PRICE({products,price}))
    },[dispatch,products,price])

    const filterProducts=(cat)=>{
        setCategory(cat)
        dispatch(FILTER_BY_CATEGORY({products,category:cat}))
    }
    const clearFilters=()=>{
        setCategory("Wszystkie")
        setBrand("Wszystkie")
        setPrice(maxPrice)
    }
    
    return(
        <div className={style.filter}>
            <h4>Kategorie</h4>
            
            <div className={style.category}>
                {allCategories.map((cat, index)=>{
                    return(
                        <button key={index} type="button" className={
                            `${category}`===cat ? `${style.active}`: null
                        } onClick={()=>filterProducts(cat)}>{cat}</button>
                    )
                })}
                
            </div>
            <h4>Producent</h4>
            <div className={style.brand}>
                <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
                    {allBrands.map((brand,index)=>{
                        return (
                            <option key={index} value={brand}>{brand}</option>
                        )
                    })}
                    
                </select>
                <h4>Cena</h4>
                <p>{`${price} zł`}</p>
                <div className={style.price}>
                    <input type="range" value={price} onChange={(e)=>setPrice(e.target.value)} min={minPrice} max={maxPrice}/>
                </div>
                <br/>
                <button className='--btn --btn-danger' onClick={clearFilters}>Wyczyść filter</button>
            </div>
        </div>
    )
}
export default ProductFilter;