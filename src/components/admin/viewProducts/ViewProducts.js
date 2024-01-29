import React, { useEffect, useState } from 'react';
import style from './ViewProducts.module.scss'
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import Pagination from '../../pagination/Pagination';





const ViewProducts=()=>{
    const [search,setSearch]=useState("")
    const {data,isLoading}=useFetchCollection("products")
    const products=useSelector(selectProducts)
    const filteredProducts=useSelector(selectFilteredProducts)


    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage,setProductsPerPage]=useState(9)
    const indexOfLastProduct=currentPage*productsPerPage;
    const indexOfFirstProduct=indexOfLastProduct-productsPerPage;
    const currentProducts=filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(STORE_PRODUCTS({
               products:data,
           }))  
    },[dispatch,data])
    
    useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({products,search}))
    },[dispatch,products,search])
    
const deleteProduct=async(id,imageURL)=>{
try{
    await deleteDoc(doc(db, "products", id));
    const storageRef = ref(storage, imageURL);
    await deleteObject(storageRef)
    toast.success("Produkt został usunięty")
}catch(error){
    toast.error(error.message)
}
}

    return(
        <>
        {isLoading&&<Loader/>}
        <div className={style.table}>
            <h2>Produkty</h2>

<div className={style.search}>
<p>
    <b>{filteredProducts.length}</b>produktów znalezionych
</p>
<Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
</div>

            {filteredProducts.length===0 ? (
                <p>Nie znaleziono produktów</p>
            ): (
                <table>
                    <thead>
                    <tr>
                        <th>L.p.</th>
                        <th>Zdjęcie</th>
                        <th>Nazwa</th>
                        <th>Kategoria</th>
                        <th>Cena</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    {currentProducts.map((product,index)=>{
                        const {id,name,price,imageURL,category}=product;
                        return(
                            <tbody>
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{
                                    <img src={imageURL} alt={name} style={{width:"100px"}}/>
                                    }</td>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td>{`${price} zł`}</td>
                                <td className={style.icons}>
                                    <Link to={`/administrator/dodaj-produkt/${id}`}>
                                    <FaEdit size={20} color="green"/>
                                    </Link>
                                    &nbsp;
                                    <FaTrashAlt size={18} color="red" onClick={()=>deleteProduct(id,imageURL)}/>
                                </td>
                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            )}
            <Pagination 
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
            />
        </div>
        </>
    )
}
export default ViewProducts;