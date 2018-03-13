import React from 'react';
import burgerLogoImage from '../../assets/Images/burger-logo.png';
import classes from './Logo.css'

const burgerLogo = ()=>{
    return (
        <div className={classes.Logo}>
            <img src={burgerLogoImage} alt="burgerLogo"/>
        </div>
    )
}
export default burgerLogo;