import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, InfoWindow, Marker, Autocomplete } from '@react-google-maps/api';
import roomRed from '../icons/roomRed2.png';
import roomYellow from '../icons/roomYellow2.png';
import './Map.css';

const librerias = ["places"];

function Map() {

  const [center, setCenter] = useState({lat:9.041430,lng: -79.433601});
  const [data, setData] = useState(null);
  const [currentMarker, setCurrentMarker] = useState();
  const [showWindow, setShowWindow] = useState(false);
  const [autocomplete, setAutocomplete] = useState();

  const containerStyle = {
    width: '100vw',
    height: '80vh',
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    setCenter({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)})
  }
  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if(navigator.geolocation){
      navigator.permissions
      .query({ name: "geolocation" })
      .then(function(result){
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);

        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);

        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }
      })
    }

    fetch('https://dupbackend.herokuapp.com/animales', {method: 'GET'})
    .then(res => res.json())
    .then((data) => {
      setData(data);
    })
    
  }, []);

  const onClick = animal => e => {
    setCurrentMarker({id: animal.id, lat: e.latLng.lat(), lng: e.latLng.lng()});
    setShowWindow(true);
    console.log(animal)
  }

  const onCloseWindow = useCallback(e => {
    setCurrentMarker();
    setShowWindow(false);
  }, []);

  const onLoadAutocomplete = useCallback(autocomplete => {
    setAutocomplete(autocomplete);
    console.log('autcomplete: ' + autocomplete);

  },[]);

  const onPlaceChanged = useCallback(() => {
    console.log(autocomplete.getPlace().geometry.location.lat());
    console.log(autocomplete.getPlace().geometry.location.lng());
    setCenter({
      lat:autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng()
     })

  },[autocomplete]);


  
  
  return (
    <LoadScript
    //   googleMapsApiKey='' 
      googleMapsApiKey={process.env.REACT_APP_API_MAPS_KEY}
      libraries={librerias}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick={showWindow && onCloseWindow}
        clickableIcons={false}
        options={{streetViewControl: false}}
      > 

        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
            <div style={{display: 'flex', justifyContent: 'center', width:'100vw'}}>
                <input
                type="text"
                className='autocomplete-input'
                placeholder="Coloque una dirección"
                />
            </div>
        </Autocomplete>

        {data != null && data.map(animal => (
            <Marker
            icon={animal.estado == 'encontrado' ? roomYellow : roomRed}
            position={{lat: parseFloat(animal.latitud), lng: parseFloat(animal.longitud)}}
            clickable={true}
            onClick={onClick(animal)}
            key={animal.id}
            >                        
                {showWindow && currentMarker && animal.id == currentMarker.id && 
                    <InfoWindow
                    onCloseClick={onCloseWindow}
                    >
                        <div >
                        <h1>{animal.descripcion_lugar}</h1>
                        <img src={animal.imagen_1} style={{width:'200px',height:'200px'}}></img>
                        </div>
                    </InfoWindow>
                }            
            </Marker>        
        ))} 
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)