import * as actionTypes from './actionTypes';
import axios from '../database';


//  DELETE  //
export const deleteFail = (error) => {
    return {
        type: actionTypes.DELETE_FAIL,
        payload: error
    };
};
export const deleteSuccess = (store, key) => {
    return {
        type: actionTypes.DELETE_SUCC,
        payload: {
            key: key,
            store: store
        }
    };
};
export const delete_async = (url, token, key) => {
    return dispatch => {
        axios.delete('/' + url + '/' + key + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteSuccess(url, key));
        })
        .catch(error => {
            dispatch(deleteFail(error));
        });
    };
};


//  GET  //
export const getFail = (error) => {
    return {
        type: actionTypes.GET_FAIL,
        payload: error
    }
}
export const getInit = () => {
    return {
        type: actionTypes.GET_INIT
    }
}
export const getSuccess = (data) => {
    return {
        type: actionTypes.GET_SUCC,
        payload: data
    }
}
export const get_async = (url, token, user) => {
    return dispatch => {
        dispatch(getInit());
        axios.get('/' + url + '.json?auth=' + token + '&orderBy="userId"&equalTo="' + user + '"')
        .then(response => {
            const models = [];
            for (let key in response.data) {
                models.push({
                    key: key,
                    data: {
                        ...response.data[key],
                        isNew: false,
                        isDeleted: false
                    }
                });
            }
            dispatch(getSuccess({
                data: models,
                store: url
            }));
        })
        .catch(error => {
            dispatch(getFail(error));
        });
    };
};


//  POST  //
export const postFail = (error) => {
    return {
        type: actionTypes.POST_FAIL,
        payload: error
    }
}
export const postInit = () => {
    return {
        type: actionTypes.POST_INIT
    }
}
export const postSuccess = (store, key, data) => {
    return {
        type: actionTypes.POST_SUCC,
        payload: {
            data: {
                ...data,
                isNew: true,
                isDeleted: false
            },
            key: key,
            store: store
        }
    }
}
export const post_async = (url, token, data) => {
    return dispatch => {
        dispatch(postInit());
        axios.post('/' + url + '.json?auth=' + token, data)
        .then(response => {
            dispatch(postSuccess(url, response.data.name, data));
        })
        .catch(error => {
            dispatch(postFail(error));
        });
    };
};


//  PUT  //
export const putFail = (error) => {
    return {
        type: actionTypes.PUT_FAIL,
        payload: error
    };
};
export const putSuccess = (store, key, data) => {
    return {
        type: actionTypes.PUT_SUCC,
        payload: {
            data: data,
            key: key,
            store: store
        }
    };
};
export const put_async = (url, token, key, data) => {
    return dispatch => {
        axios.put('/' + url + '/' + key + '.json?auth=' + token, data)
        .then(response => {
            dispatch(putSuccess(url, response.data.name, data));
        })
        .catch(error => {
            dispatch(putFail(error));
        });
    };
};