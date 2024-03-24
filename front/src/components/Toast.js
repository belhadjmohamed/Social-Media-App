import React from "react";

const Toast = ({msg, bgColor  , handleShow}) =>{
    return(
        <div className="toast" style={{position:'fixed',padding : '1rem',borderRadius : '5px',backgroundColor:`${bgColor}`,color:'white',top : '5px', left : '40%', zIndex : '500000', minWidth : '230px'}}>
            <div style={{display:'flex',alignItems:'center', justifyContent : 'space-between',borderBottom : '1px solid yellow',padding:'0rem .5rem'}} className="toast-header">
                <h5 style={{fontWeight: '600'}}>{msg.title}</h5>
                <p onClick={handleShow} style={{fontSize:"1.5rem",cursor:'pointer'}}> &times;</p>
            </div>
            <div style={{padding :'0rem 0.5rem'}} className="toast-body">
                <p>{msg.body}</p>
            </div>
        </div>
    );
}

export default Toast;