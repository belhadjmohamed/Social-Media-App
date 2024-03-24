import React, { useEffect, useState } from "react";
import { getDataApi } from "../utils/fetchDataApi";
import SavePostCard from "./savedPostCard";
import { useDispatch } from "react-redux";

const Saved = ({UserData,auth}) => {
    const [savedPosts , setsavedPost] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=> {
        getDataApi(`savedpostget/${UserData[0]._id}`,auth.token)
        .then(res => setsavedPost(res.data.savedposts))
        .catch(err => {
            dispatch({type : 'ALERT', payload : {error : err.response.data.message}})
        })
    },[auth.token])
    console.log(savedPosts)
    
    return (
        <div style={{width : "1000px",margin: '1rem auto',maxWidth: '100%',display:'grid', gridTemplateColumns:'repeat(3,1fr)'}}>
            {savedPosts.length> 0 && savedPosts.map(post => (
                <SavePostCard savedPost = {post} key={post._id}/>
            ))}    
        </div>
    )
}

export default Saved;