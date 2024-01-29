import React, { useEffect, useState } from 'react';
import style from './ProductList.module.scss'
import {BsFillGridFill} from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';




const ProductList=({products})=>{
    const [grid,setGrid]=useState(true);
    const [search,setSearch]=useState("")
    const [sort,setSort]=useState("latest")
    const filteredProducts=useSelector(selectFilteredProducts)

    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage,setProductsPerPage]=useState(9)
    const indexOfLastProduct=currentPage*productsPerPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)


    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(SORT_PRODUCTS({products,sort}))
    },[dispatch,products,sort])

    useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({products,search}))
    },[dispatch,products,search])


    return(
        <div className={style["product-list"]} id="product">
            <div className={style.top}>
                <div className={style.icons}>
                    <BsFillGridFill size={22} color="brown" onClick={()=>setGrid(true)}/>
                    <FaListAlt size={24} color="brown" onClick={()=>setGrid(false)}/>
                    <p>
                        <b>{filteredProducts.length}</b> produktów
                    </p>
                </div>
                <div>
                    <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div className={style.sort}>
                    <label>Sortuj po:</label>
                    <select value={sort} onChange={(e)=> setSort(e.target.value)}>
                        <option value="latest">Ostatnio dodane</option>
                        <option value="lowest-price">Najniższej cenie</option>
                        <option value="highest-price">Najwyższej cenie</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z-A</option>

                    </select>
                </div>
            </div>

            <div className={grid ? `${style.grid}`: `${style.list}`}>
            {products.length===0 ? (
                <p>Nie znaleziono produktów</p>
            ): (
                <>
                {currentProducts.map((product)=>{
                    
                    return (
                        <div key={product.id}>
                            <ProductItem {...product} grid={grid} product={product}/>
                        </div>
                    )
                })}
                </>
            )}
            </div>
            <Pagination 
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
            />
        </div>
    )
}
export default ProductList;