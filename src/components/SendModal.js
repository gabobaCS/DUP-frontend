import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {apiPost} from '../helpers/helperFunctions.js';
import WarningModal from '../components/WarningModal.js';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    modal:{
      outline: 'none',
    },
    loading:{
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    buttonProgress: {
        color: 'green',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    dialog:{
      textAlign: 'center'
    },
    modalTitle:{
      backgroundColor: '#3fc59d',
      color: 'white' ,
      padding: '40px 0',
      textAlign: 'center',
      fontSize: '30px'
    },
    modalIcon: {
      fontSize: '120px'
    },
    modalContent:{
      paddingBottom: '20px'
    }    

   
}));

  


export default function SendModal(props) {
    const classes = useStyles();
    const [successfulPost, setSuccessfulPost] = useState(false);

    useEffect(() => {
        console.log('changed props')
        if(props.open){
            // setLoading(true)
            console.log('data to send:')
            console.log(props.data)
            apiPost(props.data, setSuccessfulPost)
        } 
    },[props.open]);

    useEffect(() => {
      if(successfulPost){
        setTimeout(
          () => window.location.href = "http://localhost:3000/", 
          4000
        );
      }
  },[successfulPost]);


  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
  };
  return (
    <div>

        <Modal
            open={!successfulPost && props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <Box className={classes.loading} zIndex='100' style={{outline: 0}}>
              <CircularProgress size={68} />
          </Box>
        </Modal>



        <Dialog
            open={successfulPost && props.open}
            // open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={classes.dialog}

        >

          <DialogTitle id="alert-dialog-title"  className={classes.modalTitle}><CheckCircleOutlineIcon className={classes.modalIcon}/></DialogTitle>
          <DialogTitle >Información Enviada</DialogTitle>
          
          <DialogContent className={classes.modalContent} >
            <DialogContentText id="alert-dialog-description">
              La información ha sido correctamente añadida a la base de datos. Esperemos que pronto haya novedades.  
            </DialogContentText>
          </DialogContent>
      </Dialog>
    </div>
  );
}