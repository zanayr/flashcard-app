import * as actionTypes from './actionTypes';

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