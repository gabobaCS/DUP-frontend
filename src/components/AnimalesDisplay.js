import React from 'react';
import Grid from '@material-ui/core/Grid';
import AnimalCard from './AnimalCard.js';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './anim.css'

const useStyles = makeStyles({
    switchBox: {
      width: '100%',
      margin: '30px 0'
    },
    switchBase: {
        "&$checked": {
          color: "#FFFF00"
        },
        "&$checked + $track": {
          backgroundColor: "#DFE35C"
        }
      },
      checked: {},
      track: {}
});




export default function AnimalesDisplay(props){
    const classes = useStyles();
    console.log('animales display: ')
    console.log( props)
    return (
        <React.Fragment>
            <div style={{padding: 'none',  padding: '0 15vw', width: '100%'}}>
                <Box display="flex" className={classes.switchBox} justifyContent="flex-end">
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch color="secondary"         classes={{
                                    root: classes.root,
                                    switchBase: classes.switchBase,
                                    thumb: classes.thumb,
                                    track: classes.track,
                                    checked: classes.checked
                                    }}
                                />
                            }
                            label="Encontrados"
                        />
                        <FormControlLabel
                            control={<Switch />}
                            label="Perdidos"
                        />
                    </FormGroup>
                </Box>
                <Grid container spacing={3}>           
                    {props.data != null && props.data.map((animal) => {
                        return(
                            <Grid key={animal.id}  item xs={12} md={4} lg={3} style={{display:'flex', justifyContent:'center'}}>
                                <AnimalCard imagen={animal.imagen_1} descripcion_lugar={animal.descripcion_lugar} key={animal.id} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </React.Fragment>
    );
}