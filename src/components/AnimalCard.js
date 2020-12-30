import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  mainContent: {
    display: 'box',
    lineClamp: 4,
    boxOrient: 'vertical',  
    overflow: 'hidden',
  }
});

export default function AnimalCard(props) {
    const classes = useStyles();
    console.log(props)


    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="https://dupbackend.herokuapp.com/media/images/descarga.jfif"
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom noWrap variant="h5" component="h2">
                Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.mainContent}>
                Lizards are a widespread group of squamateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee reptiles, with over 6,000 species, ranging
                across all continents except Antarctica dasssssssssssssssssssssssssssssssssddddddddddddddddddddddddddddddddddddddddddddddddddd
                sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Compartir
            </Button>
            <Button size="small" color="primary">
            Más Información
            </Button>
        </CardActions>
        </Card>
    );
}