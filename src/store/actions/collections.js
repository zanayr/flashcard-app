import * as actionTypes from './actionTypes';
import axios from '../database';


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

//  GET ASYNC  //
export const get_async = (url, token, user) => {
    return dispatch => {
        dispatch(getInit());
        axios.get('/' + url + '.json?auth=' + token + '&orderBy="userId"&equalTo="' + user + '"')
        .then(response => {
            const models = {};
            for (let key in response.data) {
                models[key] = {...response.data[key]};
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
            data: data,
            key: key,
            store: store
        }
    }
}

//  POST ASYNC  //
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