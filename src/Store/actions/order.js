import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess= (id, orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}
export const purchaseBurgerFail= (error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START

    }
}
export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}
export const purchaseBurger= (token,orderData)=>{
    console.log(orderData);
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then( response => {
            console.log(response);
           dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error=> {
          dispatch(purchaseBurgerFail(error));
        });
    }
}

export const fetchOrdersStart=()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess=(res)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:res.data
    }
}
export const fetchOrdersFail=()=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders=(token, userId)=>{
    const queryParams= '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    return dispatch=>{
        dispatch(fetchOrdersStart());
        axios.get('/orders.json' + queryParams)
        .then((res) =>{
            dispatch(fetchOrdersSuccess(res))
        })
        .catch((err)=>{
            dispatch(fetchOrdersFail())
        })
    }
}