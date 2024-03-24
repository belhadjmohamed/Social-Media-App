import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import moment from 'moment';
import '../styles/Notification.css';
import {Link} from "react-router-dom";
import { deleteNotifiesAll, readnotify } from "../redux/actions/notifyActions";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

const Notifications = () => {
    const {auth,notify} = useSelector(state => state);
    const dispatch = useDispatch();
    
    const isReadNotify = (dat) => {
        console.log(dat);
        dispatch(readnotify(dat , auth))
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(item => item.isRead === false)
        if (newArr.length === 0 ) dispatch(deleteNotifiesAll(auth))

        if (window.confirm(`you have ${newArr.length} unread notifications . are you sur you want to delete them ?`)){
            dispatch(deleteNotifiesAll(auth))
        }
    }

    return(
        <div className="notificationspage" style={{backgroundColor:'rgb(162, 162, 196,0.5)',display:'flex',height: '100vh',justifyContent:'space-around',padding:'1rem', overflow:'auto'}}>
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
            <div className="notifications">
                <div className="notificationheader">
                    <h5 className="notificationheaderheading"> Notifications </h5>
                    <h5 className="notificationheaderheading"style={{cursor:'pointer'}} onClick={handleDeleteAll}> Delete All</h5>
                </div>
                {
                    notify.data.length > 0 && notify.data.map((dat,index) => (
                        <div className="notificationdata" key={index}>
                            <Link to={`${dat.url}`} style={{textDecoration:'none'}} onClick={() => isReadNotify(dat)}>
                            <div className="notifcationdata-top">
                            <img className="notifcationdata-topavatar" src={dat.user.avatar} alt=""/>   
                            <div className="notifcationdata-topsecond">
                                <h4 className="notifcationdata-topsecondhead">{dat.user.fullname} {dat.text}</h4> 
                                <h6 className="notifcationdata-topsecondheadtwo">{dat.content.slice(0,20)}</h6>
                            </div>
                            <img className="notifcationdata-topimage" src={dat.image} alt="" />
                        </div>
                        <div className="notificationdatabottom">
                            <small  className="notificationdatabottomdate">{moment(dat.createdAt).fromNow()}</small>
                            {
                                dat.isRead ? <p> o </p> : <p style={{color:'red', fontSize:'20px'}}> o </p>
                            }
                        </div>
                        </Link>
                        </div>

                    ))
                }
            </div>
            </div>
    )
}

export default Notifications;