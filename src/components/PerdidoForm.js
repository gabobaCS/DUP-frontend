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


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
    }},
}));

export default function EncuentroForm() {
  const classes = useStyles();

  return (
        <Box border={1} p={3} paddingBottom={6} borderRadius={5} borderColor="grey.400" >
            <Typography variant='h6' style={{ fontWeight: 600, marginBottom: '10px' }} parragraph>Descripción General</Typography>
            <Typography parragraph style={{marginBottom: '10px'}}>De una descripción breve de la mascota, el lugar y las condiciones en las que fue perdido, que pueda ayudar a localizarlo. </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                    required
                    id="descripcionEncuentro"
                    name="descripcionEncuentro"
                    label="Último lugar donde fue visto"
                    fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="descripcionAnimal"
                    name="descripcionAnimal"
                    label="Descripción del animal"
                    fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                        <InputLabel id="especie">Especie</InputLabel>
                            <Select
                            labelId="especie"
                            id="especie"
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
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField

                        id="microchip"
                        name="microchip"
                        label="Número de Microchip"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="nombreAnimal" name="nombreAnimal" label="Nombre al que responde" fullWidth />
                </Grid>
            </Grid>
            <Typography variant='h6' style={{ fontWeight: 600, marginBottom: '10px', marginTop: '25px' }} parragraph>Información de Contacto</Typography>
            <Typography parragraph style={{marginBottom: '10px'}}>En caso de que el animal sea encontrado, provea información que permita contactarlo. </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="nombreContacto"
                        name="nombreContacto"
                        label="Nombre completo"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="telefono"
                        name="telefono"
                        label="Número de teléfono"
                        fullWidth
                    />
                </Grid>
            </Grid>                       
        </Box>



  );
}