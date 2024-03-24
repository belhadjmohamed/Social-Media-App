import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";
import { NOTIFY_TYPES } from "./redux/actions/notifyActions";
import { MESS_TYPE } from "./redux/actions/messageActions"; 

const SocketioClient = () => {

    const {auth,socket} = useSelector(state => state);
    const dispatch = useDispatch();
    


    useEffect(() => {
        socket.emit('joinUser', auth.user._id)

    },[socket,auth.user._id])

    useEffect(()=> {
        socket.on('likeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
            
        });
        return ()=> socket.off('likeToClient')
    },[auth,socket, dispatch])

    useEffect(()=> {
        socket.on('unlikeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
            
        });
        return () => socket.off('unlikeToClient')
    },[auth,socket, dispatch])

    useEffect(()=> {
        socket.on('createCommentToClient', newPost=> {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
            
        });
        return () => socket.off('createCommentToClient')
    },[auth,socket, dispatch])

    useEffect(()=> {
        socket.on('deleteCommentToClient', newPost=> {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})});
        
        return () => socket.off('deleteCommentToClient')

    },[auth,socket, dispatch])


    useEffect(()=> {
        socket.on('addfriendToClient', newUser=> {
            console.log(newUser);
            dispatch({type: 'AUTH', payload: {...auth, user: newUser}})});
        
        return () => socket.off('addfriendToClient')

    },[auth,socket, dispatch])


    useEffect(()=> {
        socket.on('unfriendToClient', newUser=> {
            dispatch({type: 'AUTH', payload: {...auth, user : newUser}})});
        
        return () => socket.off('unfriendToClient')

    },[auth,socket, dispatch])

    useEffect(()=> {
        socket.on('createNotifyToClient', msg=> {
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFIES, payload: msg })});
        
        return () => socket.off('createNotifyToClient')

    },[auth,socket, dispatch])
    
    useEffect(()=> {
        socket.on('removeNotifyToClient', msg=> {
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFIES, payload: msg })});
        
        return () => socket.off('removeNotifyToClient')

    },[auth,socket, dispatch])

    useEffect(()=> {
        socket.on('addMessageToClient', msg=> {
            dispatch({type: MESS_TYPE.ADD_MESSAGE , payload: msg })});

        return () => socket.off('addMessageToClient')

    },[auth,socket, dispatch])

    return(
        <>
        </>
    )
}


export default SocketioClient;