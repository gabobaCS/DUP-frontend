import React, {useMemo, useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Box from '@material-ui/core/Box';
import {useDropzone} from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {useStyles} from './ImageUploadStyling.js';
import CancelOkModal from './CancelOkModal.js';
import WarningModal from './WarningModal.js';


const styles ={
    container:{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        border: '1px solid #eeeeee',
        textAlign:'center'
    }
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '80px 40px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#8c8c8c',
    fontSize: '20px',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
};
  
const activeStyle = {
    borderColor: '#2196f3'
  };
  
const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function ImageUpload(props) {
    const classes = useStyles();
    const [cancelOKModal, setCancelOkModal] = useState({open: false});
    const [warningModal, setWarningModal] = useState({open: false});
    const [imageKeys, setImageKeys] = useState(0);


    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        onDropAccepted: Acceptedfiles => handleOnDrop(Acceptedfiles),
        onDropRejected: rejectedFiles => handleOnDropRejected(rejectedFiles),
        maxSize: 20000000,
        maxFiles: 5
    });
  
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);

    // const closeModal = () => setShowModal(false);
    const handleOkWarningModal = () => setWarningModal({...warningModal, open: false});
  
    function handleOnDrop(acceptedFiles){
      if (props.files.length + acceptedFiles.length > 5){
        setWarningModal({...warningModal, open: true, message: 'Sólo se permiten 5 imágenes.'});
      }
      else{
        var key = imageKeys;
        props.setFiles(props.files.concat(acceptedFiles.map(file => {
          key++;
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
            'key': key
          })  
        }
        )));
        setImageKeys(key);        
      }      
    }

    function handleOnDropRejected(rejectedFiles){
      switch(rejectedFiles[0].errors[0].code){
        case 'too-many-files':
          setWarningModal({open: true, message: 'Sólo se permiten hasta 5 imágenes.'});
          break;

        case 'file-invalid-type':
          setWarningModal({open: true, message: 'Sólo se permiten archivos de imagen.'});
          break;
          
        case 'file-too-large':
          setWarningModal({open: true, message: 'El archivo es demasiado pesado. (Máx. 20mb por imagen).'});
          break;
      }
    }

    const handleCancelOnModal = () => setCancelOkModal({...cancelOKModal, open: false})
    function handleOkOnModal(){
      if (cancelOKModal.action == 'delete-image'){
        props.setFiles(props.files.filter(file => parseInt(file.key) !== parseInt(cancelOKModal.targetId)));
        handleCancelOnModal();
      }

    }
    function handleImageClick(event){
      setCancelOkModal({
        open: true, 
        title: 'Eliminar Imagen', 
        message: 'La imagen elegida será eliminada de la selección.',
        action: 'delete-image',
        targetId: event.currentTarget.getAttribute('id')
      })
      
    }

    

    const thumbs = props.files.map(file => (
      <div className={classes.thumb} key={file.key} id={file.key} onClick={handleImageClick}>
        <div className={classes.thumbInner}>
          <img
            src={file.preview}
            className={classes.img}
          />
        </div>
      </div>
    ));
  
  
    return (
      <React.Fragment>
        <WarningModal open={warningModal.open} message={warningModal.message} handleClose={handleOkWarningModal}/>
        <CancelOkModal 
          open={cancelOKModal.open} 
          title={cancelOKModal.title} 
          message={cancelOKModal.message}
          handleClose={handleCancelOnModal}
          handleOk ={handleOkOnModal} 
        />
        <div style={styles.container}>
          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
              <p>Arrastre una imagen o haga click aquí</p>
              <p style={{marginTop: 0}}> <i>(Se permite hasta un máximo de 5 imágenes)</i></p>
              <PublishIcon style={{ fontSize: 40 }} /> 
          </div>
          <aside className={classes.thumbsContainer}>
            {thumbs}
          </aside>
        </div>
      </React.Fragment>

    );
  }

