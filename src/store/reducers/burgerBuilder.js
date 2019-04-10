import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGERDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            const updatedIngredient =  { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGERDIENT_PRICES[action.ingredientName],
                building: true                
            }
            return updateObject(state, updatedState);
        case REMOVE_INGREDIENT:
            const updatedIng =  { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGERDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedSt);
        case SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            });
        case FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
};

export default reducer;