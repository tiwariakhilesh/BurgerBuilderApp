import React, {Component} from 'react';
import * as actionTypes from '../../../Store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout()
    }
    render(){
        return <Redirect to="/"/>
    }
}
const mapDispatchToState= dispatch=>{
    return {
        onLogout:()=> dispatch(actionTypes.authLogout())
    }
}
export default connect(null,mapDispatchToState)(Logout);