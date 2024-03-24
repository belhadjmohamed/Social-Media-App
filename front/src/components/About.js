import React from "react";
import moment from 'moment';
import '../styles/ProfileAbout.css';


const Profileabout = ({UserData , profile , auth ,id}) => {


    return (
        <div className="Profileabout">
            {UserData.length >0 && UserData.map(user=> (
                <div className="Profileabout-container" key={user._id}>
                    <div className="Profileabout-contenttop">
                        <h4 className="Profileabout-contenttop-head">About Me : </h4>
                    </div>
                    <div className="Profileabout-contentcenter">
                        <p className="Profileabout-contentcenter-story">{user.story}</p>
                    </div>
                    <div className="Profileabout-contentbottom">
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Adresse :  </h6>
                            <p className="Profileabout-contentbottominfo-body"> {user.address}</p>
                        </div>
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Joined </h6>
                            <p className="Profileabout-contentbottominfo-body"> {moment(user.createdAt).format('YYYY-MM-DD')}</p>
                        </div>
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Gender </h6>
                            <p className="Profileabout-contentbottominfo-body"> {user.gender}</p>
                        </div>
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Phone</h6>
                            <p className="Profileabout-contentbottominfo-body"> {user.phone}</p>
                        </div>
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Email </h6>
                            <p className="Profileabout-contentbottominfo-body"> {user.email}</p>
                        </div>
                        <div className="Profileabout-contentbottominfo">
                            <h6 className="Profileabout-contentbottominfo-head">Website </h6>
                            <a href={user.website} className="Profileabout-contentbottominfo-body"> {user.website}</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profileabout;