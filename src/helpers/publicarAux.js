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

export const emptyForm = {
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