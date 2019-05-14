import * as actionTypes from './actionTypes';
import * as create from '../models/models';

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
export const getUser_success = (user, data) => {
    return {
        type: actionTypes.GET_USER_SUCC,
        payload: {
            data: data,
            user: user
        }
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

//  User Filters  //
export const putTag_fail = (error) => {
    return {
        type: actionTypes.PUT_TAG_FAIL,
        payload: error
    }
}
export const putTag_success = (category, tags) => {
    return {
        type: actionTypes.PUT_TAG_SUCC,
        payload: {
            category: category,
            tags: tags
        }
    }
}

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
export const patchTab_fail = (error) => {
    return {
        type: actionTypes.PATCH_TAB_FAIL,
        payload: error
    }
}
export const patchTab_success = (data) => {
    return {
        type: actionTypes.PATCH_TAB_SUCC,
        payload: data
    }
}

//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Get  ----------------------------------------------------------------  Get Async //
export const getUser_async = (token, user) => {
    return dispatch => {
        dispatch(getUser_init());
        axios.get('/user/' + user + '.json?auth=' + token)
        .then(response => {
            dispatch(getUser_success(user, response.data));
        })
        .catch(error => {
            dispatch(getUser_fail(error));
        });
    };
};

//  Patch  ------------------------------------------------------------  Patch Async //
export const patchUser_async = (token, data) => {
    return dispatch => {
        axios.patch('/user/' + data.id + '.json?auth=' + token, data)
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
        axios.put('/user/' + data.id + '.json?auth=' + token, data)
        .then(response => {
            dispatch(putUser_success(data));
        })
        .catch(error => {
            dispatch(putUser_fail(error));
        });
    };
};


//  ASYNC TAG FUNCTIONS  ---------------------------------  ASYNC TAG FUNCTIONS  //
export const putTag_async = (url, token, user, tags) => {
    return dispatch => {
        axios.put('/user/' + user + '/' + url + '.json?auth=' + token, tags)
        .then(response => {
            dispatch(putTag_success(url, tags));
        })
        .catch(error => {
            dispatch(putTag_fail(error));
        });
    };
};


//  ASYNC TAB FUNCTIONS  ---------------------------------  ASYNC TAB FUNCTIONS  //
export const deleteTab_async = (token, user, data) => {
    return dispatch => {
        axios.delete('/user/' + user + '/tabs/' + data.id + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteTab_success(data.id));
        })
        .catch(error => {
            dispatch(deleteTab_fail(error));
        });
    };
};
export const patchTab_async = (token, user, data) => {
    return dispatch => {
        axios.patch('/user/' + user + '/tabs/' + data.id + '/.json?auth=' + token, create.tabModel(data))
        .then(response => {
            dispatch(patchTab_success(data));
        })
        .catch(error => {
            dispatch(patchTab_fail(error));
        });
    };
};