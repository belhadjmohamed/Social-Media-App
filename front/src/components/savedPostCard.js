import React from "react";
import moment from 'moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import "../styles/SavedPostcard.css";
import {Link} from "react-router-dom";

const SavePostCard = ({savedPost}) => {
    return (
        <div className="savepostcard">
        <Link to={`/post/${savedPost._id}`} style={{textDecoration:'none'}}>  <div className="savepostcard-content">
                <div className="savepostcard-contentuserinfo">
                    <div className="savepostcard-contentinfodetail">
                        <h5 className="savepostcard-contentinfodetailfullname">{savedPost.user.fullname}</h5>
                        <small className="savepostcard-contentinfodetailusername">{savedPost.user.username}</small>
                    </div>
                </div>
                <div className="savepostcard-contentmiddle">
                    {savedPost.images.map(image => (
                        <div className="savepostcard-contentmiddleimage" >
                        { image.secure_url.match(/video/i) ?
                        <video controls src={image.secure_url} alt="" height='100%' width='100%'/> :
                        <img src={image.secure_url} alt=""/>
                        }
                        </div>
                    ))}
                </div>
                <div className="savedpostcard-contentend">
                    <div className="savedpostcard-contentenditem">
                        <h6 className="savedpostcard-contentenditemtext">{savedPost.likes.length}</h6> 
                        <FavoriteIcon style={{color: savedPost.likes.length === 0 ? 'white' : 'red'}}/>
                    </div>
                    <div className="savedpostcard-contentenditem">
                        <h6 className="savedpostcard-contentenditemtext">{savedPost.commentss.length}</h6> 
                        <CommentIcon  style={{color: savedPost.commentss.length === 0 ? 'white' : 'red'}}/>
                    </div>
                    
                </div>
                <div className="savedpostcard-contentendtime">
                    <small  className="savedpostcard-contentendtimetext">Post Created At :</small>
                    <small className="savedpostcard-contentendtimeformat">{moment(savedPost.createdAt).format('DD/MM/YY')}</small>
                </div>
            </div>
            </Link> 
        </div>
    )
}

export default SavePostCard;