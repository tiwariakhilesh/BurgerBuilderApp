import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
import {Route,Switch, withRouter, Redirect} from 'react-router-dom';
// import Orders from './containers/OrdersContainer/OrdersContainer';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';  
import * as actionTypes from './Store/actions/index';
import asyncComponent from './hoc/AsyncComponent'

class App extends Component {
  componentDidMount(){
    this.props.onAuthCheckStatus();
  }
  render() {
    //LazyLoading Start
    const AyncCheckout= asyncComponent(()=>{
      return import('./containers/Checkout/Checkout')
    });

    const AyncOrders= asyncComponent(()=>{
      return import('./containers/OrdersContainer/OrdersContainer')
    });
    const AyncAuth= asyncComponent(()=>{
      return import('./containers/Auth/Auth')
    });
    //Lazyloading end
    let routes= (
    <Switch> 
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/login" component={AyncAuth}/>
      <Redirect to="/"/>
    </Switch>
      );
      if(this.props.isAuthenticated){
        routes=(
          <Switch>
            <Route path="/checkout" component={AyncCheckout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/orders" component={AyncOrders}/>
            <Route path="/logout" component={Logout}/>
            <Redirect to="/"/>
          </Switch>
        )
      }
    return (
      <div>
       <Layout>
        {routes} 
       </Layout>
      </div>
    );
  }
}

const mapStateToProps= state=>{
  return{
    isAuthenticated:state.auth.token !== null
  }
}
const mapDispatchToProps =dispatch=>{
  return {
    onAuthCheckStatus: ()=> dispatch(actionTypes.authCheckStatus())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
