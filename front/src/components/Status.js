import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Status.css";
import CameraIcon from '@material-ui/icons/Camera';
import PhotoIcon from '@material-ui/icons/Photo';
import { useDispatch } from "react-redux";
import { createPost,updatePost } from "../redux/actions/postAction";
import { ALERT_TYPES } from "../redux/actions/alertActions";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationPost from "./LocationPost";


const Status = () => {
    const {auth,status,socket} = useSelector(state => state);
    const [Content , setContent] = useState('');
    const [images , setimages] = useState([]);
    const [features, setFeatures] = useState([]);
    const [stream , setstream] = useState(false);
    const [tracks, setTracks] = useState('');
    const [location, setLocation] = useState(false);
    const dispatch = useDispatch()
    const refvideo = useRef();
    const refCanvas = useRef();

    useEffect(()=>{
        if(status.edit){
            if (status.content) setContent(status.content);
            setimages(status.images);
            if (status.features.length > 0 ) {
                setLocation(true);
                setFeatures(status.features)
            }
        }
    },[status])

    const PutMapPosition = () => {
        setLocation(true);
    }

    const uploadimages = (e) => {
        const files = [...e.target.files];
        let err;
        let imageArr = [];

        files.forEach(file => {
            if(!file) return err = "no file found";
            if (file.size > 1024*1024*5) return err = "file is too long";
            return imageArr.push(file);
            })
        
        if (err) {dispatch({type : 'ALERT', payload : {error : err}})}
            setimages([...images,  ...imageArr]);
            console.log(images);

    }

    const deleteimage = (ind) => {
        const newArrimage = [...images]
        newArrimage.splice(ind,1);
        setimages(newArrimage);

    }

    const handleuploadinput = () => {
        const imageuploadfunc = document.getElementById('postupload');
        imageuploadfunc.click();
    }

    

    const handleStream = () => {
        setstream(true);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video : true})
            .then((stream => {
                refvideo.current.srcObject =stream;
                refvideo.current.play();
                const track = stream.getTracks();
                setTracks(track[0])
            })).catch(err => console.log(err))
        }
    }

    const handlecameraimage = () => {
        const width = refvideo.current.clientWidth;
        const height = refvideo.current.clientHeight;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);
        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(refvideo.current, 0 , 0 ,width,height);
        const URL = refCanvas.current.toDataURL();
        setimages([...images, {camera : URL}])
        console.log(images)
    }

    const handleStreamStop = () => {
        tracks.stop();
        setstream(false);
    }

    const handlestopLocation = () => {
        setLocation(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Content=== '') return dispatch({type : 'ALERT', payload : {error : "add your content"} })
        if (images.length === 0) return dispatch({type : 'ALERT', payload : {error : "add your image"} })
        const gsonFeatures = features.map(feature => { 
        if(feature._layers){
          const id = feature._leaflet_id
          const newfeaturee = feature._layers[id-1].feature
          return newfeaturee
        }else{
          const newfeaturee = feature.toGeoJSON()
          return newfeaturee
        }
        });
        if (status.edit) {
            console.log(gsonFeatures)
            dispatch(updatePost({Content,images, auth,gsonFeatures,status,socket}))
            setContent('');
            setimages([]);
            setLocation(false);
            setFeatures([]);
            if (tracks) tracks.stop()
            dispatch({type : ALERT_TYPES.STATUS , payload : {edit : false}})
        }else{
            dispatch(createPost({Content, images,auth,gsonFeatures,socket}))
            setContent('');
            setimages([]);
            setLocation(false);
            setFeatures([]);
            if (tracks) tracks.stop()
        }
    }

    const handleDiscard = (e) => {
        e.preventDefault();
        setContent('');
        setimages([]);
        setLocation(false);
        if (tracks) tracks.stop()
        dispatch({type : ALERT_TYPES.STATUS, payload : {edit : false}})
    }
    const imageshow =(src) => {
        return(
            <>
            <img src={src} alt="" className="status-middleimages"/>
            
            </>
        )
    }
    const videoshow =(src) => {
        return(
            <>
            <video controls src={src} alt="" className="status-middleimages"/>
            
            </>
        )
    }

    return(
        <div className={status.edit ? "editstatus" : "status" }>
            <form onSubmit={handleSubmit}>
                <div className="status-header">
                    <img src={auth.user.avatar} alt="" />
                    <h4>Status</h4>
                </div>
                <div className="status-middle"> 
                    <textarea placeholder="write your content here" type="text" rows={5} cols={10} value={Content} onChange={(e) => setContent(e.target.value) }/>
                    <small> {Content.length} </small>
                </div>
                <div className="status-imagesdiv" >
                {
                    images && images.map((image,index) => (
                       <div className="status-middleimagecontain">
                        {
                            image.camera ? imageshow(image.camera) 
                            :   image.secure_url ? 
                            <> {
                                image.secure_url.match(/video/i) 
                                ?
                                videoshow(image.secure_url):
                                imageshow(image.secure_url)
                            }
                            </> 
                            : <>
                            {
                                image.type.match(/video/i)
                                ? videoshow(URL.createObjectURL(image))
                                : imageshow(URL.createObjectURL(image))
                            }
                            </>
                        }
                        <span className="status-middleimagedelete" onClick={()=> deleteimage(index)}> X </span>
                       </div>
                    ))
                }
                </div>
                {
                    stream && <div className="status-stream" > 

                        <video autoplay muted ref={refvideo} style={{height : '250px' , width:'100%',border :"2px solid black" , padding:'5px 0',borderRadius:'10px'}}/>
                        <span className="status-middlestreamstop"   onClick={handleStreamStop}> X </span>
                        <canvas ref={refCanvas} style={{display : 'none'}}/>
                    </div>
                }
                {
                    location && <div className="locationpoststatus">
                            <LocationPost features={features} setFeatures={setFeatures}/>
                            
                            <span className="stoplocationpoststatus"  onClick={handlestopLocation}> X </span>
                        </div>
                }
                <div className="status-footer">
                    { stream ? 
                    <PhotoIcon onClick={handlecameraimage} />
                    : 
                    <>
                    <div className="status-footerleft">
                        <CameraIcon onClick={handleStream}/>
                        <PhotoIcon onClick={handleuploadinput}/>
                        <LocationOnIcon onClick={PutMapPosition} />
                        <span><input style={{display:'none'}} type="file" id="postupload" multiple onChange={uploadimages} /></span>
                    </div> 
                    </>
                    }
                    <div className="status-footerright">
                        <button className="status-footerrightdiscard" onClick={handleDiscard}>Abandon</button>
                        <button className="status-footerrightCreate" type="submit">ADD</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Status;