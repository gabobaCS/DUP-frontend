import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Scroller from '../components/Scroller.js';
import AnimalesDisplay from '../components/AnimalesDisplay.js';
import Footer from '../components/Footer.js';


function Home(props){
    const [mapCenter, setMapCenter] = useState({lat:9.041430,lng: -79.433601});
    console.log(props)

    return(
        <div>
            <Header disabled={false}/>
            <Map data={props.data} setCenter={setMapCenter}/>
            <Scroller />
            <AnimalesDisplay data={props.data} />
            <Footer />


        </div>
    )
}

export default Home;