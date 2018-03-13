import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
];

const buildControls=(props) =>{
    return(
        <div className={classes.BuildControl}>
        <p>Current Price:<strong> {props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl)=>{
            return <BuildControl key={ctrl.label} 
            type={ctrl.label}
             added={()=> props.ingredientAdded(ctrl.type)}
            remove={()=>props.removed(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        })
        }
        <button className={classes.OrderButton}
         disabled={!props.purchasable}
         onClick={props.ordered}>{props.isAuth? 'Order Now' :'SignUp to Order'}</button>
        </div>
    )
   
}
export default buildControls;