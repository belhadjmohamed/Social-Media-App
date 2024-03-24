import React from "react";
import FollowingCard from "./FollowingCard";

const Following = ({UserData, profile, auth, id}) => {
    return(
        <div>
            {UserData.length > 0 && UserData.map(user => (
                <FollowingCard user={user.following} key={user._id}/>
            ))}
        </div>
    )
}

export default Following;