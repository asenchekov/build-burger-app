import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "../actions/actionTypes";
import { updateObject } from '../utility';


const initalState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case AUTH_SUCCESS:
            return updateObject(state, {
                token: action.authData.idToken,
                userId: action.authData.localId,
                error: null,
                loading: false
            });
        case AUTH_FAILED:
            return updateObject(state, {error: action.error, loading: false});
        case AUTH_LOGOUT:
            return updateObject(state, {token: null, userId: null});
        case SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path});
        default:
            return state;
    }
};

export default reducer;