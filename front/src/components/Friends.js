import React from "react";
import FriendsCard from "./FriendsCard";

const Friends = ({UserData,profile,auth,id}) => {
    
    return(
        <div>
            {UserData.length > 0 && UserData.map(user => (
                <FriendsCard user={user.friends} key={user._id}/>
            ))}
        </div>
    )
}

export default Friends;