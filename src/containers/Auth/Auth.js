import classes from './Auth.css';
import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionTypes from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/spinner/spinner';
import {Redirect} from 'react-router-dom'


class Auth extends  Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your email address'
                },
                value:'',
                validation:{
                        required:true ,
                        isEmail: true                  
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter your password'
                },
                value:'',
                validation:{
                        required:true,
                        minLength:6                  
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    checkValidity=(value, rules)=>{
        let isValid=true;
        
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid= value.trim() !== "" && isValid
        }
        if(rules.isEmail){
            var pattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid= pattern.test(value) && isValid
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    submitHandler=(e)=>{
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    signUpHandler=()=>{
        this.setState(prevState=>{
           return  {isSignup:!prevState.isSignup}
        })
    }
    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedAuthForm={
            ...this.state.controls
        }
        const AuthformElements={
            ...this.state.controls[inputIdentifier]
        }
        AuthformElements.value= event.target.value;
        AuthformElements.touched= true;
        AuthformElements.valid= this.checkValidity(AuthformElements.value, AuthformElements.validation);
        updatedAuthForm[inputIdentifier]= AuthformElements;

        this.setState({
            controls:updatedAuthForm
        })
    }

    render(){
        let formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form=( <form >
            { formElementsArray.map((formElement)=>{
            return  <Input  key ={formElement.id} elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            Invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}/>
            })}
            <Button btnType="Success" clicked={(e)=>this.submitHandler(e)}>Submit</Button>
        </form>);
            if(this.props.loading){
                form=<Spinner/>
            }

            let errorMessage= null;
            if(this.props.error){
                errorMessage=<p style={{color:'red',fontWeight:'bold'}}>{this.props.error.message}</p>
            }
            let authenticatedUser= null;
            if(this.props.isAuthenticated){
                authenticatedUser=<Redirect to="/"/>
            }
        return(
            <div className={classes.Auth} >
                {authenticatedUser}
                 {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.signUpHandler}>Switch To {this.state.isSignup ? 'Signup' :'Signin'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password, isSignup)=> dispatch(actionTypes.auth(email,password, isSignup))
    }
}
const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);