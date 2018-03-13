import React ,{Component} from 'react';
import CheckoutSummary from '../../components/UI/orders/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import Aux from '../../hoc/auxillary';
import {connect} from 'react-redux';


class Checkout extends Component{
    

    checkoutContinueHandler=() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler=() =>{
        this.props.history.goBack();    
    }
    render(){
        let summary= <Redirect to="/"/>
        if(this.props.ings){
            const purchaseRedirect= this.props.purchased ? <Redirect to=""/> : null;
            summary=(<Aux>
                {purchaseRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                checkoutContinued={this.checkoutContinueHandler}
                checkoutCancelled={this.checkoutCancelledHandler}/>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </Aux>)
        }
        return summary;
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);