import axios from '../../axios-order';
import * as actionTypes from './actionsType';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (payload) => {
    return dispatch => {
        dispatch(authStart());
        let url ='/Log-in';
        axios.post(url, payload)
            .then(response => {
                // dispatch(authFail(response.data.error));
                const exp =response.data.auth.expIn
                const expirationDate = new Date(new Date().getTime() + exp * 1000);
                console.log(expirationDate)
                localStorage.setItem('token', response.data.auth.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.auth.userID);
                dispatch(authSuccess(response.data.auth.token, response.data.auth.userID));
                dispatch(checkAuthTimeout(response.data.auth.expIn));
                

            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));

            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log(expirationDate)
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};