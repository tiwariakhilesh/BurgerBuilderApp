import React, {Component} from 'react';
import Orders from '../../components/UI/orders/orders';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/spinner/spinner'
class OrdersContainers extends Component{
   componentDidMount(){
       this.props.onFetchOrderHandler(this.props.token, this.props.userId);
   }
    
    render(){
        let orderContainer=<Spinner/>
        if(!this.props.loading){
            orderContainer=(
                this.props.orders.map((order,i)=>{
                    
                    return (
                        <div key={order.id}>
                        <h3>Order : {i+1}</h3>
                       <Orders  ingredients={order.ingredients} price={order.price}/>
                       </div>
                    )
                })
            )
        }
        return (
            <div style={{width:'80%',margin:'0 auto',textAlign:'center'}}>
                 <h1>Your Order details</h1>
                 {orderContainer}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        loading:state.order.loading,
        orders:state.order.orders,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps= dispatch=>{
    return{
        onFetchOrderHandler:(token, userId)=>dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrdersContainers,axios));