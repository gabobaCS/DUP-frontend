import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Header from '../components/Header.js';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from "react-router-dom";
import WarningModal from '../components/WarningModal.js';
import SendModal from '../components/SendModal.js';
import {getStepContent, formValidation, emptyForm, getSteps} from '../helpers/publicarAux';



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
  
export default function PublicarPerdido() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [chosenLocation, setChosenLocation] = useState();
    const [infoForm, setInfoForm] = useState(emptyForm);
    const [files, setFiles] = useState([]);
    const [warningModal, setWarningModal] = useState({open: false});
    const [formErrors, setFormErrors] = useState({});
    const [sendData, setSendData] = useState({open: false});


    let history = useHistory();
   
    const steps = getSteps();

    const handleOkWarningModal = () => setWarningModal({...warningModal, open: false});

    const handleNext = () => {
        if(activeStep === steps.length - 1){
            const dataToSend =  {...infoForm, ...chosenLocation, imagenes: files, estado: 'perdido'};
            const formValid = formValidation(dataToSend, setActiveStep, setWarningModal, setFormErrors);
            // apiPost(dataToSend, history);
            // setActiveStep((prevActiveStep) => prevActiveStep + 1)
            console.log('send data? ' + formValid)

            if(formValid){
                setSendData({open: true, data: dataToSend})
            }

            // history.push('/');
        }
        else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                            <SendModal open={sendData.open} data={sendData.data}/>
                            {getStepContent(
                                activeStep,
                                {
                                    chosenLocation: chosenLocation, 
                                    'setChosenLocation': setChosenLocation,
                                    infoForm: infoForm, 
                                    setInfoForm: setInfoForm,
                                    formErrors: formErrors,
                                    files: files,
                                    setFiles: setFiles,
                                }
                            )}
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