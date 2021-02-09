import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, InfoWindow, Marker, Autocomplete } from '@react-google-maps/api';
import roomRed from '../icons/RedMarker.png';
import roomYellow from '../icons/YellowMarker.png';
import './Map.css';
import AnimalCard from './AnimalCard.js';
import Grid from '@material-ui/core/Grid';
import {getUserGeolocation} from '../helpers/helperFunctions.js';

const librerias = ["places"];

function Map(props) {

    const [center, setCenter] = useState({lat:9.041430,lng: -79.433601});
    const [currentMarker, setCurrentMarker] = useState();
    const [showWindow, setShowWindow] = useState(false);
    const [autocomplete, setAutocomplete] = useState();

    //Usado para el Mapa.
    const containerStyle = {
        width: '100%',
        height: '80vh',
    };

    //Option, success, errors manejan el geolocation (obtener coordenadas del usuario).
    // var options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0,
    // };

    // function success(pos) {
    //     var crd = pos.coords;
    //     setCenter({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)})
    // }
  
    // function errors(err) {
    //     console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    // useEffect(() => {
    //     if(navigator.geolocation){
    //         navigator.permissions
    //         .query({ name: "geolocation" })
    //         .then(function(result){
    //             if (result.state === "granted") {
    //             navigator.geolocation.getCurrentPosition(success);

    //             } else if (result.state === "prompt") {
    //             navigator.geolocation.getCurrentPosition(success, errors, options);

    //             } else if (result.state === "denied") {
    //             //If denied then you have to show instructions to enable location.
    //             //TODO
    //             }
    //         })
    //     }   
    // }, []);

    useEffect(() => {
            getUserGeolocation((userLocation) => {props.setCenter(userLocation)});

    }, []);

    const onClickMarker = animal => e => {
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
    },[]);

    const onPlaceChanged = useCallback(() => {
        console.log(autocomplete.getPlace().geometry.location.lat());
        console.log(autocomplete.getPlace().geometry.location.lng());
        props.setCenter({
        lat:autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
        })
    },[autocomplete]);  
  
    return (
        <LoadScript
            googleMapsApiKey='' 
            // googleMapsApiKey={process.env.REACT_APP_API_MAPS_KEY}
            libraries={librerias}
        >

            <GoogleMap
            mapContainerStyle={containerStyle}
            center={props.center}
            zoom={15}
            onClick={showWindow && onCloseWindow}
            clickableIcons={false}
            options={{streetViewControl: false, gestureHandling: 'greedy'}}
            > 

                <Autocomplete
                onLoad={onLoadAutocomplete}
                onPlaceChanged={onPlaceChanged}
                >
                    <div className='autocomplete-wrapper'>
                        <input
                        type="text"
                        className='autocomplete-input'
                        placeholder="Coloque una dirección"
                        />
                    </div>
                </Autocomplete>

                {props.data != null && props.data.map(animal => (
                    <Marker
                    icon={animal.estado == 'encontrado' ? roomYellow : roomRed}
                    position={{lat: parseFloat(animal.latitud), lng: parseFloat(animal.longitud)}}
                    clickable={true}
                    onClick={onClickMarker(animal)}
                    key={animal.id}
                    >                        
                        {showWindow && currentMarker && animal.id == currentMarker.id && 
                            <InfoWindow
                            onCloseClick={onCloseWindow}
             
                            >
                                <AnimalCard animalData={animal} width='250px'/>
    
                            </InfoWindow>
                        }            
                    </Marker>        
                ))} 
            </GoogleMap>


        </LoadScript>
    )                         
}

export default React.memo(Map)