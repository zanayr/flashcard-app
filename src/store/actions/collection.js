import * as actionTypes from './actionTypes';
import axios from '../database';


//  DELETE  //
export const delete_fail = (error) => {
    return {
        type: actionTypes.DELETE_FAIL,
        payload: error
    };
};
export const delete_success = (store, id) => {
    return {
        type: actionTypes.DELETE_SUCC,
        payload: {
            id: id,
            store: store
        }
    };
};



//  GET  //
export const getAll_fail = (store, error) => {
    return {
        type: actionTypes.GET_FAIL,
        payload: {
            error: error,
            store: store
        }
    }
}
export const getAll_init = (data) => {
    return {
        type: actionTypes.GET_INIT,
        payload: data
    }
}
export const getAll_success = (store, data) => {
    return {
        type: actionTypes.GET_SUCC,
        payload: {
            data: data,
            store: store
        }
    }
}



//  POST  //
export const patch_fail = (error) => {
    return {
        type: actionTypes.PATCH_FAIL,
        payload: error
    }
}
export const patch_success = (store, data) => {
    return {
        type: actionTypes.PATCH_SUCC,
        payload: {
            data: data,
            store: store
        }
    }
}



//  PUT  //
export const put_fail = (error) => {
    return {
        type: actionTypes.PUT_FAIL,
        payload: error
    };
};
export const put_success = (store, data) => {
    return {
        type: actionTypes.PUT_SUCC,
        payload: {
            data: data,
            store: store
        }
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Delete  ---------------------------------------------------------  Delete Async  //
export const delete_async = (url, token, id) => {
    return dispatch => {
        axios.delete('/' + url + '/' + id + '.json?auth=' + token)
        .then(response => {
            dispatch(delete_success(url, id));
        })
        .catch(error => {
            dispatch(delete_fail(error));
        });
    };
};

//  Get  ----------------------------------------------------------------  Get Async //
export const getAll_async = (url, token, user) => {
    return dispatch => {
        dispatch(getAll_init(url));
        axios.get('/' + url + '.json?auth=' + token + '&orderBy="user"&equalTo="' + user + '"')
        .then(response => {
            dispatch(getAll_success(url, response.data));
        })
        .catch(error => {
            dispatch(getAll_fail(url, error));
        });
    };
};

//  Patch  ------------------------------------------------------------  Patch Async //
export const patch_async = (url, token, data) => {
    return dispatch => {
        axios.patch('/' + url + '/' + data.id + '.json?auth=' + token, data)
        .then(response => {
            dispatch(patch_success(url, data));
        })
        .catch(error => {
            dispatch(patch_fail(error));
        });
    };
};
export const put_async = (url, token, data) => {
    return dispatch => {
        axios.put('/' + url + '/' + data.id + '.json?auth=' + token, data)
        .then(response => {
            dispatch(put_success(url, data));
        })
        .catch(error => {
            dispatch(put_fail(error));
        });
    };
};