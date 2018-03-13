import React from 'react';
import classes from './Backdrop.css';

const backdrop =(props) =>{
    return (
        <div className={classes.Backdrop} onClick={props.clicked}
        style={{
            transform: props.show ? 'translateY(0)'  :'translateY(-100vh)',
            opacity:props.show ? '1':'0 '
        }}>
        {props.children}
        </div>
    )
}
export default backdrop;