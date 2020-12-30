import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ReactComponent as LogoBig} from '../images/DUPLogo.svg';
import {ReactComponent as LogoSmall} from '../images/DUPLogoSmall.svg';
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#3BD7FF"
    },
    menu:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    logoHeader: {
        '&:hover':{
            cursor:"pointer"
        }
    },
    button:{
        color:"white"
    }
});


function Header(){
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    let history = useHistory();

    return(
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.menu}>
                        <LogoSmall id="logo-header" onClick={() => history.push('/')} className={classes.logoHeader} style={{display: matches?"none":''}}></LogoSmall>
                        <LogoBig style={{flex:1}} onClick={() => history.push('/')} id="logo-header"  className={classes.logoHeader} style={{display: matches?'':"none"}}></LogoBig>
                        <IconButton className={classes.button}>
                            <PublishIcon className={classes.menu} style={{fontSize:"50px"}}/>
                        </IconButton>
                </Toolbar>
            </AppBar>
    )
}
export default Header;

