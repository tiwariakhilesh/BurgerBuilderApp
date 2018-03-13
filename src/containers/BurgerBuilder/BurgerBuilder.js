import React,{Component} from 'react';
import Aux from '../../hoc/auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Ordersummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'
import * as actions from '../../Store/actions/index';



class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            purchasing:false
        }
    }
    componentDidMount(){
        if(this.props.ings == null ){
            this.props.onInitIngredients();
        }
       
    }
    updatePurchasable =(ingredients)=>{
        if(this.props.ings){
            var total = Object.keys(ingredients).map((ingkey)=> {
                return ingredients[ingkey];
            }).reduce(((sum,el)=>{
                return sum + el;
            }),0);
            return  total >0;
        }
       }

    
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            })
        }
        else{
            this.props.history.push('/login');
        }
        
    }
    purchaseCancelHandler =() =>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinueHandler =() =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo= {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderContainer=null;
        if(this.props.ings){
            orderContainer=  <OrderSummary ingredients={this.props.ings} 
            price={this.props.totalPrice}
            purchasedCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>;
        }
        
        let burger= this.props.err ? 
        <p style={{'fontWeight':'bold','textAlign':'center'}}>Ingredients not getting load</p> : <Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                 removed={this.props.onIngredientRemoved}
                 disabled={disabledInfo}
                 totalPrice={this.props.totalPrice}
                 purchasable={this.updatePurchasable(this.props.ings)}
                 isAuth={this.props.isAuthenticated}
                 ordered={this.purchaseHandler}/>
                 </Aux>
            );
        }
         
        return(
            <Aux> 
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                   {orderContainer}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps= state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
 
}
const mapdispatchToProps =dispatch=> {
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase: ()=>dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(withErrorHandler(BurgerBuilder, axios));