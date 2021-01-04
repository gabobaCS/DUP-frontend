import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
  mainContent: {
    display: 'box',
    lineClamp: 4,
    boxOrient: 'vertical',  
    overflow: 'hidden',
  },
  text:{
    height: '92px'
  }
});

export default function AnimalCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={props.imagen}
            title="Contemplative Reptile"
            />
            <CardContent className={classes.text}>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.mainContent}>
              {props.descripcion_lugar}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" href="#compartir">
            Compartir
            </Button>
            <Button size="small" color="primary" href="#masinfo">
            Más Información
            </Button>
        </CardActions>
        </Card>
    );
}