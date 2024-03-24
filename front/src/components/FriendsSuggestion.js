import React, { useEffect, useState } from "react";
import '../styles/FriendsSuggestion.css';
import { useSelector } from "react-redux";
import { getDataApi } from "../utils/fetchDataApi";
import GlobalFriendBtn from "./GlobalFriendBtn";

const FriendsSuggestion = () => {
    const auth = useSelector(state => state).auth

    const idsfollowers = auth.user.following.map(item => item._id)

    const [friendsTofollow,setfriendsTofollow] = useState([]);

    console.log(friendsTofollow)
    
    const unfollow = friendsTofollow.filter(item => (!(idsfollowers.includes(item._id)) && item._id !== auth.user._id))

    console.log(unfollow)

    useEffect( ()=> {
        async function fetchData() {
            // You can await here
            const response = await getDataApi('users',auth.token)
            
            setfriendsTofollow(response.data.users)    
          }
          fetchData();
    },[auth])

    return(
        <div className="suggestionFriends">
            <h3 style={{color:'white'}}>Follow friends :</h3>
            <h4 style={{padding:'10px',color:'white'}}>this is a list of friends you can follow if you want </h4>
            {unfollow.map(item => (
                <div key={item._id} className="suggestionFriendscards">
                    <div className="suggestionFriendsheader">
                        <img style={{width:'20%',height:'20%',marginRight:'10px', borderRadius:'10px'}} src={item.avatar} alt='img' />
                        <div> {item.fullname} </div>
                    </div>
                    <div className="suggestionFriendsbody">
                        <p> if you wonna add {item.fullname} to your following list please click this button </p>
                        <GlobalFriendBtn classbtn="suggestionfriendsbtn" user={item} />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default FriendsSuggestion;