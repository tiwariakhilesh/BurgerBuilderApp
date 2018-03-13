import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems= (props   ) =>{
    return <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
        {props.isAuth?<NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {props.isAuth ?<NavigationItem link="/logout" >Logout</NavigationItem> :
        <NavigationItem link="/login" >Login</NavigationItem>}
    </ul>
}
export default navigationItems;