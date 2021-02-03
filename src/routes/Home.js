import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Scroller from '../components/Scroller.js';
import AnimalesDisplay from '../components/AnimalesDisplay.js';
import Footer from '../components/Footer.js';
import {sortByDistance} from '../helpers/sortByDistance.js';


function Home(props){
    const [mapCenter, setMapCenter] = useState({lat:9.041430,lng: -79.433601});

    console.log(sortByDistance(props.data, mapCenter))

    return(
        <div>
            <Header disabled={false}/>
            <Map data={props.data} setCenter={setMapCenter} center={mapCenter}/>
            <Scroller />
            <AnimalesDisplay data={sortByDistance(props.data, mapCenter)} />
            <Footer />


        </div>
    )
}

export default Home;