import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    marginPadding:{
        margin: 0,
        padding: 0
    },
    scrollerContainer: {
        color: '#3BD7FF',
        height: '100%',
        width: '100vw',
        margin: '0',
        padding: '0'
    },
    expandIcon:{
        fontSize: 90,
    },

});


export default function Scroller(){
    const classes = useStyles();
    return (
        <Box display='flex' justifyContent='center' alignItems='center' className={classes.scrollerContainer} >
            <IconButton className={classes.marginPadding} style={{ backgroundColor: 'transparent' }} color="inherit">
                <ExpandMoreIcon className={classes.expandIcon}/>
            </IconButton>


        </Box>
    );
}