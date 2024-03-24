import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ImageIcon from '@material-ui/icons/Image';

const UserCardMessage = ({children,user, handleClose,msg}) => {
    const handleCloseAll = () => {

        if(handleClose) handleClose();
    }
    return (
        <div >
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',cursor:'pointer'}}>
            <div onClick={handleCloseAll} style={{display : 'flex',padding:'10px',alignItems:'center',textDecoration:'none'}}>
            <Avatar src={user.avatar}/>
            <div style={{marginLeft:'8px', color:'black'}}>
                <span style={{display :'block'} }>{user.fullname} </span>
                <small> {user.username}</small>
                <small>{
                    msg 
                    ? <>
                    <div>{user.text}</div>
                    {
                        user.media?.length > 0 && 
                        <div style={{display:'flex' , justifyContent:'space-between', alignItems:'center'}} >
                            {user.media.length} <ImageIcon/>
                        </div>
                    }
                    </>
                    : ""
                }   </small>
            </div>
            </div>
            {children}
            </div>
        </div>
    )
}

export default UserCardMessage;