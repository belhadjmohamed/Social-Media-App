import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import "../styles/PostCard.css";
import { Link } from "react-router-dom";
import LikePost from "./LikePost";
import { useDispatch, useSelector } from "react-redux";
import {unlikepost, likepost, savedPost, unsavedPost} from "../redux/actions/postAction";


const PostCardFooter = ({pos}) => {
    const {auth,socket} = useSelector(state => state)
    const [isLike , setisLike] = useState(false)
    const [saved, setsaved] = useState(false)
    const [load , setload] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(pos.likes.find(like => like._id === auth.user._id )){
            setisLike(true)
        }else {
            setisLike(false)
        }
    },[pos.likes,auth.user._id])

    useEffect(()=>{
        if(auth.user.saved.find(id => id === pos._id )){
            setsaved(true)
        }else {
            setsaved(false)
        }
    },[pos._id,auth.user.saved])

    const handleLike= async() => {
        if (load) return;
        setisLike(true)
        setload(true)
        dispatch(likepost({pos,auth,socket}))
        setload(false)
    }
    const handleUnlike=async () => {
        if (load) return;
        setisLike(false)
        setload(true)
        dispatch(unlikepost({pos,auth,socket}))
        setload(false)
        
    }
    
    return (
        <div className="postcardfooter">
            <div className="postcardfootertop">
                <div className="postcardfootertopitems">
                   <span>{pos.likes.length} </span>
                    <FavoriteBorderIcon style={{color : "red"}}/>
                </div>
                <div className="postcardfootertopitems">
                <span> {pos.commentss.length}</span> 
                <CommentIcon style={{color : 'white'}}/>
                </div>
            </div>
            <div className="postcardfooterbottom">
                <div className="postcardfooterbottomitems">
                    <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    <span>Favorite</span>
                </div>
                <Link to={`/post/${pos._id}`} style={{textDecoration :'none'}}>
                <div className="postcardfooterbottomitems">
                    <CommentIcon style={{color : 'white'}}/>
                    <span>Opinion</span>
                </div>
                </Link>
                <div className="postcardfooterbottomitems">
                    {saved 
                        ? <SaveAltIcon style={{color : 'red',cursor:'pointer'}} onClick= {() => dispatch(unsavedPost({pos,auth}))}/>
                        : <SaveAltIcon style={{color : 'white',cursor:'pointer'}} onClick={()=>dispatch(savedPost({pos,auth}))} />
                    }
                    
                    <span>Save</span>
                </div>
            </div>
        </div>
    )
}

export default PostCardFooter;