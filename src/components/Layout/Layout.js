import React, {Component} from 'react';
import Aux from "../../hoc/auxillary";
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux'

class Layout extends Component{
    constructor(props){
        super(props);
        this.state={
            showsideDrawer:false
        }
    }
    sidedrawerCloseHandler =() =>{
        this.setState({
            showsideDrawer:false
        });
    }
    menuToggle = ()=>{
        this.setState({
            showsideDrawer:true
        });
    }
    render(){
        return(
        <Aux>
            <Toolbar menuToggle={this.menuToggle} isAuth={this.props.isAuthenticated}/>
            <Sidedrawer closed={this.sidedrawerCloseHandler} 
            open={this.state.showsideDrawer}
            isAuth={this.props.isAuthenticated}/>
            
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);