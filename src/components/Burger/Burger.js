import React from 'react';
import classes from './Burger/Burger.css';
import Burgeringredient from './Burger/BurgerIngredient/BurgerIngredient'

const burger=(props)=>{
    let transformedIngredients= Object.keys(props.ingredients)
    .map((ingkey)=>{return [...Array(props.ingredients[ingkey])]
        .map((_,i)=> {
            return <Burgeringredient key={ingkey + i} type={ingkey}/>
        })
    }).reduce((arr,el)=> {
        return arr.concat(el);
    }, []);

   if(transformedIngredients.length === 0){
       transformedIngredients=<p>Please start adding ingredients</p>
   }
    return (
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top"/>
            {transformedIngredients}
            <Burgeringredient type="bread-bottom"/>
        </div>
    )
}
export default burger;