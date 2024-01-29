import React from 'react';
import style from './ProductItem.module.scss'
import Card from '../../card/Card';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/slice/cartSlice';


const ProductItem=({product,grid,id,name,price,desc,imageURL})=>{

const dispatch=useDispatch()
    const shortenText=(text,n)=>{
        if(text.length > n){
            const shortenedText=text.substring(0,n).concat("...")
            return shortenedText
        }
        return text
    }

    const addToCart=(product)=>{
        dispatch(ADD_TO_CART(product))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }

    return(
        <Card cardClass={grid ? `${style.grid}`: `${style.list}`}>
            <Link to={`/szczegoly-produktu/${id}`}>
            <div className={style.img}>
                <img src={imageURL} alt={name}/>
            </div>
            </Link>
            <div className={style.content}>
                <div className={style.details}>
                    <p>{`${price} zł`}</p>
                    <h4>{shortenText(name,18)}</h4>
                </div>
                {!grid && <p className={style.desc}>{shortenText(desc,200)}</p>}
                <button className='--btn --btn-danger' onClick={()=>addToCart(product)}>Dodaj do koszyka</button>
            </div>
        </Card>
    )
}
export default ProductItem;