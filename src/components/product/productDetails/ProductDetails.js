import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import style from './ProductDetails.module.scss'
import spinnerImg from '../../../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice';
import useFetchDocument from '../../../customHooks/useFetchDocument';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Card from '../../card/Card';
import StarsRating from 'react-star-rate';


const ProductDetails=()=>{
    const {id}=useParams()
    const [product,setProduct]=useState(null)
    const dispatch=useDispatch()
    const cartItems=useSelector(selectCartItems)
    const {document}=useFetchDocument("products", id)
    const {data}=useFetchCollection("reviews")
    const filteredReviews=data.filter((review)=>review.productID===id)
    const cart=cartItems.find((cart)=>cart.id===id)

    const isCartAdded=cartItems.findIndex((cart)=>{
        return cart.id===id
    })

    useEffect(()=>{
        setProduct(document)
    },[document])

    
const addToCart=(product)=>{
dispatch(ADD_TO_CART(product))
dispatch(CALCULATE_TOTAL_QUANTITY())
}
const decreaseCart=(product)=>{
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    return(
        <section>
            <div className={`container ${style.product}`}>
            <h2>Szczegóły produktu</h2>
            <div>
                <Link to="/#produkty">&larr; Powrót do produktów</Link>
            </div>
            {product===null ? (
                <img src={spinnerImg} alt="Ładowanie" style={{width:"50px"}}/>
            ) : (
                <>
                <div className={style.details}>
                    <div className={style.img}>
                        <img src={product.imageURL} alt={product.name}/>
                    </div>
                    <div className={style.content}>
                        <h3>{product.name}</h3>
                        <p className={style.price}>{`${product.price} zł`}</p>
                        <p>{product.desc}</p>

                        <div className={style.count}>
                            {isCartAdded <0 ? null : (
                                <>
                                <button className='--btn' onClick={()=>decreaseCart(product)}>-</button>
                        <p>
                            <b>{cart.cartQuantity}</b>
                        </p>
                        <button className='--btn' onClick={()=>addToCart(product)}>+</button>
                                </>
                            )}
                        
                        </div>
                        <button className='--btn --btn-danger' onClick={()=>addToCart(product)}>Dodaj do koszyka</button>
                    </div>
                </div>
                </>
            )}
            <Card cardClass={style.card}>
                <h3>Recenzje produktu</h3>
                <div>
                    {filteredReviews.length===0 ? (
                        <p>Nie ma recenzji dla tego produktu</p>
                    ):(
                        <>
                        {filteredReviews.map((item,index)=>{
                            const {rate,review,reviewDate,userName}=item
                            return(
                                <div key={index} className={style.review}>
                                    <StarsRating value={rate}/>
                                    <p>{review}</p>
                                    <span><b>{reviewDate}</b></span>
                                    <br/>
                                    <span><b>przez: {userName}</b></span>

                                </div>
                            )
                        })}
                        </>
                    )}
                </div>

            </Card>
            </div>
        </section>
    )
}

export default ProductDetails;