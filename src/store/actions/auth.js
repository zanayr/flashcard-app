import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authFail = (data) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: data.response.data.error
    };
};
export const authStart = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCC,
        payload: {
            token: token,
            userId: userId
        }
    };
};
export const authOut_async = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_OUT
    }
}

export const authCheckTimeout_async = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authOut_async());
        }, expirationTime * 1000);
    };
}
export const authCheckState_async = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authOut_async());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authOut_async());
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
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authCheckTimeout_async(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    }
}