import React, { useState } from "react";
import {sliderData} from "../slider/slider-data";
import "./Slidermod.scss";


const Slidercom=()=>{
    const [currentS, setCurrentS]=useState(0); //pierwszy indeks, za każdym załadowaniem strony sklajdy rozpoczą się od początku
    return(
       <div className="slider">

        {sliderData.map((slide, index) =>{
            const {img, head, description}=slide //destrukturyzacja
            return(
                <div key={index} className={"slide current"}>
                    {index=== currentS && (
                        <React.Fragment>
                        <img src={img} alt=""/>
                        <div className="content">
                            <h2>{head}</h2>
                            <p>{description}</p>
                            <hr/>
                            <a href="#" className="btn mainBtn">Kup teraz</a>
                        </div>
                     </React.Fragment>
                    )}
                </div>
            )
        })}
       </div>)
    
    
    
}
export default Slidercom;