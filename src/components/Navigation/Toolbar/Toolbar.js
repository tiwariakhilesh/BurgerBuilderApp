import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
const toolbar =(props)=>{
    return (
        <header className={classes.Toolbar}>
            <HamburgerMenu menuToggle={props.menuToggle}/>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            
            <nav className={classes.desktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    )
}
export default toolbar;