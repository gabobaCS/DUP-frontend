import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CountrySelect from '../components/CountrySelect.js'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        border: '1px solid #eeeeee'          
    },
}));

export default function EncuentroForm(props) {
  const classes = useStyles();
  
  const handleChange = (event) => {
    props.setInfoForm({...props.infoForm, [event.target.name]: event.target.value})
  };

  const handleAutocompete = (event, newValue) => {
      props.setInfoForm({...props.infoForm, pais: newValue});
      console.log(newValue)
  }

  return (
        <Box border={1} p={3} paddingBottom={6} borderRadius={5} borderColor="grey.400" className={classes.root}>
            <Typography variant='h6' style={{ fontWeight: 600, marginBottom: '10px' }} paragraph>Descripción General</Typography>
            <Typography paragraph style={{marginBottom: '10px'}}>De una descripción breve de la mascota, el lugar y las condiciones en las que fue perdido, que pueda ayudar a localizarlo. </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                    required
                    error={props.formErrors.descripcionEncuentro}
                    id="descripcionEncuentro"
                    name="descripcionEncuentro"
                    label="Último lugar donde fue visto"
                    value={props.infoForm.descripcionEncuentro}
                    onChange={handleChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    error={props.formErrors.descripcionAnimal}
                    id="descripcionAnimal"
                    name="descripcionAnimal"
                    label="Descripción del animal"
                    value={props.infoForm.descripcionAnimal}
                    onChange={handleChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required error={props.formErrors.especie}>
                        <InputLabel id="especie">Especie</InputLabel>
                            <Select
                            name='especie'
                            labelId="especie"
                            id="especie"
                            value={props.infoForm.especie}
                            onChange={handleChange}
                            >
                                <MenuItem value={10}>Perro</MenuItem>
                                <MenuItem value={20}>Gato</MenuItem>
                                <MenuItem value={30}>Pájaro</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="raza"
                        name="raza"
                        label="Raza"
                        value={props.infoForm.raza}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="microchip"
                        name="microchip"
                        label="Número de Microchip"
                        type='number'
                        value={props.infoForm.microchip}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="nombreAnimal" 
                        name="nombreAnimal" 
                        label="Nombre al que responde"
                        value={props.infoForm.nombreAnimal}
                        onChange={handleChange} 
                        fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        id="informacionAdicional" 
                        name="informacionAdicional" 
                        label="Información Adicional"
                        value={props.infoForm.informacionAdicional}
                        onChange={handleChange} 
                        fullWidth />
                </Grid>
            </Grid>
            <Typography variant='h6' style={{ fontWeight: 600, marginBottom: '10px', marginTop: '25px' }} paragraph>Información de Contacto</Typography>
            <Typography paragraph style={{marginBottom: '10px'}}>En caso de que el animal sea encontrado, provea información que permita contactarlo. </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error={props.formErrors.nombreContacto}
                        id="nombreContacto"
                        name="nombreContacto"
                        label="Nombre completo"
                        value={props.infoForm.nombreContacto}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error={props.formErrors.email}
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={props.infoForm.email}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        error={props.formErrors.telefono}
                        id="telefono"
                        name="telefono"
                        label="Número de teléfono"
                        type="tel"
                        value={props.infoForm.telefono}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CountrySelect value={props.infoForm.pais} handleChange={handleAutocompete} error={props.formErrors.pais}/>
                </Grid>
            </Grid>                       
        </Box>



  );
}