import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import UserCardMessage from "./UserCardMessage";
import {getDataApi} from '../utils/fetchDataApi';
import { AddUser, getconversations } from "../redux/actions/messageActions";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const LeftSideMessage = () => {
    const [search,setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const {auth,message} = useSelector(state => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(message.firstload) return ; 
        dispatch(getconversations(auth))
    },[dispatch,auth,message.firstload])

    const handleSearch = async(e) => {
        e.preventDefault();
        if (!search) return  ;

        try {
            setLoad(true);
            const res = await getDataApi(`search?username=${search}`,auth.token);
            setSearchUser(res.data.users);
            setLoad(false);

        }catch(err){
            dispatch({
                type : 'ALERT',
                payload : {
                    error : err.response.data.msg
                }
            })
        }
    }

    const handleAddChat = (user) => {
        setSearch('');
        setSearchUser([]);
        dispatch(AddUser({user, message}))
        navigate(`/message/${user._id}`)
    }
    
    
    return(
        <div className="leftsidecontent" >
                <div className="leftsidecontentsearch">
                    <input className="leftsidecontentsearchinput" type="text" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="find user"/>
                    <button className="leftsidecontentsearchbutton" onClick={handleSearch}> Search </button>
                </div>
                {

                }
                <div className="leftsidecontentuserlist">
                {
                    searchUser.length !== 0 
                    ? <>
                    {
                        searchUser.map((user,index) => (
                            <div onClick={() => handleAddChat(user)}  key={index}>
                            <UserCardMessage user={user} />
                            </div>
                        ))
                    }
                    </> 
                    :
                    <>
                    {
                        message.users.length > 0 && message.users.map((user,index) => (
                            <div onClick={() => handleAddChat(user)}  key={index}>
                            <UserCardMessage user={user} msg={true}>
                                <FiberManualRecordIcon/>
                            </UserCardMessage>
                            </div>
                        ))
                    }
                    </>
                }
                </div>
        </div>
    )
}

export default LeftSideMessage;