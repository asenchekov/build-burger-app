import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from "./actionTypes";
import axios from '../../axios-orders';


export const addIngredient = (ingName) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName : ingName
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName : ingName
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-app-react-c5df6.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};

export const setIngredients = ingredients => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    };
}