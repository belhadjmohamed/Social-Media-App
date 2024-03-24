import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { deleteComment } from "../redux/actions/commentActions";


const CommentMenuItem = ({auth,comment,pos,setonEdit}) => {
    const {socket} = useSelector(state => state);
    const [Menuitem , setmenuitem] = useState(false);
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(deleteComment({comment,pos,auth,socket}))
    }

    const handleeditcomment = () => {
        setonEdit(true)
        setmenuitem(false);
    }

    const MenuItem = () => {
        
        return (
            <>
            <div className="CommentMenuItemlist">
                <h6 className="CommentMenuItemedit" onClick={handleeditcomment} style={{cursor: 'pointer'}}>Edit</h6>
                <h6 className="CommentMenuItemdelete" style={{cursor: 'pointer'}} onClick={handleRemove}>Remove</h6>
            </div>
            </>
        )
    }

    return (
        <div className="CommentMenuItem">
            {
                (pos.user._id === auth.user._id || comment.user._id === auth.user._id) &&  
                <div className="CommentMenuItem" style={{cursor : 'pointer'}} onClick={() => setmenuitem(!Menuitem)} >
                    ooo
                </div>
            }
            {
                Menuitem ? ( pos.user._id === auth.user.id ? comment.user._id === auth.user._id
                ? MenuItem() : <h6 className="CommentMenuItemdelete" style={{cursor:'pointer'}} onClick={handleRemove}>Remove</h6> 
                : comment.user._id === auth.user._id && MenuItem() 
                ) : ""
            }
        </div>
    )
}


export default CommentMenuItem;