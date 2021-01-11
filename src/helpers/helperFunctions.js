export function apiPost(imagen){
    const formData = new FormData();
    formData.append("email_usuario", "gabrielbacar@gmail.com");
    formData.append("estado", "encontrado");
    formData.append("fecha_publicado", "2020-12-22T23:49:00Z");
    formData.append("longitud", "41.403380");
    formData.append("latitud", "2.174030");
    formData.append("fecha_perdido", "2020-12-22");
    formData.append("descripcion_lugar", "Por multiplaza");
    formData.append("descripcion_animal", "Raza maltes con pelaje blanco");
    formData.append("nombre_animal", "''");
    formData.append("raza", "Maltés");
    formData.append("microchip", 1231231231);
    formData.append("imagen_1", imagen);
    formData.append("nombre_contacto", "Gabriel");
    formData.append("email_contacto", "gabrielbacar@gmail.com");
    formData.append("numero_contacto", "62907250");

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
    .then(json => console.log(json)); 

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