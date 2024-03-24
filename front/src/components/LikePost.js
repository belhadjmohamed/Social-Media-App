import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';


const LikePost = ({isLike,handleLike, handleUnlike}) => {
    return(
        <div className="">
            {   
                isLike ? <FavoriteIcon onClick={handleUnlike} style={{color : 'red',cursor:'pointer'}}/>
                    : <FavoriteIcon onClick={handleLike} style={{color : 'white',cursor:'pointer'}}/>
            }
        </div>
    )
}

export default LikePost;