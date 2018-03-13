import * as actionTypes from '../actions/actionTypes.js';

const initialState={
    orders:[],
    loading:false,
    purchased:false,
    fetchOrders:false
}
const reducer = (state= initialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder={
            ...action.orderData,
            id:action.orderId
        }
        return{
            ...state,
            loading:false,
            purchased:true,
            orders:state.orders.concat(newOrder)
        }
        case actionTypes.PURCHASE_BURGER_FAIL:
        return{
            ...state,
            loading:false
        }
        case actionTypes.PURCHASE_BURGER_START:
        return{
            ...state,
            loading:true
        }
        case actionTypes.PURCHASE_INIT:
        return{
            ...state,
            purchased:false
        }
        case actionTypes.FETCH_ORDERS_START:
        return{
            ...state,
            loading:true
        }
        case actionTypes.FETCH_ORDERS_SUCCESS:
        let data= action.orders,
        fetchedData=[];
        for(let key in data){
            fetchedData.push({
                ...data[key],
                id:key
            })
        }
        return{
            ...state,
            orders:fetchedData,
            loading:false
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                loading:false
            }
        default: return state;
        
    }
}

export default reducer;