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
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authCheckTimeout_async = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
}
export const authCheckState_async = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authCheckTimeout_async((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data));
                dispatch(authCheckTimeout_async(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}