import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AnimalCard from './AnimalCard.js';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles({
    switchBox: {
      width: '100%',
      margin: '30px 0'
    },
});

export default function AnimalesDisplay(props){
    console.log('hay: ' + props.data.length + ' animales')
    const classes = useStyles();
    const [animalesData, setAnimalesData] = useState(props.data);
    const [radioValue, setRadioValue] = useState("todo");
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        console.log(animalesData);
        if (props.data) {
          setAnimalesData(props.data);
        }
    }, [props.data]);

    const handleRadio = (event) => {
        setRadioValue(event.target.value);
        if(event.target.value != 'todo'){
            const newAnimalesData =  props.data.filter(animal => animal.estado == event.target.value);
            setAnimalesData(newAnimalesData);
            setCurrPage(1);
        }
        else{
            setAnimalesData(props.data);
            setCurrPage(1);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrPage(value);
        console.log(value);
    };


    return (
        <React.Fragment>
            <div style={{padding: 'none',  padding: '0 15vw', width: '100%'}}>
                <Box display="flex" className={classes.switchBox} justifyContent="flex-end">
                    <RadioGroup aria-label="filtrar" name="filtrar-animales"  value={radioValue} onChange={handleRadio} row >
                        <FormControlLabel  value="todo" control={<Radio/>} label="Todos" />
                        <FormControlLabel value="perdido" control={<Radio/>} label="Perdidos" />
                        <FormControlLabel value="encontrado" control={<Radio />} label="Encontrados" />
                    </RadioGroup>
                </Box>
                <Grid container spacing={3}>           
                    {animalesData != null && animalesData.slice((currPage - 1)*12, (currPage)*12).map((animal) => {
                        return(
                            <Grid key={animal.id}  item xs={12} md={4} lg={3} style={{display:'flex', justifyContent:'center'}}>
                                <AnimalCard animalData={animal} key={animal.id}/>
                            </Grid>
                        )
                    })}
                </Grid>
                <Box display="flex" className={classes.switchBox} justifyContent="center">
                    <Pagination 
                    count={animalesData ? Math.ceil(animalesData.length / 12): 1}  
                    onChange={handlePageChange}
                    />
                </Box>

            </div>
        </React.Fragment>
    );
}