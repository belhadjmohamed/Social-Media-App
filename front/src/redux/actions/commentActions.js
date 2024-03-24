import { deleteDataApi, patchDataApi, postDataApi } from "../../utils/fetchDataApi";
import { POST_TYPES } from "./postAction";
import {DeleteData, EditData} from './alertActions';
import { createnotify, removenotify } from "./notifyActions";




export const createComment = ({pos, newComment,auth, socket}) => async (dispatch) => {
    console.log({pos, newComment,auth})
    const newPost = {...pos , commentss : [...pos.commentss, newComment]}
    
    dispatch({type : POST_TYPES.UPDATE_POST, payload : newPost}) 
    try {
        const data = {...newComment, postId : pos._id, postUserId : pos.user._id};
        const res = await postDataApi('comment',data, auth.token);

        const newData = {...res.data.newComment, user: auth.user}

        const newPost = {...pos, commentss : [...pos.commentss, newData]}

        dispatch({type : POST_TYPES.UPDATE_POST, payload : newPost})

        socket.emit('createComment', newPost)

        const msg = {
            id : res.data.newComment._id,
            text : newComment.reply ? 'mentioned you in comment' : 'comment on the post',
            url : `/post/${pos._id}`,
            recipients : newComment.reply ? [newComment.tag._id] : [pos.user._id],
            content : pos.content,
            image : pos.images[0].secure_url,
        }
        
        dispatch(createnotify({msg , auth, socket}));
        
    } catch (error) {  
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }
}


export const updatecomment = ({comment,content,pos,auth}) => async (dispatch) => {
    const newComment = EditData(pos.commentss, comment._id, {...comment, content})
    console.log(newComment)
    dispatch({type : POST_TYPES.UPDATE_POST, payload: newComment})
    try {
        const res = await patchDataApi(`comment/${comment._id}`,{content},auth.token)
    }catch(error){
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })  
    }
}


export const likecomment = ({comment,pos,auth}) => async (dispatch) => {
    const newComment = {...comment,likes : [...comment.likes, auth.user]}
    const newComments = EditData(pos.commentss,comment._id,newComment)
    const newPost = {...pos, commentss : newComments }
    dispatch({type: POST_TYPES.UPDATE_POST, payload : newPost})
    try {
        const res = await patchDataApi(`comment/${comment._id}/like`,null,auth.token)
        console.log(res)
    } catch (error) {
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }

}

export const unlikecomment = ({comment,pos,auth}) => async (dispatch) => {
    const newComment = {...comment,likes : DeleteData(comment.likes, auth.user._id)}

    const newComments = EditData(pos.commentss,comment._id,newComment)

    const newPost = {...pos, commentss : newComments }

    dispatch({type: POST_TYPES.UPDATE_POST, payload : newPost})

    try {
        const res = await patchDataApi(`comment/${comment._id}/unlike`,null,auth.token)
        console.log(res)
    } catch (error) {
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }
}

export const deleteComment = ({comment,pos,auth,socket}) => async (dispatch) => {
    console.log({comment,pos,auth})
    const deleteArr = [...pos.commentss.filter(cm => cm.reply === comment._id), comment]
    const newPost = {
        ...pos,
        commentss : pos.commentss.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }
    dispatch({type : POST_TYPES.UPDATE_POST, payload : newPost})

    try {
        deleteArr.forEach(item => {
            deleteDataApi(`comment/${item._id}`, auth.token)
            const msg = {
                id : item._id,
                text : comment.reply ? 'mentioned you in comment' : 'comment on the post',
                url : `/post/${pos._id}`,
                recipients : comment.reply ? [comment.tag._id] : [pos.user._id],
            }
            
            dispatch(removenotify({msg , auth, socket}));
            
        })
        
        socket.emit('deleteComment', newPost)

    } catch (error) {
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }
}



