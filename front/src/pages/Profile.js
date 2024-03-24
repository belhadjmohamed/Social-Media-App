import React from "react";
import "../styles/Profile.css";
import Posts from "../components/Posts";
import Info from "../components/info";
import About from "../components/About";
import {useState,useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../redux/actions/profileActions";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from  '@material-ui/icons/PersonAdd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from  '@material-ui/icons/People';
import BookmarksIcon from  '@material-ui/icons/Bookmarks';
import Friends from "../components/Friends";
import Following from "../components/Following";
import OneUserPosts from "../components/OneUserPosts";
import Saved from "../components/Saved";
import ProfilePhotoShow from "../components/ProfilePhotoShow";
import ProfileVideoShow from "../components/ProfileVideoShow";
import ShowfriendsProfile from "../components/ShowfriendsProfile";
import ShowFollowingsProfile from "../components/ShowFollowingsProfile";
import LocationForm from "../components/LocationForm";
import Edit from '@material-ui/icons/Edit';
import EditProfile from "../components/EditProfile";


const Profile  = () => {
    const [onEdit, SetonEdit] = useState(false);
    const [UserData,setUserData] =useState([]);
    const [UserPosts,setUserPosts] = useState([]);
    const [showaccount, setshowaccount] = useState(true);
    const [showfriends,setshowfriends] = useState(false);
    const [showfollowing, setshowfollowing] = useState(false);
    const [showsaved , setshowsaved] = useState(false);
    const [showlocation,setshowlocation] = useState(false);


    const handletoggle = (ht) => {
       
        if(ht === 'showaccount'){
            setshowsaved(false);
            setshowfriends(false);
            setshowfollowing(false);
            setshowlocation(false);
            setshowaccount(true);
        }else if(ht === 'showfriends'){
            setshowsaved(false);
            setshowfriends(true);
            setshowfollowing(false);
            setshowaccount(false);
            setshowlocation(false);
        }else if(ht === 'showfollowing'){
            setshowsaved(false);
            setshowfriends(false);
            setshowfollowing(true);
            setshowaccount(false);
            setshowaccount(false);
        }else if(ht === 'showsaved'){
            setshowsaved(true);
            setshowfriends(false);
            setshowfollowing(false);
            setshowaccount(false);
            setshowlocation(false);
        }else if (ht === 'showlocation'){
            setshowsaved(false);
            setshowfriends(false);
            setshowfollowing(false);
            setshowaccount(false);
            setshowlocation(true);
        }
    }

    const {id} = useParams();
    const dispatch =  useDispatch();
    const {auth,profile} = useSelector(state => state);
    


    useEffect(() => {
        if(auth && auth.user&& id === auth.user._id){
            setUserData([auth.user]);
            dispatch(getProfileUsers({users: profile.users, id ,auth}));
            const newPosts = profile.userposts.forEach(item => {
                if(item._id === id) {
                    setUserPosts(item.posts);
                }
            });
        }else{
            dispatch(getProfileUsers({users: profile.users, id ,auth}));
            const newData = profile.users.filter(user=>user._id === id );
            setUserData(newData);
            const newPosts = profile.userposts.forEach(item => {
                if(item._id === id) {
                    setUserPosts(item.posts);
                }
            });
            
        };
    },[id,auth,profile.users,profile.userposts,dispatch]);

    const [photos, setphotos] = useState([])
    
    useEffect(() => {
        const newimages = UserPosts.map(item => (item.images) ? item.images : '')
        setphotos(newimages)
    },[UserPosts])
    
    return(
        <div className="profile" style={{backgroundColor:'rgb(162, 162, 196,0.5)',display:'flex',flexDirection:'column'}}>
            <Info UserPosts={UserPosts} UserData = {UserData} profile={profile} auth={auth} id={id} /> 
            {showaccount &&
            <div className="profilebody">
            <div className="profileheader">
                <div className="profileheader-user">
                    {UserData.map(user => (<>
                    <img src={user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {user.fullname}</h6></>
                    ))}
                </div>
                <div className="profileheader-items">
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" onClick={() => handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showaccount')}>User profile</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item" >
                    <IconButton onClick={() => handletoggle('showlocation')}>
                        <LocationOnIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showlocation')}>Localisation</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfriends')}>Friends</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfollowing')}>Following</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showsaved')}>Saved</h6>
                    </div>
                </div>
                
                {auth.user._id === id &&<div style={{fontSize:'1rem',alignItems:'center', justifyContent:'center', margin :'10px 0',display:'flex',cursor:'pointer'}} onClick={()=>SetonEdit(true)}>
                <Edit/>
                 <p style={{marginLeft:'5px'}}>Edit profile</p> 
                 </div>}
                </div>
                <div className="profilebodycenter">
                    <OneUserPosts UserPosts={UserPosts} profile={profile} auth={auth} id={id}/>
                </div>
                <div className="profilebodyleft">
                    <About UserData = {UserData} profile={profile} auth={auth} id={id} />
                    {/* <ShowfriendsProfile user={auth.user} />
                    <ShowFollowingsProfile user={auth.user} /> */}
                </div>
                {/* <div className="profilebodyright">
                    <ProfilePhotoShow photos = {photos} />
                    <ProfileVideoShow photos = {photos} />
                </div> */}
            </div>
            }
            {
                showfriends &&<div className="friends-profileheader">
                <div className="profileheader">
                <div className="profileheader-user">
                    {UserData.map(user => (<>
                    <img src={user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {user.fullname}</h6></>
                    ))}
                </div>
                <div className="profileheader-items">
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" onClick={() => handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showaccount')}>User profile</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item" >
                    <IconButton onClick={() => handletoggle('showlocation')}>
                        <LocationOnIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showlocation')}>Localisation</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfriends')}>Friends</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfollowing')}>Following</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showsaved')}>Saved</h6>
                    </div>
                </div>
                
                {auth.user._id === id &&<div style={{fontSize:'1rem',alignItems:'center', justifyContent:'center', margin :'10px 0',display:'flex',cursor:'pointer'}} onClick={()=>SetonEdit(true)}>
                <Edit/>
                 <p style={{marginLeft:'5px'}}>Edit profile</p> 
                 </div>}
                </div>
                 <Friends UserData = {UserData} profile={profile} auth={auth} id={id}/>
                 </div>
            }
                        {
                showfollowing && <div className="following-profileheader">
 <div className="profileheader">
                <div className="profileheader-user">
                    {UserData.map(user => (<>
                    <img src={user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {user.fullname}</h6></>
                    ))}
                </div>
                <div className="profileheader-items">
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" onClick={() => handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showaccount')}>User profile</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item" >
                    <IconButton onClick={() => handletoggle('showlocation')}>
                        <LocationOnIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showlocation')}>Localisation</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfriends')}>Friends</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfollowing')}>Following</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showsaved')}>Saved</h6>
                    </div>
                </div>
                
                {auth.user._id === id &&<div style={{fontSize:'1rem',alignItems:'center', justifyContent:'center', margin :'10px 0',display:'flex',cursor:'pointer'}} onClick={()=>SetonEdit(true)}>
                <Edit/>
                 <p style={{marginLeft:'5px'}}>Edit profile</p> 
                 </div>}
                </div>
                <Following UserData = {UserData} profile={profile} auth={auth} id={id}/></div>
            }
            {
                showsaved && <div className="saveds-profileheader">
                <div className="profileheader">
                <div className="profileheader-user">
                    {UserData.map(user => (<>
                    <img src={user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {user.fullname}</h6></>
                    ))}
                </div>
                <div className="profileheader-items">
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" onClick={() => handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showaccount')}>User profile</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item" >
                    <IconButton onClick={() => handletoggle('showlocation')}>
                        <LocationOnIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showlocation')}>Localisation</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfriends')}>Friends</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfollowing')}>Following</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showsaved')}>Saved</h6>
                    </div>
                </div>
                
               { auth.user._id === id && <div style={{fontSize:'1rem',alignItems:'center', justifyContent:'center', margin :'10px 0',display:'flex',cursor:'pointer'}} onClick={()=>SetonEdit(true)}>
                <Edit/>
                 <p style={{marginLeft:'5px'}}>Edit profile</p> 
                 </div>}
                </div>
                <Saved UserData={UserData} auth={auth}/> </div>
            }
            {
                showlocation && <div className="location-profileheader">
                  <div className="profileheader">
                <div className="profileheader-user">
                    {UserData.map(user => (<>
                    <img src={user.avatar} alt="img" />
                    <h5 style={{margin:'10px 0'}}> {user.username}</h5>
                    <h6 style={{marginBottom:'10px '}}> {user.fullname}</h6></>
                    ))}
                </div>
                <div className="profileheader-items">
                    <div className="profileheader-items-item">
                    <IconButton className="profileheader-item" onClick={() => handletoggle('showaccount')}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showaccount')}>User profile</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item" >
                    <IconButton onClick={() => handletoggle('showlocation')}>
                        <LocationOnIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showlocation')}>Localisation</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfriends')}>
                        <PeopleIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfriends')}>Friends</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showfollowing')}>
                        <PersonAddIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showfollowing')}>Following</h6>
                    </div>
                    <hr/>
                    <div className="profileheader-items-item">
                    <IconButton onClick={() => handletoggle('showsaved')}>
                        <BookmarksIcon/>
                    </IconButton>
                    <h6 style={{fontSize:'0.9rem' , cursor:'pointer'}} onClick={() => handletoggle('showsaved')}>Saved</h6>
                    </div>
                </div>
                
                {auth.user._id === id && <div style={{fontSize:'1rem',alignItems:'center', justifyContent:'center', margin :'10px 0',display:'flex',cursor:'pointer'}} onClick={()=>SetonEdit(true)}>
                <Edit/>
                 <p style={{marginLeft:'5px'}}>Edit profile</p> 
                 </div>}
                </div>
                <LocationForm  auth={auth} UserData={UserData}/></div>
            }   
                { 
                    onEdit && <EditProfile user={UserData[0]} SetOnEdit={SetonEdit}/>
                }
        </div>
    )
}

export default Profile;
