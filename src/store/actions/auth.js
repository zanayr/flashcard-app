import axios from 'axios';

import * as actionTypes from './actionTypes';
import * as create from '../models/models';

export const auth_fail = (data) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: data.response.data.error
    };
};
export const auth_init = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};
export const auth_success = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCC,
        payload: {
            token: token,
            user: user
        }
    };
};
export const auth_addUser = (model) => {
    return {
        type: actionTypes.ADD_USER,
        payload: model
    }
}
export const authOut_async = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    return {
        type: actionTypes.SIGN_OUT
    }
}

export const authCheckTimeout_async = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authOut_async());
        }, expirationTime * 1000);
    };
}
export const checkAuth_async = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authOut_async());
        } else {
            const expirationDate = new Date(localStorage.getItem('expiration'));
            if (expirationDate <= new Date()) {
                dispatch(authOut_async());
            } else {
                const user = localStorage.getItem('user');
                dispatch(auth_success(token, user));
                dispatch(authCheckTimeout_async((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
export const authSignIn_async = (cred) => {
    return dispatch => {
        dispatch(auth_init());
        const data = {
            email: cred.email,
            password: cred.password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
        axios.post(url, data)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expiration', expirationDate);
            localStorage.setItem('user', response.data.localId);
            dispatch(auth_success(response.data.idToken, response.data.localId));
            dispatch(authCheckTimeout_async(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(auth_fail(error));
        });
    }
}
export const authSignUp_async = (cred) => {
    return dispatch => {
        dispatch(auth_init());
        const data = {
            email: cred.email,
            password: cred.password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
        axios.post(url, data)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            const user = create.userModel(create.userViewModel(response.data.localId, {info: cred}));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expiration', expirationDate);
            localStorage.setItem('user', response.data.localId);
            axios.patch('https://egghead-ffc87.firebaseio.com/user/' + response.data.localId + '.json?auth=' + response.data.idToken, user)
            .then(secondResponse => {
                console.log(user);
                dispatch(auth_addUser(user));
                dispatch(auth_success(response.data.idToken, response.data.localId));
                dispatch(authCheckTimeout_async(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(auth_fail(error));
            });
        })
        .catch(error => {
            console.log('outer', error);
            dispatch(auth_fail(error));
        });
    }
}
// export const auth_async = (email, password, isSignUp) => {
//     return dispatch => {
//         dispatch(auth_init());
//         const data = {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         }
//         let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
//         if (!isSignUp) {
//             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCvVDv6Ia39hsDQkArR1Wo1f7i2Hj9QRM';
//         }

//         axios.post(url, data)
//         .then(response => {
//             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
//             localStorage.setItem('token', response.data.idToken);
//             localStorage.setItem('expiration', expirationDate);
//             localStorage.setItem('user', response.data.localId);
//             dispatch(auth_success(response.data.idToken, response.data.localId));
//             dispatch(authCheckTimeout_async(response.data.expiresIn));
//         })
//         .catch(error => {
//             dispatch(auth_fail(error));
//         });
//     }
// }