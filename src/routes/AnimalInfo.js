import React, { useState, useEffect } from "react";
import {
  useParams,
  Redirect,
  useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Header from '../components/Header.js';
import PerdidoEncontradoBanner from '../components/PerdidoEncontradoBanner.js';
import ImageCarousel from '../components/ImageCarousel.js';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'white' 
    },

  }));


export default function AnimalInfo(props){
    let { id } = useParams();
    let history = useHistory();
    const classes = useStyles();

    const [animalData, setAnimalData] = useState({});

    useEffect(() => {
        console.log([])
        if(props.data.length !== 0){
            let animal = props.data.filter(obj => {
                return obj.id === parseInt(id);
            });
    
            if(animal.length === 0){
                console.log('nout found' );
                history.push('/not-found');
            }
    
            setAnimalData(animal[0]);
            console.log(animal[0])
        }
    },[props.data]);


    return(
        <div className={classes.root}>
            <Header />
            
            <Grid container>
            <PerdidoEncontradoBanner/>
            <Grid item xs={12}>
                <ImageCarousel />
            </Grid>

            </Grid>
      </div>
    )
}