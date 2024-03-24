import React from "react";
import GlobalShortCard from "./GlobalShortCard";
import '../styles/GlobalShortCard.css';

const ShowfriendsProfile = ({user}) => {
    return(
        <div className="showfriendsprofile">
            <div>
            <h4 style={{marginTop:'.5rem',textAlign:'center',padding:'1rem', borderBottom:'2px solid black',color:'white'}}>Friends <span style={{fontWeight:"700",color:'white'}}>{user.friends.length}</span></h4>
            </div>
            {
                user.friends.length > 0 && user.friends.map(friend => (
                    <GlobalShortCard friend={friend} key={friend._id}/>
                ))
            }
        </div>
    )
}


export default ShowfriendsProfile;