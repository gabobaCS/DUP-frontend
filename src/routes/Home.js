import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Scroller from '../components/Scroller.js';
import AnimalesDisplay from '../components/AnimalesDisplay.js';
import Footer from '../components/Footer.js';


function Home(props){
    console.log(props)

    return(
        <div>
            <Header/>
            <Map data={props.data}/>
            <Scroller />
            <AnimalesDisplay data={props.data} />
            <Footer />


        </div>
    )
}

export default Home;