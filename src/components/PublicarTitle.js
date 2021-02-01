import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function PublicarTitle(props){
    return(
        <React.Fragment>
            <Box style={{padding: '10px'}}>
                <Typography variant='h3'>{props.title}</Typography>
                <Typography style={{marginTop: '10px'}} variant='subtitle1'>{props.subtitle}</Typography>
            </Box>
        </React.Fragment>
    );
}

