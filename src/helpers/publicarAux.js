import React, { useState, useEffect } from 'react';
import PerdidoForm from '../components/PerdidoForm.js';
import EncontradoForm from '../components/EncontradoForm.js';
import PublicarTitle from '../components/PublicarTitle.js'
import ImageUpload from '../components/ImageUpload.js';
import LocationStep from '../components/LocationStep.js';

import {emailChecker} from './helperFunctions.js';

export function getSteps() {
    return ['Ubicación', 'Detalles del Encuentro', 'Imágenes'];
}

export function getStepContentPerdido(stepIndex, states) {
    
    switch (stepIndex) {
        case 0:
            return(
                <React.Fragment>
                    <PublicarTitle 
                        title='1. Ubicación'
                        subtitle='Por favor indique la localidad en la que fue visto por última vez.'
                    /> 
                    <LocationStep tipo='perdido' setLocation={states.setChosenLocation} location={states.chosenLocation}/>    
                </React.Fragment>

            );
        case 1:
        return (
            <React.Fragment>
                <PublicarTitle 
                    title='2. Información del Encuentro'
                    subtitle='Por favor complete el siguiente formulario indicando información general sobre el animal, así como información de contacto en caso de ser encontrado.'
                />             
                <PerdidoForm infoForm={states.infoForm} setInfoForm={states.setInfoForm} formErrors={states.formErrors}/>
            </React.Fragment>
        );
        case 2:
        return(
            <React.Fragment>
                <PublicarTitle 
                    title='3. Fotografías'
                    subtitle='Por favor suba imágenes claras del animal, que permitan facilitar su búsqueda y encuentro.'
                /> 
                <ImageUpload files={states.files} setFiles={states.setFiles}/>
            </React.Fragment>
        );
        case 3:
            return(
                <React.Fragment>

                </React.Fragment>
            );
        default:
        return 'Página no encontrada';
    }
}

export function getStepContentEncontrado(stepIndex, states) {
    
    switch (stepIndex) {
        case 0:
            return(
                <React.Fragment>
                    <PublicarTitle 
                        title='1. Ubicación'
                        subtitle='Por favor indique la localidad en la que fue encontrado.'
                    /> 
                    <LocationStep tipo='encontrado' setLocation={states.setChosenLocation} location={states.chosenLocation}/>    
                </React.Fragment>

            );
        case 1:
        return (
            <React.Fragment>
                <PublicarTitle 
                    title='2. Información del Encuentro'
                    subtitle='Por favor complete el siguiente formulario indicando información general sobre el animal, así como información de contacto en caso de ser encontrado.'
                />             
                <EncontradoForm infoForm={states.infoForm} setInfoForm={states.setInfoForm} formErrors={states.formErrors}/>
            </React.Fragment>
        );
        case 2:
        return(
            <React.Fragment>
                <PublicarTitle 
                    title='3. Fotografías'
                    subtitle='Por favor suba imágenes claras del animal, que permitan facilitar su búsqueda y encuentro.'
                /> 
                <ImageUpload files={states.files} setFiles={states.setFiles}/>
            </React.Fragment>
        );
        case 3:
            return(
                <React.Fragment>

                </React.Fragment>
            );
        default:
        return 'Página no encontrada';
    }
}


export const formValidation = (dataToSend, setActiveStep, setWarningModal, setFormErrors) => {
    let sendForm = true;
    let errorValues = {};

    if (dataToSend.imagenes.length == 0){
        setWarningModal({
            message: 'Debe haber al menos una foto.', 
            open: true
        });
        setActiveStep(2);
        sendForm = false;
    }

    if (!emailChecker(dataToSend.email)){
        console.log('email no valido');
        errorValues['email'] = true;
        setWarningModal({
            message: 'El email ingresado no es válido.', 
            open: true
        });
        setActiveStep(1);
        sendForm = false;
    }

    for (let key in dataToSend){
        if (!Boolean(dataToSend[key]) && !(key === 'raza' || key === 'nombreAnimal' || key === 'microchip' || key === 'informacionAdicional')){
            console.log(key)
            setWarningModal({
                message: 'Todos los campos obligatorios deben estar llenos.', 
                open: true
            });
            errorValues[key] = true;
            setActiveStep(1);
            sendForm = false;
        }
    }

    if(!dataToSend.pais.nombre){
        errorValues['pais'] = true;
        setWarningModal({
            message: 'Todos los campos obligatorios deben estar llenos.', 
            open: true
        });
        sendForm = false;
    }
 
    setFormErrors(errorValues);
    return (sendForm)
}

export const emptyForm = {
    descripcionEncuentro: '',
    descripcionAnimal: '',
    especie: '',
    raza: '',
    microchip: '',
    especie: '',
    nombreAnimal: '',
    informacionAdicional: '',
    nombreContacto: '',
    email: '',
    telefono: '',
    pais:  {"nombre":"","name":"","nom":"","iso2":"","iso3":"","phone_code":""} 
}