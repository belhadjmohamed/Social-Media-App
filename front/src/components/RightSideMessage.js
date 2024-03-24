import React, { useRef ,useEffect, useState } from "react";
import UserCardMessage from "./UserCardMessage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import {imageupload} from '../utils/imageupload';
import { addMessage, getMessages, deleteMessage } from "../redux/actions/messageActions";
import LoadIcon from "../images/loading.gif"


const RightSideMessage = () => {
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();
    const {auth ,message, socket} = useSelector(state => state);
    const {id} = useParams();
    const [media, setMedia] = useState([]);
    const [text, setText]  = useState('');
    const [loadmedia, setLoadMedia] = useState(false);

    const refDisplay = useRef();

    useEffect(()=> {
        if(id){
            const getMessagesData = async () => {
                await dispatch(getMessages({auth,id}))
                if (refDisplay.current){
                    refDisplay.current.scrollIntoView({behavior : 'smooth', block : 'end'})
                }
            }
            getMessagesData()
        }   
    },[id,dispatch,auth])


    useEffect(()=> {
        const newData = message.users.find(item => item._id === id)
        if(newData){
            setUser(newData)
        }
    },[message.users,id])


    const imageshow =(src) => {
        return(
            <>
            <img src={src} alt="" className="statusmsg-middleimages"/>
            
            </>
        )
    }
    const videoshow =(src) => {
        return(
            <>
            <video controls src={src} alt="" className="statusmsg-middleimages"/>
            
            </>
        )
    }

    const deleteimage = (ind) => {
        const newArrimage = [...media]
        newArrimage.splice(ind,1);
        setMedia(newArrimage);

    }

    const uploadmedia = (e) => {

        const files = [...e.target.files];
        let err;
        setLoadMedia(true);
        let mediaArr = [];

        files.forEach(file => {
            if(!file) return err = "no file found";
            if (file.size > 1024*1024*5) return err = "file is too long";
            return mediaArr.push(file);
            })
        
        if (err) {dispatch({type : 'ALERT', payload : {error : err}})}
            setMedia([...media,  ...mediaArr]);
            setLoadMedia(false);

    }

    const handleuploadinput = (e) => {
        e.preventDefault();
        const imageuploadfunc = document.getElementById('fileuploadimage');
        imageuploadfunc.click();
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!text.trim() && media.length === 0) return;
        setMedia([]);
        setText('');
        let medArr = [];
        setLoadMedia(true)
        if (media.length > 0) medArr = await imageupload(media);

        const msg = {
            sender : auth.user._id,
            recipient : id,
            text,
            media : medArr,
            createdAt : new Date().toISOString()
        }

        setLoadMedia(false)
        dispatch(addMessage({auth , msg, socket}))
        if (refDisplay.current){
            refDisplay.current.scrollIntoView({behavior : 'smooth', block : 'end'})
        }

    }

    function handleDeletemsg(data) {
        dispatch(deleteMessage({message, data,auth}))
        // dispatch(deleteMessage({auth,data}))
        // dispatch(type : MESS_TYPE.deletemess , payload : res.data.messages)
        // {
        //     ...state,
        //     data : state.data.filter(item => item.id !== action.payload._id)
        // }
    }

    return(
        <div className="rightsidecontent" >
            <div className="rightsidecontentheader">
                {user.length !== 0 &&
                <UserCardMessage user={user} >
                    <DeleteIcon style={{color : 'black'}}/>
                </UserCardMessage>
                }
            </div>
            <div className="rightsidecontentmessages">
            <div >
                {
                    message.data.map((msg,index)=> (
                        <div key={index} ref={refDisplay} className="rightsidecontentmessages-chatbox" >
                            {
                                msg.sender !== auth.user._id &&
                                <div className="rightsidecontentmessages rightsidecontentmessagesother">
                                    <MsgDisplay user={user} msg={msg} />
                                </div>
                            }
                            {
                                msg.sender === auth.user._id && 
                                <div className="rightsidecontentmessages rightsidecontentmessagesours">
                                    <MsgDisplay user={auth.user} msg={msg} />
                                    <DeleteIcon className="deletemessagechat" onClick={() => handleDeletemsg(msg)} style={{color :'salmon'}}/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            </div>
            <form className="rightsidecontentinput" onSubmit={handleSubmit} >
                <input  className="rightsidecontentinputtext" style={{width : '100%'}} type="text" placeholder="type the message" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="rightsidecontentinputfileupload">
                    <ImageIcon onClick={handleuploadinput} />
                    <input style={{display:'none'}} type="file" id="fileuploadimage" multiple accept="image/*, video/*" onChange={uploadmedia}/>
                </div>
                <button  type="submit" className="rightsidecontentinputbutton" disabled={ (text || media.length !== 0 )? false : true}> <SendIcon/> </button>
            </form>
            {
                    loadmedia &&
                    <div className=" " >
                        <img src={LoadIcon} alt="" style={{width:'48px',height:'48px'}}/>
                    </div>
            }
            <div className="rightsidecontentinputmsg-mediadiv" style={{display: media.length > 0 ? 'grid' : 'none'}}>
                {
                    media.length > 0 && media.map((item,index) =>(
                        <div className="rightsidecontentinputmsg-mediadivitem" key={index}>
                            {
                                item.type.match(/video/i)
                                ? videoshow(URL.createObjectURL(item))
                                : imageshow(URL.createObjectURL(item))
                            }
                            <span className="rightsidecontentinputmsg-mediadivitemdelete" onClick={()=> deleteimage(index)}> X </span>
                        </div>
                    ))
                }

            </div>
            
        </div>
    )
}

export default RightSideMessage;