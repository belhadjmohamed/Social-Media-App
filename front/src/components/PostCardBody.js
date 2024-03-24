import React, { useEffect, useState } from "react";
import "../styles/PostCard.css";
import * as L from 'leaflet';


const PostCardBody = ({pos}) => {
    const [currentImage , setCurrentimage] = useState(0)
    const [readMore , setreadMore] = useState(true)
    const totalimages = pos.images.length;
    const [map, setMap] = useState(null);
    
    const [feature, setFeatures] = useState([])


    const shownextimage = (nextimage) => {
        console.log(nextimage) 
        if (currentImage < nextimage.length - 1  ) {
            setCurrentimage(prev => prev + 1)
        }
    }

    const showprevimage = (previmage) => {
       
        if(  0 < currentImage && currentImage <= previmage.length - 1) {
            setCurrentimage(prev => prev - 1)
        }
    }   
    const mapContainerId = `map-container-${pos._id}`;

    useEffect(()=> {
        if(!map){
            if (pos.features.length > 0){
                const newMap = L.map(mapContainerId).setView([51.505, -0.09], 12);
                setMap(newMap);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(newMap);
            }
        }
    },[map,mapContainerId,pos])

    
    useEffect(() => {
      const newFeatures = pos.features.map(item => L.geoJSON(item))
      
      const newfeat = newFeatures.map(item => {
        const id = item._leaflet_id;
        if (item._layers[id-1].feature.geometry.type === "Point"){
          var customIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          });
          item._layers[id-1].options.icon = customIcon;
        
        }
        return item._layers[id-1];
      })

      setFeatures(newfeat);
      
      

      
    }, [pos])

    useEffect(() => {
        if (map) {
            
            map.eachLayer(layer => {
                if (!(layer instanceof L.TileLayer)) {
                    map.removeLayer(layer);
                }
            });

          feature.forEach((feature) => {
            feature.addTo(map);
          });
        }
  
      }, [feature, map]);
    

    return (
        <div className="postcardbody" style={{ margin:'1rem 0'}} key={pos._id}>
            <div className="postcardbodycontent">
                {pos.content && pos.content.length < 60 ?
                pos.content : readMore ? pos.content + '...' : pos.content.slice(0,60) + '.......' }
                <span>
                    {
                        pos.content.length > 60 && 
                        <span style={{color:'block' ,cursor:'pointer'}} onClick={() => setreadMore(!readMore)}>  
                        {
                            readMore ? 'hide'  : 'show'
                        }
                        </span>
                    }
                </span>
            </div>
            <div className="postcardbodyimage">
                <span className="postcardbodyimagenext" onClick={() => shownextimage(pos.images)}>V</span>
                <span className="postcardbodyimageprev" onClick={() => showprevimage(pos.images)}>V</span>
                {pos.images.length> 0  && pos.images.map((image,index)=> (
                    (index === currentImage) &&
                    <div className="postcardimage" key={index}>
                        { image.secure_url.match(/video/i) ?
                        <video controls src={image.secure_url} alt={pos.user.fullname} height='100%' width='100%'/> :
                        <img src={image.secure_url} alt={pos.user.fullname}/>
                        }
                    </div>
                ))}
            </div>
            {pos.features.length > 0 && <div id={mapContainerId} style={{ height: '250px', width: '100%', margin: '1rem 0', borderRadius : '10px' }}></div>}
        </div>
    )
}

export default PostCardBody;