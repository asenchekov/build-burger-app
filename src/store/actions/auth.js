import axios from 'axios';

import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "./actionTypes";


export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBSl1vrPGXsL9Q1_ak5w69RRPHflWGsTnI';
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBSl1vrPGXsL9Q1_ak5w69RRPHflWGsTnI';
        }

        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expires', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expires'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({idToken: token, localId: userId}));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); 
            }
        }
    }
}