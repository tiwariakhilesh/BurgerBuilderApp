import React from 'react';
import Burger from '../../../Burger/Burger';
import Button from '../../Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes well</h1>
            <div style={{'width':'100%','margin':'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>cancel</Button>
            </div>
        </div>
    )
}
export default checkoutSummary;