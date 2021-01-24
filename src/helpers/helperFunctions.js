import moment from 'moment';

//API POST call.
export function apiPost(data, history){
                        
    const formData = new FormData();
    formData.append("email_usuario", data.email);
    formData.append("estado", data.estado);
    formData.append("fecha_publicado", moment().format('YYYY-MM-DD HH:mm') );
    formData.append("longitud", data.lng);
    formData.append("latitud", data.lat);
    formData.append("fecha_perdido", "2020-12-22");
    formData.append("descripcion_lugar", data.descripcionEncuentro);
    formData.append("descripcion_animal", data.descripcionAnimal);
    formData.append("nombre_animal", "''");
    formData.append("raza", data.raza);
    formData.append("microchip", data.microchip);
    formData.append("imagen_1", data.imagenes[0]);
    formData.append("nombre_contacto", data.nombreContacto);
    formData.append("email_contacto", data.email);
    formData.append("numero_contacto", data.teléfono);

    fetch("https://dupbackend.herokuapp.com/animales/", { 
  
        // Adding method type 
        method: "POST", 
          
        // Adding body or contents to send 
        body: formData, 
          
        // Adding headers to the request 

    }) 
      
    // Converting to JSON 
    .then(response => response.json()) 
      
    // Displaying results to console 
    .then(json => {
        history.push('/');
        window.location.reload();
        console.log(json);
    }); 
}

export function emailChecker(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//Getting user Geolocation.
export function getUserGeolocation(setLocation){

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    function success(pos) {
        var crd = pos.coords;
        setLocation({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)});
        
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    if(navigator.geolocation){
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result){
            if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(success);

            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);

            } else if (result.state === "denied") {
                setLocation({lat: 8.983333, lng: -79.516670})
            //If denied then you have to show instructions to enable location.
            //TODO
            }
        })
    } 
}



// import * as helpers from '../helpers/helperFunctions.js';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));
// Form de Imagen
{/* <div className={classes.root}>
<input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange} />
<label htmlFor="icon-button-file">
    <IconButton color="primary" aria-label="upload picture" component="span">
    <PhotoCamera />
    </IconButton>
</label>
</div> */}

// export default function UploadButtons() {
//     const classes = useStyles();
//     const [imagen, setImagen] = useState();

//     const handleChange = (event) => {
//         console.log(event.target.files);
//         helpers.apiPost(event.target.files[0])
//         setImagen(event.target.files[0]);
//       };

//     return (

//     );
// }