import {imageupload} from "../../utils/imageupload";
import {getDataApi, postDataApi,patchDataApi, deleteDataApi} from '../../utils/fetchDataApi';
import { createnotify, removenotify } from "./notifyActions";




export  const POST_TYPES = {
    CREATE_POST : 'CREATE_POST',
    GET_POSTS : 'GET_POSTS',
    UPDATE_POST : 'UPDATE_POST',
    LOADING_POSTS : 'LOADING_POSTS',
    GET_POST :'GET_POST',   
    DELETE_POST : 'DELETE_POST',
}


export const createPost = ({Content, images,auth,gsonFeatures,socket}) => async (dispatch) => {
    console.log({Content, images,auth,gsonFeatures})
    if(images.length > 0 ) {
        let media = [];

        try {   
            dispatch({ type :  'ALERT' , payload : {loading : true}});
            if(images.length> 0)  media = await imageupload(images);
            
            const res = await postDataApi('posts', {Content, images: media,gsonFeatures }, auth.token);
            
            dispatch({type: POST_TYPES.CREATE_POST, payload : {...res.data.newPost, user : auth.user} });
            dispatch({ type : 'ALERT' , payload : {loading : false}});
            console.log(res);
            
            //notification 

            const msg = {
                id : res.data.newPost._id,
                text : 'added a new Post',
                url : `/post/${res.data.newPost._id}`,
                recipients : res.data.newPost.user.friends,
                content : Content,
                image : media[0].secure_url,

            }
            

            dispatch(createnotify({msg , auth, socket}));

        }catch(error){  
            dispatch({
                type: "ALERT",
                payload : {
                    error : error.response.data.msg
                }
            })
        }
    }
}

export const getPost = (token) => async (dispatch) => {

    try {   
        dispatch({type : POST_TYPES.LOADING_POSTS , payload: true})
        const res  = await getDataApi('posts',token);
        dispatch({type : POST_TYPES.GET_POSTS , payload: res.data})
        console.log(res);
        dispatch({type : POST_TYPES.LOADING_POSTS, payload: false})

    }catch(error){
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }
}

export const updatePost = ({Content, images,auth,gsonFeatures,status}) => async (dispatch) => {
    console.log({Content, images,gsonFeatures,auth})
    if(images.length > 0 ) {
        let media = [];
        const newimgUrl = images.filter(img => !img.secure_url);
        const oldimgUrl = images.filter(img => img.secure_url);
        console.log({oldimgUrl , newimgUrl});
        if (status.content === Content && newimgUrl.length === 0 && oldimgUrl.length === status.images.length && gsonFeatures.length === 0) return ;


        try {   
            dispatch({ type :  'ALERT' , payload : {loading : true}});
            
            if  (newimgUrl.length> 0)  media = await imageupload(newimgUrl);
            
            const res = await patchDataApi(`post/${status._id}`, 
            {Content, images: [...oldimgUrl, ...media] ,gsonFeatures}, auth.token);

            console.log(res);
            
            dispatch({ type : 'ALERT' , payload : {success : res.data.msg}});
            dispatch({type: POST_TYPES.UPDATE_POST, payload : res.data.post });
            dispatch({type : 'ALERT' , payload : {loading : false}})
            

         }catch(error){  
             dispatch({
                 type: "ALERT",
                 payload : {
                     error : error.response.data.msg
                 }
             })
        }

    }
}


export const likepost = ({pos,auth,socket}) => async (dispatch) => {

    const newPost = {...pos , likes: [...pos.likes , auth.user]}
    dispatch({type : POST_TYPES.UPDATE_POST , payload :  newPost})
    socket.emit('likePost', newPost)
    try {
        const res = await patchDataApi(`post/${pos._id}/like`,null,auth.token)
        

        //notification 

        const msg = {
            id : auth.user._id,
            text : 'Like the Post',
            url : `/post/${pos._id}`,
            recipients : [pos.user._id],
            content : pos.content,
            image : pos.images[0].secure_url,
        }
        
        dispatch(createnotify({msg , auth, socket}));

    } catch(error){  
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }  
}
 

export const unlikepost = ({pos,auth,socket}) => async (dispatch) => {
    const newPost = {...pos , likes: pos.likes.filter(like => like._id !== auth.user._id)}
    console.log({pos})
    console.log({newPost})
    dispatch({type : POST_TYPES.UPDATE_POST , payload :  newPost})
    socket.emit('unlikePost', newPost)
    try {
        const res = await patchDataApi(`post/${pos._id}/unlike`,null,auth.token)

        const msg = {
            id : auth.user._id,
            text : 'UnLike the Post',
            url : `/post/${pos._id}`,
            recipients : [pos.user._id],
        }
        
        dispatch(removenotify({msg , auth, socket}));
       
    } catch(error){  
        dispatch({
            type: "ALERT",
            payload : {
                error : error.response.data.msg
            }
        })
    }  

}


export const getPostOne = ({detailPost,auth,id}) => async(dispatch) => {
    if(detailPost.every(item => item._id !== id)){
        try {
            const res = await getDataApi(`post/${id}`,auth.token);
            dispatch({type : POST_TYPES.GET_POST, payload : res.data.post});
        } catch (error) {
            dispatch({
                type: "ALERT",
                payload : {
                    error : error.response.data.msg
                }
            })
        }
    }
}

export const savedPost = ({pos,auth}) => async(dispatch) => {
    if (auth.user.saved.every(item => item !== pos._id)){
    const newUser = {...auth.user, saved :[...auth.user.saved, pos._id]}
    console.log(newUser);
    dispatch({type : 'AUTH', payload:{...auth, user : newUser}})
    try {
        const res = await patchDataApi(`save/${pos._id}`,null,auth.token)
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
} 

export const unsavedPost = ({pos,auth}) => async(dispatch) => {
    const newUser = {...auth.user, saved : auth.user.saved.filter(item => item !== pos._id)}

    console.log(newUser);
    dispatch({type : 'AUTH', payload:{...auth, user : newUser}})
    try {
        const res = await patchDataApi(`unsave/${pos._id}`,null,auth.token)
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

export const deletePost = ({pos, auth,socket}) => async (dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload : pos})
    try {
        const res = await deleteDataApi(`post/${pos._id}`, auth.token)

        const msg = {
            id : pos._id,
            text : 'deleted a new Post',
            recipients : res.data.newPost.user.friends,
            url : `/post/${pos._id}`,
        }

        dispatch(removenotify({msg , auth, socket}));
    } catch (error) {
        dispatch({
            type: 'ALERT',
            payload : {
                error : error.response.data.msg
            }
        })
    }
}