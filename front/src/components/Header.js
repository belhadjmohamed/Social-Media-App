import React, { useState } from "react";
import '../styles/Header.css' ;
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from "@material-ui/icons/Home";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch , useSelector} from "react-redux";
import { logout } from "../redux/actions/authActions";
import {Link, useLocation} from 'react-router-dom';
import {getDataApi} from '../utils/fetchDataApi';
import UserCard from "./UserCard";
import LoadIcon from "../images/loading.gif"



const Header = () => {
    const [users,setUsers] = useState([]);
    const [search , setSearch] = useState('');
    const [load,setLoad] = useState(false);

    const dispatch = useDispatch();
    const {auth,notify} = useSelector(state => state);
    const {pathname} = useLocation();

    // useEffect(()=>{
    //     if (search && auth.token){
    //         setLoad(true);
    //         getDataApi(`search?username=${search}`,auth.token)
    //         .then(res => {
    //             setUsers(res.data.users);
    //             setLoad(false);
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type : 'ALERT',
    //                 payload : {
    //                     error : err.response.data.msg
    //                 }
    //             })
    //         })
    //     }else {
    //         setUsers([])
    //     }
    // },[search,auth.token,dispatch])

    const handleClose = () =>{
        setSearch('');
        setUsers([]);
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        if (!search) return  ;

        try {
            setLoad(true);
            const res = await getDataApi(`search?username=${search}`,auth.token);
            setUsers(res.data.users);
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
    const handlesubmit = (e) => {
        e.preventDefault();
        const getid = document.getElementById('searchuserbuttonheader');
        getid.click();
    }

    const isActive = (pn) =>{
        if (pn === pathname) return 'active';
    }
    return(
        <div className="header">
            <div className="Header-left">
            <Link style={{textDecoration:'none'}} to={`/profile/${auth.user._id}`}><div className="header-left-avatar">
                <Avatar src={auth.user.avatar}/>
                <h4 style={{color:'white'}}>{auth.user.fullname}</h4>
            </div></Link>
            <Link to='/'>
            <IconButton>
                <HomeIcon className={`${isActive('/')}`}/>    
            </IconButton>
            </Link>
            <Link to='/message'>
            <IconButton>
                <MessageIcon className={`${isActive('/message')}`}/>    
            </IconButton>
            </Link>


            </div>
            <form className="Header-center" onSubmit={handleSearch}>
                <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <SearchIcon onClick={handlesubmit} style={{opacity : users.length>0 ? '0':'1', cursor :'pointer'}}/> 
                <span className="header-centersearchclose" onClick={handleClose} style={{opacity : users.length>0 ? '1':'0'}}>&times;</span>
                <button id= 'searchuserbuttonheader' type="submit"  style={{display:'none'}}> Submit </button>

                <div className="header-searchuser">
                {load && <img src={LoadIcon} alt="" style={{width:'48px',height:'48px'}}/>}
                {
                search && users.length > 0 && users.map(user => (
                    <UserCard user = {user} key ={user._id} handleClose = {handleClose} />
                ))
                }
                </div>
                

    
            </form>
            <div className="Header-right">
                <h3>My Social media network site</h3>
                <Link to='/notification'>
                <IconButton>
                    <NotificationsIcon className={`${isActive('/notification')}`}/>    
                </IconButton>
                <span style={{position:'absolute',transform:'translateX(-18px)',color:'white',fontSize:'0.80rem'}}>{notify && notify.data.length}</span>
                </Link>
                <IconButton onClick={() => dispatch(logout())}>
                    <ExitToAppIcon/>    
                </IconButton>
            </div>
        </div>
    )
}

export default Header;