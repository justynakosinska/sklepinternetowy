import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';



const AdminOnyRoute=({children})=>{
    const userEmail=useSelector(selectEmail)

    if(userEmail=== "test@gmail.com"){
    return children;
    }
    return (
        <section style={{height:"80vh"}}>
            <div className="container">
            <h2>Brak dostępu</h2>
            <p>Tylko dla Administratora</p>
            <br/>
            <Link to='/'>
            <button className='--btn'>&larr; Powrót do strony głównej</button>
            </Link>
            </div>
        </section>
    )
    
}
export const AdminOnyLink=({children})=>{
    const userEmail=useSelector(selectEmail)

    if(userEmail=== "test@gmail.com"){
    return children;
    }
    return null
    
}

export default AdminOnyRoute