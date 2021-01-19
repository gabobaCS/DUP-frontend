import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AnimalCard from './AnimalCard.js';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    switchBox: {
      width: '100%',
      margin: '30px 0'
    },
    title:{
        textAlign: 'center',
        margin: '50px 0',
        color: '#777474'
    }
});

export default function AnimalesDisplay(props){
    const classes = useStyles();
    const [animalesData, setAnimalesData] = useState(props.data);
    const [radioValue, setRadioValue] = useState("todo");
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
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
    };

    const titleFormatter = (radioValue) => {
        switch(radioValue){
            case 'todo': return 'perdidos y encontrados';
            case 'perdido': return 'perdidos';
            case 'encontrado': return 'encontrados';
            default: return 'perdidos y encontrados';
        }
    } 


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
                <Typography variant='h4' className={classes.title} >
                    Animales < b> {titleFormatter(radioValue)} </b> por el área:
                </Typography>
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
                    page={currPage}
                    />
                </Box>

            </div>
        </React.Fragment>
    );
}