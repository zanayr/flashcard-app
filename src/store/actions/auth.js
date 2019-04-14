import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authFail = (data) => {
    console.log(data);
    return {
        type: actionTypes.AUTH_FAIL,
        payload: data.response.data.error
    };
};
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: data
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckTimeout_async = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}
export const auth_async = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
        }

        axios.post(url, data)
            .then(response => {
                dispatch(authSuccess(response.data));
                dispatch(authCheckTimeout_async(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}