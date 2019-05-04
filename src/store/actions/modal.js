import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';


// export const displayModal = (type, data) => {
//     return {
//         type: actionTypes.DISPLAY_MODAL,
//         payload: {
//             data: data,
//             type: type
//         }
//     };
// };
export const clearModal = payload => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};

export const displayModal = (type, data, confirm, cancel, response) => {
    return {
        type: actionTypes.DISPLAY_MODAL,
        payload: {
            data: {
                cancel: cancel,
                confirm: confirm,
                message: data,
                onResponse: response
            },
            type: type
        }
    };
};
export const displayModal_async = (type, message, confirm='OK', cancel) => {
    console.log(confirm, cancel);
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(displayModal(type, message, confirm, cancel, resolve));
        });
    }
}


/*
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
*/