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

//  Tabs  //
export const deleteTab_fail = (error) => {
    return {
        type: actionTypes.DELETE_TAB_FAIL,
        payload: error
    }
}
export const deleteTab_success = (data) => {
    return {
        type: actionTypes.DELETE_TAB_SUCC,
        payload: data
    }
}
export const patchUserTab_fail = (error) => {
    return {
        type: actionTypes.PATCH_TAB_FAIL,
        payload: error
    }
}
export const patchUserTab_success = (data) => {
    return {
        type: actionTypes.PATCH_TAB_SUCC,
        payload: data
    }
}

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


//  ASYNC TAB FUNCTIONS  ---------------------------------  ASYNC TAB FUNCTIONS  //
export const deleteUserTab_async = (token, auth, id) => {
    return dispatch => {
        axios.delete('/users/' + auth + '/tabs/' + id + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteTab_success(id));
        })
        .catch(error => {
            dispatch(deleteTab_fail(error));
        });
    };
};
export const patchUserTab_async = (token, auth, data) => {
    return dispatch => {
        axios.patch('/users/' + auth + '/tabs.json?auth=' + token, data)
        .then(response => {
            dispatch(patchUserTab_success(data));
        })
        .catch(error => {
            dispatch(patchUserTab_fail(error));
        });
    };
};