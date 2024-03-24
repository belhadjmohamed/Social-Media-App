import React from "react";
import GlobalShortCard from "./GlobalShortCard";
import '../styles/GlobalShortCard.css';

const ShowFollowingsProfile = ({user}) => {
    return(
        <div className="showfriendsprofile">
            <div>
            <h4 style={{marginTop:'.5rem',textAlign:'center',padding:'1rem', borderBottom:'2px solid black',color:'white'}}>Following <span style={{fontWeight:"700",color:'white'}}>{user.following.length}</span></h4>
            </div>
            {
                user.following.length > 0 && user.following.map(friend => (
                    <GlobalShortCard friend={friend} key={friend._id}/>
                ))
            }
        </div>
    )
}


export default ShowFollowingsProfile;