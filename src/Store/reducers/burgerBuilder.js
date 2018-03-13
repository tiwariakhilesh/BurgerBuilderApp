import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:30,
    error:false
}
const INGREDIENT_PRICES={
    bacon:10,
    salad:15,
    meat:25,
    cheese:20
}
const addIngredients=(state,action)=>{
    return{
        ...state.ingredients,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
}
const removeIngredients=(state, action)=>{
    return{
        ...state.ingredients,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
}
const setIngredients=(state,action)=>{
    return{
        ...state,
        ingredients: {
            salad: action.ingredients.salad,// it could be ingredients:action.ingredients... i just order the recipies used in burger
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error:false,
        totalPrice:30
    }
}
const fetchIngredientsFail=(state, action)=>{
    return{
        ...state,
        error:true
    }
}
const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:return addIngredients(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state,action);
        default: return state;
    }
   
}
export default reducer;