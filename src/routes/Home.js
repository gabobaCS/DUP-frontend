import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import Scroller from '../components/Scroller.js';


function Home(){

    return(
        <div>
            <Header/>
            <Map />
            <Scroller />


        </div>
    )
}

export default Home;