import React from "react";
import '../styles/loading.css';

const Loading = () => {
    return(
        <div className= 'loading' style={{position : 'fixed', height : '100%' ,width : '100%',textAlign : 'center', zIndex : '100', 
        backgroundColor : '#0009', color : 'white' ,top : '0' , left:'0'}} >
            <svg width="400" height="180" xmlns="http://www.w3.org/2000/svg" >
            <circle cx="120" cy="70" r="65" width="150" height='150' stroke="white" stroke-width="5" fill="none" />
            <text className="loading-text" fill="#fff" x='4' y='147' > Loading</text>
            </svg>
           
            
        </div>
    )
}

export default Loading;