import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux" ;
import CommentMenuItem from "./CommentMenuItem";
import LikePost from "./LikePost";
import { likecomment, unlikecomment, updatecomment } from "../redux/actions/commentActions";
import InputPostComment from "./InputPostComment";



const PostCommentCard = ({children,comment,pos,commentId}) => {
    const {auth} = useSelector(state=> state)
    const [content, setContent] = useState("");
    const [readMore , setreadMore] = useState(false);
    const [isLike, setisLike] = useState(false);
    const [onEdit , setonEdit] = useState(false);
    const dispatch = useDispatch();
    const [load,setload] = useState(false);
    const [onReply , setonReply] = useState(false);

    const handleLike = () => {
        if (load) return;
        setisLike(true);
        setload(true);
        dispatch(likecomment({comment,pos , auth}))
        setload(false)
    }

    const handleUnlike = () => {
        if(load) return;
        setisLike(false)
        setload(true);
        dispatch(unlikecomment({comment,pos,auth}));
        setload(false);
    }

    const handleReply = () => {
        if (onReply) return setonReply(false);
        setonReply({...comment, commentId})
        
    }
    
    const handleupdatecomment = () => {
        if (comment.content === content){
            setonEdit(false)
        }else{
            dispatch(updatecomment({comment,content,pos,auth}));
            setonEdit(false);
        }
    }

    useEffect(()=> {
        setContent(comment.content)
        if(comment.likes.find(like => like._id === auth.user._id)){
            setisLike(true)
        }

    }, [comment.content, comment.likes,auth.user._id])

    return (
        <div className="postCommentCard">
            <div className="postcommentcarduser">
                <Link to={`profile/${comment.user._id}`} style={{textDecoration:'none'}}>
                <div className="postcommentcarduserinfo">
                    <img className='postcommentcardavatar' src={comment.user.avatar} alt={comment.user.fullname} />
                    <div className="postcommentcardavatarinfo">
                        <h4 className='postcommentcardfullname'>{comment.user.fullname}</h4>
                        <h6 className='postcommentcardtime'>{moment(comment.createdAt).fromNow()}</h6>
                    </div>
                    
                </div>
                </Link>
                <div className="postcommentcarduserdropdown">
                    <CommentMenuItem auth = {auth} comment= {comment} pos = {pos} setonEdit = {setonEdit} />
                </div>
            </div>
            
            <div className='postcommentcardcommentcontent'>
                <div className='postcommentcardcommentcontentcontent'>
                    {
                        onEdit ? <textarea value={content} onChange = {(e) => setContent(e.target.value)} rows="5" placeholder="change your opinion"  style={{width : '100%', background : 'transparent', resize:'none'}}/> 
                        : 
                        <>
                    {
                        comment?.tag && comment.tag._id !== comment.user._id && 
                        <Link to={`/profile/${comment.tag._id}`} >
                          <span style={{fontSize:'14px',marginRight:'5px', color:'teal',fontWeight:'500'}}>  @{comment.tag.username} </span>
                        </Link>
                     }
                    <span>
                    {content.length < 100 ? content : readMore ? content +'..' : content.slice(0,100) + '....'}
                    </span>
                    <span>
                    {content.length > 100 &&  
                        <span style={{color:'black',cursor:'pointer'}} onClick={()=> setreadMore(!readMore)}>
                            {
                                readMore ? 'hide' : 'show'
                            }
                        </span>  
                    }    
                    </span>
                        </>
                    }

                </div>
                <div className='postcommentcardcommentcontentlikes'>
                    <p className="postcommentcardcommentcontentlikescount">{comment.likes.length}</p>
                    <FavoriteBorder style={{color:"red"}}/>
                    { onEdit ? 
                    <>
                    <p className="postcommentcardcommentcontentreply" onClick={()=> handleupdatecomment()} style={{cursor: 'pointer'}}>update</p>
                    <p className="postcommentcardcommentcontentreply" onClick={() => setonEdit(false)} style={{cursor: 'pointer'}}>cancel</p>
                    </>
                    :
                    <p className="postcommentcardcommentcontentreply" onClick={handleReply} style={{cursor: 'pointer'}}>{onReply ? 'replyopinion' :'Reply'}</p>
                    }
                    
                </div>
            </div>
            <div className="postCommentCardLikeButton">
                <LikePost isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>
            </div>
            {
                onReply && 
                <>
                <InputPostComment comment={comment} pos={pos} onReply={onReply} setonReply={setonReply}>
                    <Link to={`/profile/${onReply.user._id}`}>
                        @{onReply.user.username} : {''}
                    </Link>
                </InputPostComment>
                </>
            }
            {children}
        </div>
    )
}

export default PostCommentCard;