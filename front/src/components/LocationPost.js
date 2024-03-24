import React, { useEffect, useRef, useState } from "react";
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

import {useDispatch} from 'react-redux'
import { saveLocation } from "../redux/actions/profileActions";

const LocationPost = ({features,setFeatures}) => {
    
    // const dispatch = useDispatch();

    const [map, setMap] = useState(null);

    const [selectedFeature, setSelectedFeature] = useState(null);

    // const handleSaveLocation = () => {
    //   const gsonFeatures = features.map(feature => { 
    //     if(feature._layers){
    //       const id = feature._leaflet_id
    //       const newfeaturee = feature._layers[id-1].feature
    //       return newfeaturee
    //     }else{
    //       const newfeaturee = feature.toGeoJSON()
    //       return newfeaturee
    //     }
    //   });
    //   dispatch(saveLocation(auth,gsonFeatures))
    // }

    const handleEditClick = (e) => {
      e.preventDefault();
      if (selectedFeature) {
        if (selectedFeature.editing){
          selectedFeature.editing.enable()
        }else{
          const id = selectedFeature._leaflet_id
          selectedFeature._layers[id-1].editing.enable()
        }
      }
    };

    const handleRemoveClick = (e) => {
      e.preventDefault();
      if (selectedFeature) {
        setFeatures((prevFeatures) => prevFeatures.filter(item => item !== selectedFeature))
        map.removeLayer(selectedFeature);
        setSelectedFeature(null);  
      }
    };

    const isMounted = useRef(true);
    useEffect(() => {
      if (isMounted.current) {
      // dispatch(getFeatures(auth))
      // console.log(auth.user.features)
      const newFeatures = features.map(item => L.geoJSON(item))
      
      const newfeat = newFeatures.map(item => {
        const id = item._leaflet_id;
        //"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
        if (item._layers[id-1].feature.geometry.type === "Point"){
          var customIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          });
          item._layers[id-1].options.icon = customIcon;
        
        }
        return item._layers[id-1];
      })
      setFeatures(newfeat);
      
      isMounted.current = false;
    }
      
    }, [isMounted,features,setFeatures])

    const drawCreated = (e) => {
      const type = e.layerType;
      const layer =   e.layer;
      

      setFeatures((prevFeatures) => [...prevFeatures, layer]);
    };




    useEffect(()=> {
      if(!map){
        const newMap = L.map('map-container2').setView([51.505, -0.09], 12);
        setMap(newMap);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        const drawnItems = new L.FeatureGroup();
        newMap.addLayer(drawnItems);
        

        const drawControl = new L.Control.Draw({
          edit: {
            featureGroup: drawnItems
          },
          draw: {
            polyline: {
              shapeOptions: {
                color: 'red',
                weight: 3,
              },
            },
            polygon: {
              shapeOptions: {
                color: 'blue',
                weight: 2,
                fillColor: 'rgba(255, 0, 0, 0.2)',
              },
            },
            marker: {
              icon: L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
              }),
            },
          },
        });
  
        newMap.addControl(drawControl);        

        newMap.on('draw:created', drawCreated);

      }

    },[map,  drawCreated])


    useEffect(() => {
      if (map) {

        features.forEach((feature) => {
          feature.addTo(map);
        });
      }

    }, [features, map]);

    useEffect(() => {
      if (map) {
        // Add an event listener for feature selection
        map.on('click', (e) => {
          
          const clickedLatLng = e.latlng;
          

          for (const feature of features) {
            if (feature instanceof L.Marker || feature instanceof L.CircleMarker) {
              const clickRadius = 200;
              const markerLatLng = feature.getLatLng();
              const distance = clickedLatLng.distanceTo(markerLatLng);
              if (distance <= clickRadius) {
                setSelectedFeature(feature);
                if (feature.editing){
                  feature.editing.enable(); 
                }
               }
               else{
                if(selectedFeature){
                  selectedFeature.editing.disable();
                  setSelectedFeature(null);
                }
              }

            }else
            if (feature.getBounds().contains(clickedLatLng)) {
              if (selectedFeature) {
                    selectedFeature.setStyle({ color: 'blue' }); 
              }else{
                feature.setStyle({ color: 'green' }); 
                setSelectedFeature(feature);
              }
            } else {
              if (selectedFeature) {
                if (!(selectedFeature instanceof L.Marker || selectedFeature instanceof L.CircleMarker)) {
                  selectedFeature.setStyle({ color: 'blue' });
                  selectedFeature.editing.disable();
                  setSelectedFeature(null);
                }else{
                    selectedFeature.editing.disable();
                    setSelectedFeature(null);
                }
              }
            }
          }
        })
      }
    }, [map, features, drawCreated, selectedFeature]);

    return (
      <div>
        <div id="map-container2" style={{ height: '400px', width: '100%' }}></div>
        <div style={{display:'flex', marginTop:'6px',justifyContent:'space-evenly'}}>
        <button className="buttoncartpost" onClick={handleEditClick}>Edit Selected</button>
        <button className="buttoncartpost" onClick={handleRemoveClick}>Remove Selected</button>
        </div>
        {/* <button onClick={handleSaveLocation}>Save Location</button> */}
      </div>
    )
}



export default LocationPost;