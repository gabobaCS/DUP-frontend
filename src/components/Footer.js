import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {ReactComponent as DogCatLogo} from '../images/logo.svg';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles({
    footerBox: {
        backgroundColor: '#3BD7FF',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        color: 'white',
    },
    svgFooter: {
        height: '150px',
        width: '150px'
    },
    logoTextBox:{
        margin: '10px 0'
    }
});

export default function Footer(){
    const classes = useStyles();

    return(
        <div style={{ width: '100%' }}>
        <Box display='flex' className={classes.footerBox} flexWrap="wrap" justifyContent='center' alignItems='center'>
          <Box >
            <DogCatLogo className={classes.svgFooter}/>
          </Box>
          <Box>
                <Typography component='p'variant="subtitle1">
                    <b>
                    CONTACTO
                    </b>
                </Typography>
                <Divider style={{backgroundColor: 'white', width: '30%'}}/>
                <Box display='flex' alignItems='center' className={classes.logoTextBox}>
                    <RoomIcon />
                    <Typography component='p' variant='subtitle1'>
                        Ciudad de Panamá, Panamá
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center' className={classes.logoTextBox}>
                    <EmailIcon />
                    <Typography component='p' variant='subtitle1'>
                        orgdameunapata@gmail.com
                    </Typography>
                </Box>
          </Box>
        </Box>
      </div>
    )
}
