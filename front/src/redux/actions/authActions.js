import {postDataApi} from '../../utils/fetchDataApi';
import {ALERT_TYPES} from './alertActions';
import valid from '../../utils/valid';
 

export const TYPES = {
    AUTH : 'AUTH'
}

export const login=(data) => async (dispatch) =>{
    
    try{
        dispatch({
            type :ALERT_TYPES.ALERT,
            payload : {
                loading :true,
            }
        })
        const res = await postDataApi('login', data);
        dispatch({
            type : TYPES.AUTH,
            payload : {
                token : res.data.access_token,
                user : res.data.user,
            }
        })
        localStorage.setItem('login',true);
        dispatch({
            type : ALERT_TYPES.ALERT,
            payload : {
                success : res.data.msg,
            }
        })
    }catch(error){
        console.log(error.response.data.msg)
        dispatch({
            type : ALERT_TYPES.ALERT,
            payload : {
                error : error.response.data.msg,
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const login = localStorage.getItem('login');
    if(login){
            dispatch({
                type : 'ALERT',
                payload : {
                    loading : true
                }
            });

        try {
            const res = await postDataApi('refresh_token');
            dispatch({
                type : TYPES.AUTH,
                payload : {
                    token : res.data.access_token,
                    user : res.data.user,
                }
            });
            dispatch({
                type : ALERT_TYPES.ALERT,
                payload : {
                    success : res.data.msg,
                }
            });
        
        }catch(error){
            dispatch({
                type : 'ALERT',
                payload : {
                    error : error.response.data.msg,
                }
            })
        
        }
    }}

export const register = (data) => (dispatch) => {
    try{
        const check = valid(data)
        console.log(check)
        if(check.errLength > 0){
            dispatch({
                type : 'ALERT',
                payload : check.errMsg
            })
        }
        dispatch({type : 'ALERT', payload : {loading : true}})

        const res = postDataApi('register',data);
        localStorage.setItem('login',true);
        dispatch({
            type : TYPES.AUTH,
            payload : {
                token : res.data.access_token,
                user : res.data.user,
            }
        })
        
        dispatch({
            type : ALERT_TYPES.ALERT,
            payload : {
                success : res.data.msg,
            }
        })       

    }catch(error){
        console.log(error)
        dispatch({
            type : "ALERT",
            payload : {
                error : error.res.data.msg
            }
        })
    }
} 

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('login');
        await postDataApi('logout');
        window.location.href = '/';
    }catch(error){
        console.log(error)
        dispatch({
            type : "ALERT",
            payload : {
                error : error.res.data.msg
            }
        })        
    }

}