import React from 'react';
import Header from '../components/Header.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grid: {
        height:'calc(100vh - 61px)',
        [theme.breakpoints.up('sm')]: {
            height:'calc(100vh - 86px)',
          },
        padding: 0,
        margin: 0,
    },
    divider:{
        height: '2px',
        backgroundColor:'grey',
        width: '100%'
    },
    opciones:{
        cursor: 'pointer',
        '&:hover': {
            backgroundColor:'rgba(0, 0, 0, 0.05)',

        }
    }
  }));

function Publicar(props){
    const classes = useStyles();
    let history = useHistory();


    return(
        <React.Fragment>
            <Header />

            <Grid container className={classes.grid}>
                <Grid item xs={12} md={6} className={classes.opciones}>
                    <Box display='flex' alignItems='center' justifyContent='center'  height='100%' border={1} borderTop={0} borderColor='grey.300' onClick={() => history.push('publicar/encontrado')}>
                        <Typography>Encontré una mascota</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}  className={classes.opciones} >
                    <Box   display='flex' alignItems='center' justifyContent='center' height='100%' border={1} borderTop={0} borderColor='grey.300' onClick={() => history.push('publicar/perdido')}>
                        <Typography>Perdí una mascota</Typography>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

export default Publicar;