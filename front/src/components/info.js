import React ,{useState}from "react";
import '../styles/ProfileInfo.css';
import EditProfile from './EditProfile';
import GlobalFriendBtn from "./GlobalFriendBtn";

const Info = ({UserPosts,UserData , profile , auth ,id}) => {

    const [onEdit, SetonEdit] = useState(false);

    return(
        <div className="profileinfo">
            {UserData.length > 0 && UserData.map(user => (
                <div className="profileinfo-container"  key={user._id}>
                      <div className="profileinfo-top">
                        <img src={user.avatar}  alt='hhh'/>
                      </div>
                <div className="profileinfo-center">
                    <img className="profileinfo-center-avatar" src={user.avatar} alt=""/>
                    {user._id === auth.user._id ?
                    <button className="profileinfo-centerbutton" onClick={()=>SetonEdit(true)}>Edit Profile</button>
                    : <GlobalFriendBtn classbtn = 'profileinfo-centerbutton' user={user}/>}
                </div>
                <div className="profileinfo-bottom">
                    <div className="profileinfo-state">
                        <h6 className="profileinfo-statenumber"> {user.friends.length} </h6>
                        <h6 className="profileinfo-statedescrip">FRIENDS</h6>
                    </div>
                    <div className="profileinfo-state">
                        <h6 className="profileinfo-statenumber"> {user.following.length} </h6>
                        <h6 className="profileinfo-statedescrip">FOLLOWING</h6>
                    </div>
                    <div className="profileinfo-state">
                        <h6 className="profileinfo-statenumber"> {user.features.length} </h6>
                        <h6 className="profileinfo-statedescrip">LOCALISATIONS</h6>
                    </div>
                    <div className="profileinfo-state">
                        <h6 className="profileinfo-statenumber"> {UserPosts.length} </h6>
                        <h6 className="profileinfo-statedescrip">POSTS</h6>
                    </div>
                    <div className="profileinfo-state">
                        <h6 className="profileinfo-statenumber"> {user.saved.length} </h6>
                        <h6 className="profileinfo-statedescrip">SAVED</h6>
                    </div>
                </div>
                { 
                    onEdit && <EditProfile user={user} SetOnEdit={SetonEdit}/>
                }
                </div>
            ))}
        </div>
    )
}

export default Info;