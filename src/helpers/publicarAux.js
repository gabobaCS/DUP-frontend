import {emailChecker} from './helperFunctions.js';

export const formValidation = (dataToSend, setActiveStep, setWarningModal, setFormErrors) => {

    let errorValues = {}

    if (dataToSend.imagenes.length == 0){
        setWarningModal({
            message: 'Debe haber al menos una foto.', 
            open: true
        });
        setActiveStep(2);
    }

    if (!emailChecker(dataToSend.email)){
        console.log('email no valido');
        errorValues['email'] = true;
        setWarningModal({
            message: 'El email ingresado no es válido.', 
            open: true
        });
        setActiveStep(1);
    }


    for (let key in dataToSend){
        if (!Boolean(dataToSend[key]) && !(key === 'raza' || key === 'nombreAnimal' || key === 'microchip' || key === 'informacionAdicional')){
            console.log(key)
            setWarningModal({
                message: 'Todos los campos obligatorios deben estar llenos correctamente.', 
                open: true
            });
            errorValues[key] = true;
            setActiveStep(1);
        }
    }

    if(!dataToSend.pais.nombre){
        errorValues['pais'] = true;
        setWarningModal({
            message: 'Todos los campos obligatorios deben estar llenos correctamente.', 
            open: true
        });
    }
 

    setFormErrors(errorValues);
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