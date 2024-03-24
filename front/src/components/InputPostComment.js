import React, { useState } from "react";
import '../styles/Commentstyle.css';
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../redux/actions/commentActions";


const InputPostComment = ({children,pos,comment,onReply, setonReply}) => {
    const [content,setContent] = useState('');
    const {auth,socket} = useSelector(state => state)
    const dispatch = useDispatch();  
   

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!content.trim()){
            if (onReply) return setonReply(false);
            return;
        } 

        const newComment = {
            content,
            likes : [],
            user : auth.user,
            createdAt : new Date().toISOString(),
            reply : onReply && onReply.commentId,
            tag : onReply && onReply.user,
        }
        
        console.log(newComment)

        dispatch(createComment({pos , newComment, auth,socket}))
            if (onReply) return setonReply(false);
            setContent('')
    }

    
    return (
        <div className="inputpostcomments">
            <div className="inputpostcomments-left">
                <img src={auth.user.avatar} alt="" />
            </div>
            {children}
            <input className="inputpostcomments-input" type="text" placeholder="put your opinion" value={content} onChange={(e) => {setContent(e.target.value)}} />
            
            <button className="inputpostcomments-button" onClick={handleSubmit}> comment </button>
        </div>
    )
}

export default InputPostComment;