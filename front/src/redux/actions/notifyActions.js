import {getDataApi, postDataApi,patchDataApi, deleteDataApi} from '../../utils/fetchDataApi';

export const NOTIFY_TYPES = {
    GET_NOTIFIES : 'GET_NOTIFIES',
    CREATE_NOTIFIES : 'CREATE_NOTIFIES',
    REMOVE_NOTIFIES : 'REMOVE_NOTIFIES',
    UPDATE_NOTIFIES : 'UPDATE_NOTIFIES',
    DELETE_NOTIFIES : "DELETE_NOTIFIES",
}


export const createnotify = ({msg,auth,socket}) => async(dispatch) => {
    try {
        const res = await postDataApi('notify',msg, auth.token)
        socket.emit('createNotify', {
            ...res.data.notify,
            user : {
                username : auth.user.username,
                avatar : auth.user.avatar
            }
        });
        
    } catch (error) {
        dispatch({type : 'ALERT', payload : {error : "Do not"} })
    }
}


export const removenotify = ({msg,auth,socket}) => async(dispatch) => {
    try {
        const res = await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, auth.token)
        socket.emit('removeNotify', res.data.notify)
        
    } catch (error) {
        dispatch({type : 'ALERT', payload : {error : "Do not"} })
    }
}

export const getnotify = (auth) => async(dispatch) => {
    try {
        const res = await getDataApi('notifies', auth.token)
        dispatch({type : NOTIFY_TYPES.GET_NOTIFIES , payload : res.data.notifies})
        
    } catch (error) {
        dispatch({type : 'ALERT', payload : {error : "Do not"} })
    }
}


export const readnotify = (dat, auth) => async (dispatch) => {
    dispatch({type : NOTIFY_TYPES.UPDATE_NOTIFIES , payload : {...dat, isRead : true}})
    try {
        const res = await patchDataApi(`isreadnotify/${dat._id}`,null,auth.token )
    } catch (error) {
        dispatch({type : 'ALERT', payload : {error : "Do not"} })
    }
} 

export const deleteNotifiesAll = (auth) => async (dispatch) => {
    dispatch({type : NOTIFY_TYPES.DELETE_NOTIFIES , payload : []})
    try {
        const res = await deleteDataApi('deleteallnotify',auth.token)
    } catch (error) {
        dispatch({type : 'ALERT', payload : {error : "Do not"} })
    }
} 