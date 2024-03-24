import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfriends , unfriends} from "../redux/actions/profileActions";


const GlobalFriendBtn = ({classbtn,user}) => {
    const {auth , profile,socket} = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [friend,setFriend] = useState(false);
    
    const removefriend = () => {
        setFriend(false)
        dispatch(unfriends({users : profile.users,user ,auth,socket}))
    }

    useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFriend(true);

        }
    },[auth.user.following,  user._id ])

    const addfriend = () => {
        setFriend(true)
        dispatch(addfriends({users : profile.users, user , auth,socket}))
    }
    return (
        <>
        {
            friend ?
            <button className={classbtn} onClick={removefriend} style={{backgroundColor:'red'}}> UnFriend </button> :
            <button className={classbtn} onClick={addfriend}> Add Friend </button>
        }
        </>
    )
}

export default GlobalFriendBtn;