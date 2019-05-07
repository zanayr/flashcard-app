import * as actionTypes from './actionTypes';
import * as create from '../models/models';

import axios from '../database';


//  DELETE  //
export const deleteItem_fail = (error) => {
    return {
        type: actionTypes.DELETE_ITEM_FAIL,
        payload: error
    };
};
export const deleteItem_success = (data) => {
    return {
        type: actionTypes.DELETE_ITEM_SUCC,
        payload: data
    };
};



//  GET  //
export const getAllItems_fail = (store, error) => {
    return {
        type: actionTypes.GET_ITEMS_FAIL,
        payload: {
            error: error,
            store: store
        }
    }
}
export const getAllItems_init = (data) => {
    return {
        type: actionTypes.GET_ITEMS_INIT,
        payload: data
    }
}
export const getAllItems_success = (store, data) => {
    return {
        type: actionTypes.GET_ITEMS_SUCC,
        payload: {
            data: data,
            store: store
        }
    }
}



//  POST  //
export const patchItem_fail = (error) => {
    return {
        type: actionTypes.PATCH_ITEM_FAIL,
        payload: error
    }
}
export const patchItem_success = (data) => {
    return {
        type: actionTypes.PATCH_ITEM_SUCC,
        payload: data
    }
}



//  PUT  //
export const putItem_fail = (error) => {
    return {
        type: actionTypes.PUT_ITEM_FAIL,
        payload: error
    };
};
export const putItem_success = (data) => {
    return {
        type: actionTypes.PUT_ITEM_SUCC,
        payload: data
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Delete  ---------------------------------------------------------  Delete Async  //
export const deleteItem_async = (url, token, data) => {
    console.log(url, data);
    return dispatch => {
        axios.delete('/' + url + '/' + data.id + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteItem_success(url, data));
        })
        .catch(error => {
            dispatch(deleteItem_fail(error));
        });
    };
};
export const deleteManyItems_async = (url, token, data) => {
    return dispatch => {
        data.forEach(item => {
            dispatch(deleteItem_async(url, token, item));
        });
    }
};

//  Get  ----------------------------------------------------------------  Get Async //
export const getAllItems_async = (url, token, user) => {
    return dispatch => {
        dispatch(getAllItems_init(url));
        axios.get('/' + url + '.json?auth=' + token + '&orderBy="owner"&equalTo="' + user + '"')
        .then(response => {
            dispatch(getAllItems_success(url, response.data));
        })
        .catch(error => {
            dispatch(getAllItems_fail(url, error));
        });
    };
};


//  Patch  ------------------------------------------------------------  Patch Async //
export const patchItem_async = (url, token, data) => {
    return dispatch => {
        axios.patch('/' + url + '/' + data.id + '.json?auth=' + token, create.itemModel(data))
        .then(response => {
            dispatch(patchItem_success(url, data));
        })
        .catch(error => {
            dispatch(patchItem_fail(error));
        });
    };
};
export const patchManyItems_async = (url, token, data) => {
    return dispatch => {
        data.forEach(item => {
            dispatch(patchItem_async(url, token, item));
        });
    }
};

//  Pute  ---------------------------------------------------------------  Put Async //
export const putItem_async = (url, token, data) => {
    return dispatch => {
        axios.put('/' + url + '/' + data.id + '.json?auth=' + token, create.itemModel(data))
        .then(response => {
            dispatch(putItem_success(url, data));
        })
        .catch(error => {
            dispatch(putItem_fail(error));
        });
    };
};