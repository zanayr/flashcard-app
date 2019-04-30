import * as actionTypes from './actionTypes';
import axios from '../database';


//  Get  //
export const getUser_fail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        payload: error
    }
}
export const getUser_init = () => {
    return {
        type: actionTypes.GET_USER_INIT
    }
}
export const getUser_success = (data) => {
    return {
        type: actionTypes.GET_USER_SUCC,
        payload: data
    }
}
//  Patch  //
export const patchUser_fail = (error) => {
    return {
        type: actionTypes.PATCH_USER_FAIL,
        payload: error
    }
}
export const patchUser_success = (data) => {
    return {
        type: actionTypes.PATCH_USER_SUCC,
        payload: data
    }
}
//  Put  //
export const putUser_fail = (error) => {
    return {
        type: actionTypes.PUT_USER_FAIL,
        payload: error
    };
};
export const putUser_success = (data) => {
    return {
        type: actionTypes.PUT_USER_SUCC,
        payload: data
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Get  ----------------------------------------------------------------  Get Async //
export const getUser_async = (token, auth) => {
    return dispatch => {
        dispatch(getUser_init());
        axios.get('/users.json?auth=' + token + '&orderBy="auth"&equalTo="' + auth + '"')
        .then(response => {
            dispatch(getUser_success(response.data));
        })
        .catch(error => {
            dispatch(getUser_fail(error));
        });
    };
};

//  Patch  ------------------------------------------------------------  Patch Async //
export const patchUser_async = (token, data) => {
    return dispatch => {
        axios.patch('/users/' + data.id + '.json?auth=' + token, data)
        .then(response => {
            dispatch(patchUser_success(data));
        })
        .catch(error => {
            dispatch(patchUser_fail(error));
        });
    };
};

//  Put  ----------------------------------------------------------------  Put Async //
export const putUser_async = (token, data) => {
    return dispatch => {
        axios.put('/users/' + data.id + '.json?auth=' + token, data)
        .then(response => {
            dispatch(putUser_success(data));
        })
        .catch(error => {
            dispatch(putUser_fail(error));
        });
    };
};