import * as actionTypes from './actionTypes';
import axios from '../database';


//  GET  //
export const getFail = (error) => {
    return {
        type: actionTypes.GET_FAIL_ASYNC,
        payload: error
    }
}
export const getInit = () => {
    return {
        type: actionTypes.GET_INIT_ASYNC
    }
}
export const getSuccess = (data) => {
    return {
        type: actionTypes.GET_SUCC_ASYNC,
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