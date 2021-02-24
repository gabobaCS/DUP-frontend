import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {listadoDePaises} from '../helpers/listadoDePaises.js'

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect(props) {
  console.log(props)
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(props.value.nombre);


  return (
    <Autocomplete
      id="pais"
      name='pais'
      style={{ width: '100%' }}
      options={listadoDePaises}
      classes={{
        option: classes.option,
      }}

      value={props.value}
      onChange={props.handleChange}

      inputValue={inputValue}
      onInputChange={(event, newValue) => setInputValue(newValue)}

      autoHighlight
      disableClearable
      fullWidth

      getOptionSelected={(option, value) => (option == value || value != '')}

      getOptionLabel={(option) => option.nombre}
      renderOption={(option) => (
        <React.Fragment>
           {option.nombre}  (+{option.phone_code}) 
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="País"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          error={props.error}
          required
          fullWidth
        />
      )}

    />
  );
}

