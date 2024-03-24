import React, { useEffect, useState } from "react";
import PostCommentCard from "./PostCommentCard";

const PostCommentDisplay = ({comment,pos,newReply}) => {
    
    const [showRep, setshowRep] = useState([]);
    const [next , setnext] = useState(1);

    useEffect(()=> {
        setshowRep(newReply.slice(newReply.length - next))
    },[newReply, next])


    return (
        <div>
            <PostCommentCard comment={comment} pos={pos} commentId={comment._id} >
            <div>
                {
                    showRep && showRep.map((item, index)=> (
                        item.reply &&
                        <PostCommentCard key={index} comment={item} commentId={item._id} pos={pos}/>
                    ))
                }
                {
                newReply.length - next > 0 
                ? <div style={{textAlign:'center',padding:'5px 0' ,borderRadius:'10px', backgroundColor:'white',cursor:'pointer',fontWeight:'600', border:'2px solid whitesmoke' }} onClick={()=> setnext(prev=> prev + 10)}> show more comments +</div>
                : newReply.length > 1 &&
                <div style={{padding:'5px 0',textAlign:'center',backgroundColor:'white',borderRadius:'10px',cursor:'pointer',fontWeight:'600', border:'2px solid whitesmoke' }}  onClick={()=> setnext(1)}> Hide comments -</div>
                }
            </div>
            </PostCommentCard>
        </div>
    )
}

export default PostCommentDisplay;