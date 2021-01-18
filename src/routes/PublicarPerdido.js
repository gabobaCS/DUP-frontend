import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerdidoForm from '../components/PerdidoForm.js'
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../components/Header.js';
import Hidden from '@material-ui/core/Hidden';
import LocationStep from '../components/LocationStep.js';
import ImageUpload from '../components/ImageUpload.js'

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#777474',
        marginTop: '20px'

    },
    mapTextWrapper:{
        width: '100%',
        marginTop: 'auto',
        [theme.breakpoints.up('md')]: {
            width: '60%',
            display:'relative',
          },
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instrucciones:{
        padding: '10px'
    },
    botonesWrapper:{
        display: 'flex',
        marginTop: '20px'
    },
    botonesControl:{
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        flex: 1,
    }


}));
  
function getSteps() {
    return ['Ubicación', 'Detalles del Encuentro', 'Imágenes'];
}

function getStepContent(stepIndex, chosenLocation, setChosenLocation, infoForm, setInfoForm, files, setFiles) {
    
    switch (stepIndex) {
        case 0:
            return(
                <React.Fragment>
                <Box style={{padding: '10px'}}>
                    <Typography variant='h3'>1. Ubicación</Typography>
                    <Typography style={{marginTop: '10px'}} variant='subtitle1'>Por favor indique la localidad en la que fue visto por última vez.</Typography>
                </Box>
                <LocationStep tipo='perdido' setLocation={setChosenLocation} location={chosenLocation}/>    
                </React.Fragment>

            );
        case 1:
        return (
            <React.Fragment>
            <Box style={{padding: '10px'}}>
                <Typography variant='h3'>2. Información del Encuentro</Typography>
                <Typography style={{marginTop: '10px'}} variant='subtitle1'>
                    Por favor complete el siguiente formulario indicando información general sobre el animal, así como información de contacto en caso de ser encontrado.
                </Typography>
            </Box>
                <PerdidoForm infoForm={infoForm} setInfoForm={setInfoForm}/>
            </React.Fragment>
        );
        case 2:
        return(
            <React.Fragment>
            <Box style={{padding: '10px'}}>
                <Typography variant='h3'>3. Fotografías</Typography>
                <Typography style={{marginTop: '10px'}} variant='subtitle1'>
                    Por favor suba imágenes claras del animal, que permitan facilitar su búsqueda y encuentro.
                </Typography>
            </Box>
                <ImageUpload files={files} setFiles={setFiles}/>
            </React.Fragment>
        );
        default:
        return 'Unknown stepIndex';
    }
}

const emptyForm = {
    descripcionEncuentro: '',
    descripcionAnimal: '',
    especie: ''
}
  
export default function PublicarPerdido() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [chosenLocation, setChosenLocation] = useState({lat: 0, lng: 0});
    const [infoForm, setInfoForm] = useState(emptyForm);
    const [files, setFiles] = useState([]);
    
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <React.Fragment>
            <Header disabled={true}/>
            <div className={classes.root} >
                <Hidden xsDown={true}>
                    <Stepper style={{backgroundColor: '#fafafa', display: 'none'}}  activeStep={activeStep} alternativeLabel >
                        {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel style={{color: 'white'}}>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </Hidden>
                <Box display='flex' justifyContent='center' alignSelf='center' style={{height: '100%'}}>
                    <div className={classes.mapTextWrapper}>
                        <Box>
                            {getStepContent(
                                activeStep,
                                chosenLocation, 
                                setChosenLocation,
                                infoForm, 
                                setInfoForm,
                                files,
                                setFiles)}
                        </Box>
                        <Box className={classes.botonesWrapper}>
                                <Box display='flex' justifyContent='space-between' className={classes.botonesControl}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}                        
                                    >
                                        Atrás
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleNext} style={{color: 'white'}}>
                                        {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                                    </Button>
                                </Box>
                        </Box>
                    </div>
                </Box>

            </div>
        </React.Fragment>

    );
}