import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your name'
                },
                value:'',
                validation:{
                        required:true,
                        minLength:3,
                        maxLength:20                   
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter your email'
                },
                value:'',
                validation:{
                        required:true                  
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your zipcode'
                },
                value:'',
                validation:{
                        required:true,
                        minLength:5,
                        maxLength:6                   
                },
                valid:false,
                touched:false
            },
            city:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your city'
                },
                value:'',
                validation:{
                        required:true,
                        minLength:5,
                        maxLength:30                   
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            },
        },
        loading:false,
        isFormValid:false
    }
    checkValidity=(value, rules)=>{
        let isValid=true;
        
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid= value.trim() !== "" && isValid
        }
        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid= value.length <= rules.maxLength && isValid
        }
        return isValid;
    }
    orderHandler= (event)=>{    
        event.preventDefault();
            this.setState({
                    loading:true
                });
        let formOrder={};
        for(let forminputIdentifier in this.state.orderForm){
            formOrder[forminputIdentifier]=this.state.orderForm[forminputIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            customerDetails:formOrder,
            userId: this.props.userId
           
        }
        this.props.onBurgerPurchase(this.props.token,order);
    }
    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedOrderForm= {
            ...this.state.orderForm
        };
        const orderformElements={
            ...updatedOrderForm[inputIdentifier]
        };
        orderformElements.value= event.target.value;
        orderformElements.touched= true;
        updatedOrderForm[inputIdentifier]= orderformElements;
        updatedOrderForm[inputIdentifier].valid= this.checkValidity(orderformElements.value,orderformElements.validation);

        //validity of elements to make order button enable or disable
        let formValidity= true;
        for(let elementsToValidate in updatedOrderForm){
            formValidity= updatedOrderForm[elementsToValidate].valid && formValidity;
        }
        this.setState({
            orderForm:updatedOrderForm,
            isFormValid:formValidity
        });
    }
    render(){
        let formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=( <form>
            { formElementsArray.map((formElement)=>{
            return  <Input  key ={formElement.id} elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            Invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}/>
            })}
            <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner/>
        }
    
        return (
            <div className={classes.ContactData}>
            <h3>Enter Contact Details</h3>
            {form}
            </div>
        )
    }
}
const mapStatetoProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        userId:state.auth.userId,
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onBurgerPurchase: (token,orderData)=>{ dispatch(actions.purchaseBurger(token,orderData))}
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));