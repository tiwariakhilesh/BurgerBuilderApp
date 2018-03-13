import React from 'react';
import Aux from '../../hoc/auxillary';
import Button from '../UI/Button/Button'

const orderSummary = (props) =>{
    const updateList= Object.keys(props.ingredients)
    .map( (ingKey, i) => {
        return (<li key={i}>{ingKey}: {props.ingredients[ingKey]}</li>)
    });
    return(
        <Aux>
            <h1>Your order summary</h1>
            <p>The following ingredients will be added to your Burger :</p>
            <ul>{updateList}</ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <Button clicked={props.purchasedCancelled} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">Continue</Button>
        </Aux>
    )
}
export default orderSummary;