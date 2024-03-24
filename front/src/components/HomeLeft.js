import React from "react";
import {useSelector} from "react-redux";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";


const HomeLeft = ()  => {
    const {auth} = useSelector(state=> state);

    return( 
        <div style={{display:'flex',justifyContent:'center'}}>
            <div className="profileheader">
                <div className="profileheader-user">
                    <img src={auth.user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {auth.user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {auth.user.fullname}</h6>
                    <div className="usercordianteshomepagesleftsidesbar">
                    <div className="usercordianteshomepagesleftsidesbar-items">
                        <h6>{auth.user.friends.length}</h6>
                        <p>Friends</p>
                    </div>
                    <div className="usercordianteshomepagesleftsidesbar-items">
                        <h6>{auth.user.following.length}</h6>
                        <p>Following</p>
                    </div>
                    </div>
                    <div className="usercordianteshomepagesleftsidesbar-gender">
                    <PersonIcon style={{color : auth.user.gender === 'male' ? 'blue' : 'pink'}} />
                        
                    </div>
                </div>
                <div className="profileheader-items">
                    <Link to={'/'} style={{textDecoration:'none'}}>
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" >
                        <HomeIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer',color:'black'}} >Home</h6>
                    </div>
                    </Link>
                    <hr/>
                    <Link to={'/message'} style={{textDecoration:'none'}}>
                    <div className="profileheader-items-item" >
                    <IconButton >
                        <MessageIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer',color:'black'}}>Messages</h6>
                    </div>
                    </Link>
                    <hr/>
                    <Link to={'/notification'} style={{textDecoration:'none'}}>
                    <div className="profileheader-items-item">
                    <IconButton >
                        <NotificationsIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer',color:'black'}}>Notifications</h6>
                    </div>
                    </Link>
                    <hr/>
                </div>
                </div>
        </div>
    )
}

export default HomeLeft;