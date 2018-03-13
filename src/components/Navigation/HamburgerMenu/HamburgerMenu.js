import React from 'react';
import classes from './HamburgerMenu.css'

const hamburgerMenu = (props) =>{
    return(
        <div onClick={props.menuToggle} className={classes.HamburgerMenu}>
        <div></div>
        <div></div>
        <div></div>
        </div>
    )
}
export default hamburgerMenu;