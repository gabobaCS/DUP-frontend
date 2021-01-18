import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container:{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '4px',
      border: '1px solid #eeeeee',
      textAlign:'center'
    },
    thumbsContainer:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
    },
    thumb:{
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 150,
      height: 150,
      padding: 4,
      boxSizing: 'border-box',
      cursor: 'pointer',
      '&:hover':{
        opacity: 0.6
      }
    },
    thumbInner:{
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden'
    },
    img:{
      display: 'block',
      width: 'auto',
      height: '100%'
    }
  }));