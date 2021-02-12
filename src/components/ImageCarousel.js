import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@material-ui/core'

var style = {
    maxHeight: '350px',
    textAlign: 'center',
    width: '350px'
    
}

export default function ImageCarousel(props)
{
    console.log(props.images)
    return (
        <Carousel fullHeightHover={false} 
        style={{backgroundColor: 'black'}} 
        navButtonsAlwaysInvisible={props.images.length === 1} 
        indicators={props.images.length !== 1}
        autoPlay={false}
        >
            {                
                props.images.map( (img, i) => 
                    <div style={{width: '100%', display: 'flex', justifyContent:'center'}}> 
                    <img key={i} src={img} style={style}/>
                    </div> 
                )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}