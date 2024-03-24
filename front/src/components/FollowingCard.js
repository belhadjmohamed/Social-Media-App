import React from "react";
import GlobalCard from "./GlobalCard";

const FollowingCard = ({user}) => {
    console.log(user)
    return(
        <>
        <div style={{width : "1100px",margin: '1rem auto',maxWidth: '100%',minHeight:'20px',padding:'1rem',background : 'rgb(237, 237, 227)',borderRadius:'10px'}}>
            <h4 style={{textAlign: 'center', }}>
                {user.length} <span>Following</span>
            </h4>
        </div>
        <div style={{width : "1100px",margin: '1rem auto',maxWidth: '100%',display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
            
            {user.length > 0 && user.map(follow => (
                <GlobalCard user={follow} key={follow._id}/>
            ))}
        </div>
        </>
    )
}

export default FollowingCard;