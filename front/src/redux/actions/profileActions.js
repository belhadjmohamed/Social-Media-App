import {ALERT_TYPES} from "./alertActions";
import {getDataApi, patchDataApi,postDataApi} from '../../utils/fetchDataApi';
import { EditData,DeleteData } from "./alertActions";
import { imageupload } from "../../utils/imageupload";
import { createnotify, removenotify } from "./notifyActions";

export const PROFILE_TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER',
    FRIEND : 'FRIEND',
    UNFRIEND : 'UNFRIEND',
    GET_IDS : 'GET_IDS',
    USERPOSTS : 'USERPOSTS',
    USERLOCATION : 'USERLOCATION',
}

export const getProfileUsers = ({users, id , auth}) => async (dispatch)=> {
        try{
            if (users.length=== 0 || !users.find((user) => user._id === id)){
            dispatch({type : PROFILE_TYPES.GET_IDS , payload : id})
            dispatch({type: PROFILE_TYPES.LOADING, payload:{loading :true}});
            const res = await getDataApi(`user/${id}`,auth.token);
            const res2 = await getDataApi(`userposts/${id}`,auth.token);
            
            const user = res;
            const posts = res2;
            
        
            dispatch({
                type : PROFILE_TYPES.GET_USER,
                payload : user.data
            });
            dispatch({
                type : PROFILE_TYPES.USERPOSTS,
                payload : {...posts.data, _id : id}
            });
             dispatch({type: PROFILE_TYPES.LOADING, payload:{loading :false}});
            };
        }catch(err){
            dispatch({
                type : 'ALERT',
                payload : {
                    error : err.response.data.msg
                }
            })
        }
}


export const updateProfile = ({editData,avatar,auth}) =>async (dispatch) => {
    if (!editData.fullname) return dispatch({type :'ALERT' , payload: {error : "Add your fullname"}})
    if (editData.fullname.length > 25) return dispatch({type :'ALERT' , payload: {error : "fullname too long"}})
    if (editData.story.length> 200) return dispatch({type :'ALERT' , payload: {error : "too long story"}})

    try{
        
        let media;
        dispatch({type : "ALERT", payload: {loading : true}});
        if (avatar) media = await imageupload([avatar]);
        const res = await patchDataApi('user',{
            ...editData, 
            avatar : avatar ? media[0].secure_url : auth.user.avatar
        },auth.token)
        console.log(res);
        dispatch({
            type : 'AUTH',
            payload : {
                ...auth,
                user : {
                    ...auth.user,
                    ...editData,
                    avatar : avatar ? media[0].secure_url : auth.user.avatar
                }
            }
        })

        dispatch({type : "ALERT", payload: {loading : false}});
    
    }catch(err){
        dispatch({
            type : 'ALERT',
            payload : {
                error : err.response.data.msg
            }
        })
    }
}

export const addfriends = ({users , user , auth,socket}) => async (dispatch) =>{
    try{
        
        const res = await patchDataApi(`user/${user._id}/friends`,null,auth.token)
        socket.emit('addfriend', res.data.updateuser);

        const msg = {
            id : auth.user._id,
            text : 'added you as a friend',
            url : `/profile/${auth.user._id}`,
            recipients : [res.data.updateuser._id],
        }
        
        dispatch(createnotify({msg , auth, socket}));

        console.log(res.data.updateuser)
        console.log(res.data.updateuserauth)
    //const newUser = {...user, friends:[...user.friends, auth.user]}
        
    dispatch({
        type : 'AUTH',
        payload : {
            ...auth,
            user : res.data.updateuserauth  
            //user : {...auth.user, following : [...auth.user.following, newUser]}
        }
    })  
    
    // const auth2 = {
    //     ...auth,
    //     user : {...auth.user, following : [...auth.user.following, newUser]}
    // }

    // const newUser2 = {...user, friends:[...user.friends, auth2.user]}
    
    dispatch({
        type : PROFILE_TYPES.FRIEND,
        payload : res.data.updateuser
        // payload : newUser2
    })



    }catch(err){
        dispatch({
            type : 'ALERT',
            payload : {
                error : err.response.data.msg
            }
        })
    }
}

export const unfriends = ({users , user , auth,socket}) => async (dispatch) =>{
    const newUser = {...user, friends: DeleteData(user.friends,auth.user._id )}
    
    dispatch({
        type : 'AUTH',
        payload : {
            ...auth,
            user : {...auth.user, following :  DeleteData(auth.user.following ,  newUser._id )}
        }
    })
    
    const auth2 = {
        ...auth,
        user : {...auth.user, following :  DeleteData(auth.user.following ,  newUser._id )}
    }

    const newUser2 = {...user, friends: DeleteData(user.friends,auth2.user._id )}
    
    dispatch({
        type : PROFILE_TYPES.FRIEND,
        payload : newUser2
    })

    dispatch({
        type : PROFILE_TYPES.UNFRIEND,
        payload : newUser
    })

    try{
        const res = await patchDataApi(`user/${user._id}/unfriends`,null,auth.token)
        socket.emit('unfriend', res.data.newUser);

        const msg = {
            id : auth.user._id,
            text : 'unfriend you',
            url : `/profile/${auth.user._id}`,
            recipients : [newUser._id],
        }
        
        dispatch(removenotify({msg , auth, socket}));

    }catch(err){
        dispatch({
            type : 'ALERT',
            payload : {
                error : err.response.data.msg
            }
        })
    }
}



export const saveLocation = (auth,gsonFeatures)  => async(dispatch) => {
    
    console.log(auth,gsonFeatures)
    dispatch({type : 'AUTH' , payload : {...auth , user : {...auth.user, features: gsonFeatures}}})

    try {
        const res = await patchDataApi('saveLovation', {features : gsonFeatures}, auth.token);
        console.log(res);
    } catch (error) {
    dispatch({
        type : 'ALERT',
        payload : {
            error : error.response.data.msg
        }
    })
   }
}

export const getFeatures = (auth)  => async(dispatch) => {
    try {
        const res = await getDataApi('getLocation', auth.token);
        console.log(res);
    } catch (error) {
    dispatch({
        type : 'ALERT',
        payload : {
            error : error.response.data.msg
        }
    })
   }
}