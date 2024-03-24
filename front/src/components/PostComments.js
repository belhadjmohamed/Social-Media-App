import React, { useEffect, useState } from "react";
import PostCommentDisplay from "./PostCommentDisplay";

const PostComments = ({pos}) => {
    const [comments, setComments] = useState([]);
    const [showcomments , setshowcomments] = useState([]);
    const [next , setnext] = useState(2);
    const [ReplyComments, setReplyComments] = useState([]) ;

    useEffect(() => {
        const ncm = pos.commentss.filter(cm => !cm.reply);
        setComments(ncm);
        setshowcomments(ncm.slice(ncm.length - next));
    }, [pos.commentss, next])

    useEffect(() => {
        const newRpl = pos.commentss.filter(cm => cm.reply);
        setReplyComments(newRpl);
    }, [pos.commentss])


    return (
        <div>
            {
                showcomments && showcomments.map(comment => (
                    <PostCommentDisplay comment = {comment} pos = {pos} key={comment._id} newReply = {ReplyComments.filter(item => item.reply === comment._id)}/>
                ))
            }
            {
                comments.length - next >0 
                ? <div style={{textAlign:'center',padding:'5px 0' ,borderRadius:'10px', backgroundColor:'white',cursor:'pointer',fontWeight:'600', border:'2px solid whitesmoke' }} onClick={()=> setnext(prev=> prev + 10)}> show more comments +</div>
                : comments.length > 2 &&
                <div style={{padding:'5px 0',textAlign:'center',backgroundColor:'white',borderRadius:'10px',cursor:'pointer',fontWeight:'600', border:'2px solid whitesmoke' }}  onClick={()=> setnext(2)}> Hide comments -</div>
            }
        </div>
    )
}

export default PostComments;