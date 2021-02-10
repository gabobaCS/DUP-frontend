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
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,


    },
    banner:{
        width: '100%',
        margin: '30px 0'
    },
    text:{
        fontSize: '20px',
        color: 'white',
        fontWeight:100,
        letterSpacing: 20,
        textAlign: 'center',
        textIndent:20,
    }

  }));

export default function AnimalInfo(props){
    const classes = useStyles();

    const color = props.status === 'encontrado' ? '#FFEE00':'#FF5151';
    const text = props.status === 'encontrado' ? 'ENCONTRADO':'SE BUSCA';

    return(
        <div className={classes.root}>
            <Box style={{backgroundColor: color}} className={classes.banner} display='flex' justifyContent='center' alignItems='center'>
                <Typography  variant='subtitle1' className={classes.text}>
                    {text}
                </Typography>
            </Box>
        </div>
    )
}