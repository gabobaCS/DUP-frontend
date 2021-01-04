import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AnimalCard from './AnimalCard.js';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Pagination from '@material-ui/lab/Pagination';


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

    const [animalesData, setAnimalesData] = useState(props.data);
    const [encontradosState, setEcontradosState] = useState(true);
    const [perdidosState, setPerdidosState] = useState(true);

    useEffect(() => {
        if (props.data) {
          setAnimalesData(props.data);
        }
      }, [props.data]);

    const handlePageChange = (event, value) => {
        console.log(value);
    };

    return (
        <React.Fragment>
            <div style={{padding: 'none',  padding: '0 15vw', width: '100%'}}>
                <Box display="flex" className={classes.switchBox} justifyContent="flex-end">
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch color="secondary" onChange={() => setEcontradosState(!encontradosState)} checked={encontradosState} classes={{
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
                            control={<Switch  onChange={() => setPerdidosState(!perdidosState)} checked={perdidosState}/>}
                            label="Perdidos"
                        />
                    </FormGroup>
                </Box>
                <Grid container spacing={3}>           
                    {props.data != null && props.data.map((animal) => {
                        return(
                            <Grid key={animal.id}  item xs={12} md={4} lg={3} style={{display:'flex', justifyContent:'center'}}>
                                <AnimalCard imagen={animal.imagen_1} descripcion_lugar={animal.descripcion_lugar} key={animal.id} id={animal.id} />
                            </Grid>
                        )
                    })}
                </Grid>
                <Box display="flex" className={classes.switchBox} justifyContent="center">
                    <Pagination 
                    count={animalesData ? animalesData.length / 12: 1}  
                    // count={10}
                    onChange={handlePageChange}
                    />
                </Box>

            </div>
        </React.Fragment>
    );
}