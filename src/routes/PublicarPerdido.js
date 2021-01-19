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
import PublicarTitle from '../components/PublicarTitle.js'
import LocationStep from '../components/LocationStep.js';
import ImageUpload from '../components/ImageUpload.js';
import {apiPost, emailChecker} from '../helpers/helperFunctions.js';
import { useHistory } from "react-router-dom";
import WarningModal from '../components/WarningModal.js';


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

function getStepContent(stepIndex, chosenLocation, setChosenLocation, infoForm, setInfoForm, formErrors, files, setFiles) {
    
    switch (stepIndex) {
        case 0:
            return(
                <React.Fragment>
                    <PublicarTitle 
                        title='1. Ubicación'
                        subtitle='Por favor indique la localidad en la que fue visto por última vez.'
                    /> 
                    <LocationStep tipo='perdido' setLocation={setChosenLocation} location={chosenLocation}/>    
                </React.Fragment>

            );
        case 1:
        return (
            <React.Fragment>
                <PublicarTitle 
                    title='2. Información del Encuentro'
                    subtitle='Por favor complete el siguiente formulario indicando información general sobre el animal, así como información de contacto en caso de ser encontrado.'
                />             
                <PerdidoForm infoForm={infoForm} setInfoForm={setInfoForm} formErrors={formErrors}/>
            </React.Fragment>
        );
        case 2:
        return(
            <React.Fragment>
                <PublicarTitle 
                    title='3. Fotografías'
                    subtitle='Por favor suba imágenes claras del animal, que permitan facilitar su búsqueda y encuentro.'
                /> 
                <ImageUpload files={files} setFiles={setFiles}/>
            </React.Fragment>
        );
        default:
        return 'Página no encontrada';
    }
}

const emptyForm = {
    descripcionEncuentro: '',
    descripcionAnimal: '',
    especie: '',
    raza: '',
    microchip: '',
    especie: '',
    nombreAnimal: '',
    nombreContacto: '',
    email: '',
    telefono: '',

}
  
export default function PublicarPerdido() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [chosenLocation, setChosenLocation] = useState({lat: 0, lng: 0});
    const [infoForm, setInfoForm] = useState(emptyForm);
    const [files, setFiles] = useState([]);
    const [warningModal, setWarningModal] = useState({open: false});
    const [formErrors, setFormErrors] = useState({});


    let history = useHistory();

    //Option, success, errors manejan el geolocation (obtener coordenadas del usuario).
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        var crd = pos.coords;
        setChosenLocation({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)})
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if(navigator.geolocation){
            navigator.permissions
            .query({ name: "geolocation" })
            .then(function(result){
                if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(success);

                } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);

                } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location.
                //TODO
                }
            })
        }   
    }, []);
    
    const steps = getSteps();

    const handleOkWarningModal = () => setWarningModal({...warningModal, open: false});

    const formValidation = (dataToSend) => {

        let errorValues = {}

        if (!emailChecker(dataToSend.email)){
            console.log('email no valido');
            errorValues['email'] = true;
            setActiveStep(1);
        }

        if (dataToSend.imagenes.length == 0){
            setWarningModal({
                message: 'Debe haber al menos una foto.', 
                open: true
            });
            setActiveStep(2);
        }

        for (let key in dataToSend){
            if (!Boolean(dataToSend[key]) && !(key === 'raza' || key === 'nombreAnimal' || key === 'microchip')){
                console.log(key)
                setWarningModal({
                    message: 'Todos los campos obligatorios deben estar llenos.', 
                    open: true
                });
                errorValues[key] = true;
                setActiveStep(1);
            }
        }

        setFormErrors(errorValues);
    }

    const handleNext = () => {
        if(activeStep === steps.length - 1){
            const dataToSend =  {...infoForm, ...chosenLocation, imagenes: files, estado: 'perdido'};
            formValidation(dataToSend)
            // apiPost(dataToSend, history);
            // history.push('/');
        }
        else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <React.Fragment>
            <WarningModal open={warningModal.open} message={warningModal.message} handleClose={handleOkWarningModal}/>
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
                                formErrors,
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