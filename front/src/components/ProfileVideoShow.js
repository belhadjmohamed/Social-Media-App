import React from "react";
import '../styles/ProfilePhotoshow.css';


const ProfileVideoShow = ({photos}) => {
    return(
        <div className="profilephotoshoww">
            <h4 style={{textAlign:'center', fontSize:'20px', fontWeight:'500',borderBottom:'2px solid gray'}}> Videos</h4>
            <div className="profilephotoshowmap">
                {
                    photos.length > 0 && photos.slice(0,3).map(item => (
                        item.map((item1,index) => (
                            <>{
                            item1.secure_url.match(/video/i)
                            ? <video controls className='profilevideosshowimages' src={item1.secure_url} alt='' />
                            : ''
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

export default ProfileVideoShow;