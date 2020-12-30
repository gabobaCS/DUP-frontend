import React from 'react';
import Grid from '@material-ui/core/Grid';
import AnimalCard from './AnimalCard.js'


export default function AnimalesDisplay(){
    return (
        <div style={{padding: 'none',  padding: '0 15vw', width: '100%'}}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3} style={{display:'flex', justifyContent:'center'}}>
                <AnimalCard data='nanana'/>
            </Grid>
            <Grid item xs={12} md={4} lg={3} style={{ display:'flex', justifyContent:'center'}}>
                <AnimalCard />
            </Grid>
            <Grid item xs={12} md={4} lg={3} style={{display:'flex', justifyContent:'center'}}>
                <AnimalCard />
            </Grid>
            <Grid item xs={12} md={4} lg={3} style={{ display:'flex', justifyContent:'center'}}>
                <AnimalCard />
            </Grid>





        </Grid>

        </div>


    );
}