import React from "react";
import '../styles/ProfilePhotoshow.css';


const ProfilePhotoShow = ({photos}) => {
    return(
        <div className="profilephotoshoww">
            <h4 style={{textAlign:'center', fontSize:'20px', fontWeight:'500',borderBottom:'2px solid gray'}}> Photos</h4>
            <div className="profilephotoshowmap">
                {
                    photos.length > 0 && photos.slice(0,12).map(item => (
                        item.map((item1,index) => (
                            <>{
                            item1.secure_url.match(/video/i)
                            ? ''
                            : <img className='profilephotosshowimages' key={index} src={item1.secure_url} alt="" />
                            }</>
                        ))
                        // <> {
                           
                        //     item?.secure_url.match(/video/i)
                        //     ? '' 
                        //     : <img src={item[0].secure_url} alt="" />
                            
                        // }</>
                    ))
                }
            </div>
        </div>
    )
}

export default ProfilePhotoShow;