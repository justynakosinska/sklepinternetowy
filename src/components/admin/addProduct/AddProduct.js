import React, { useState } from 'react';
import style from './AddProduct.module.scss'
import Card from '../../card/Card';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';




const categories=[
    {id:1, name: "Portfele"},
    {id:2, name: "Torebki"},
    {id:3, name: "Rękawiczki"},
    {id:4, name: "Paski"},
]
const initialState={
    name: "",
    imageURL:"",
    price:0,
    category:"",
    brand:"",
    desc:"",
}

const AddProduct=()=>{
    const {id}=useParams()
    const products=useSelector(selectProducts)

    const productEdit=products.find((item)=>item.id===id)
    console.log(productEdit)

    const [product, setProduct]=useState(()=>{
        const newState=detectForm(id,
            {...initialState},
            productEdit
            )
            return newState;
    })

    const [uploadProgress,setUploadProgress]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
   

    function detectForm(id,f1,f2){
        if(id==="ADD"){
            return f1;
        }
        return f2;
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setProduct({...product, [name]:value})
    }

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)
   
  }, 
  (error) => {
    toast.error(error.message)
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     setProduct({...product,imageURL:downloadURL})
     toast.success("Zdjęcie załadowane")
    });
  }
);

    }

   
 
    const addProduct=(e)=>{
        e.preventDefault()
        setIsLoading(true)

        try{
            const docRef = addDoc(collection(db, "products"), {
                name: product.name,
                imageURL:product.imageURL,
                price:Number(product.price),
                category:product.category,
                brand:product.brand,
                desc:product.desc,
                createdAt:Timestamp.now().toDate()
              });
              setIsLoading(false)
              setUploadProgress(0)
              setProduct({...initialState})
              toast.success("Produkt dodany")
              navigate("/administrator/produkty")
        }catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
    }
    const editProduct=(e)=>{
        e.preventDefault();
        setIsLoading(true)

        if(product.imageURL !==productEdit.imageURL){
            const storageRef = ref(storage, productEdit.imageURL);
            deleteObject(storageRef)
        }
        try{
            setDoc(doc(db, "products", id), {
                name: product.name,
                imageURL:product.imageURL,
                price:Number(product.price),
                category:product.category,
                brand:product.brand,
                desc:product.desc,
                createdAt:productEdit.createdAt,
                editedAt:Timestamp.now().toDate()
              });
              setIsLoading(false)
              toast.success("Edytowanie produktu zakończone")
              navigate("/administrator/produkty")
        }catch(error){
            setIsLoading(false);
            toast.error(error.message)
        }
    }
    
    function detectForm(id,f1,f2){
        if(id==="ADD"){
            return f1;
        }
        return f2;
    }
    return(
        <>
        {isLoading&&<Loader/>}
        <div className={style.product}>

            <h2>{detectForm(id,"Dodaj nowy produkt", "Edytuj produkt")}</h2>
            <Card cardClass={style.card}>
                
                <form onSubmit={detectForm(id,addProduct,editProduct)}>
                <label>Nazwa prroduktu:</label>
                <input type="text" placeholder="Nazwa produktu" required name="name" value={product.name} onChange={(e)=>handleInputChange(e)}/>
                <label>Zdjęcie produktu:</label>
                <Card cardClass={style.group}>
                {uploadProgress===0 ? null : (
                    <div className={style.progress}>
                    <div className={style["progress-bar"]} style={{width:`${uploadProgress}%`}}>
                        {uploadProgress<100 ? `Ładowanie ${uploadProgress}%` : `Ładowanie zakończone ${uploadProgress}%`}
                    </div>
                </div>
                    )}
                    

                <input type="file" accept="image/*" placeholder="Zdjęcie produktu" name="image" onChange={(e)=>handleImageChange(e)}/>
                {product.imageURL==="" ? null :(
                    <input type="text" /*required*/ name="imageURL" value={product.imageURL} disabled/>

                )}
                
                </Card>
                <label>Cena produktu:</label>
                <input type="number" placeholder="Cena produktu" required name="price" value={product.price} onChange={(e)=>handleInputChange(e)}/>
                <label>Kategoria produktu:</label>
               <select required name="category" value={product.category} onChange={(e)=>handleInputChange(e)}>
                <option value="" disabled>
                -- Wybierz kategorię produktu --
                </option>
                {categories.map((cat)=>{
                    return(
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                    )
                })}
               </select>
               <label>Producent:</label>
               <input type="text" placeholder="producent" required name="brand" value={product.brand} onChange={(e)=>handleInputChange(e)}/>
               <label>Opis produktu:</label>
               <textarea name="desc" required value={product.desc} onChange={(e)=>handleInputChange(e)} cols="30" rows="10"></textarea>
               <button className='--btn --btn-primary'>{detectForm(id,"Zapisz produkt","Edytuj produkt")}</button>
                </form>
            </Card>
            
            </div>
            </>
    )
}
export default AddProduct;