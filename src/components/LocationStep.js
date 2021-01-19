import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript,  Autocomplete, Marker } from '@react-google-maps/api';
import './LocationStep.css';
import RedMarker from '../icons/RedMarker.png'
import YellowMarker from '../icons/YellowMarker.png'

const librerias = ["places"];

function LocationStep(props) {

    const [center, setCenter] = useState(props.location);
    const [showWindow, setShowWindow] = useState(false);
    const [autocomplete, setAutocomplete] = useState();

    //Usado para el Mapa.
    const containerStyle = {
        width: '100%',
        height: '100%',
    };

        //Option, success, errors manejan el geolocation (obtener coordenadas del usuario).
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
                //If denied then you have to show instructions to enable location.
                //TODO
                }
            })
        }   
    }, []);

    const onLoadAutocomplete = useCallback(autocomplete => {
        setAutocomplete(autocomplete);
    },[]);

    const onPlaceChanged = useCallback(() => {
        console.log(autocomplete.getPlace().geometry.location.lat());
        console.log(autocomplete.getPlace().geometry.location.lng());
        setCenter({
        lat:autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
        })
    },[autocomplete]);
    
    const onMapClick = (e) => {
        console.log(e.latLng.lat());
        // setCurrentMarker({lat: e.latLng.lat(), lng: e.latLng.lng()})
        props.setLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})
    };
  
    return (
        <LoadScript
            googleMapsApiKey='' 
            // googleMapsApiKey={process.env.REACT_APP_API_MAPS_KEY}
            libraries={librerias}
        >
            <div className='mapaLocationStep'>
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={onMapClick}
                clickableIcons={false}
                options={{
                        streetViewControl: false, 
                        gestureHandling: 'greedy', 
                        mapTypeControlOptions: {mapTypeIds:['roadmap', 'hybrid']}
                        }}
                > 
                        <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={onPlaceChanged}
                        >
                            <div className='autocompleteWrapperLocationStep'>
                                <input
                                    type="text"
                                    className='autocompleteInputLocationStep'
                                    placeholder="Coloque una dirección"
                                    />
                            </div>
                        </Autocomplete>

                        <Marker position={props.location} clickable={false} icon={props.tipo == 'perdido' ? RedMarker : YellowMarker}/>
                        

                </GoogleMap>
            </div>
        </LoadScript>
    )                         
}

export default React.memo(LocationStep)