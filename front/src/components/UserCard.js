import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({user, handleClose}) => {
    const handleCloseAll = () => {

        if(handleClose) handleClose();
    }
    return (
        <div >
            <div>
            <Link to={`/profile/${user._id}`} onClick={handleCloseAll} style={{display : 'flex',padding:'10px',alignItems:'center',borderBottom : '3px solid blue', backgroundColor:'#1111',textDecoration:'none'}}>
            <Avatar src={user.avatar}/>
            <div style={{marginLeft:'8px', color:'black'}}>
                <span style={{display :'block'} }>{user.fullname} </span>
                <small> {user.username}</small>
            </div>
            </Link>
            </div>
        </div>
    )
}

export default UserCard;