import React from 'react';
import classes from './orders.css';
const orders = (props)=>{
   let ingredients=[];
    for(let ingredientName in  props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })

    }
    const ingredientOutput= ingredients.map((ing)=>{
    return <span key={ing.name} style={{textTransform:'capitalize',
    display:'inline-block',
    margin:'0 8px',
    border:'1px solid #ccc',
    padding:'5px'}}>
        {ing.name}:({ing.amount})</span>;
    })

    return (
        <div className={classes.Order}>
           <p>{ingredientOutput}</p>
           <p>Price: <strong>Rs.{props.price}</strong></p>
        </div>
    )
}
export default orders;