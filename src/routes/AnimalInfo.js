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
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'white',
      color: '#777777',
    },
    grid:{
        width: '100%'
    },
    carouselWrapper:{
        padding: '20px 0'
    }

}));

function formatImages(animalData){
    console.log(animalData)
    var images = []
    for (var i = 1; i < 6; i++){
        var attribute = 'imagen_' + i
        if (animalData[attribute]){
            images.push(animalData[attribute])
        }
    }
    return images;
}

function formatBulletInfo(title, info){
    return(
        <Box display='flex'>
            <Typography variant="subtitle1"> Nombre</Typography>
        </Box>
    )
}

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
            
            <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}>
                <Grid item xs={12}>
                    <PerdidoEncontradoBanner/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box display='flex' justifyContent="center" alignItems="center" width='100%'>
                        <Box width='350px' className={classes.carouselWrapper}>
                            <ImageCarousel images={formatImages(animalData)}/>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                <Box display='flex'>
                    <Typography variant="subtitle1" style={{fontWeight: 100, marginRight: '3px'}}> Nombre: </Typography>
                    <Typography variant="subtitle1" style={{fontWeight: 600}}> Ruby </Typography>
                </Box>
                
                </Grid>

                

            </Grid>
      </div>
    )
}