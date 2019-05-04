import * as actionTypes from './actionTypes';

export const clearModal = payload => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};

export const displayModal = (type, data, confirm, cancel, response, reject) => {
    return {
        type: actionTypes.DISPLAY_MODAL,
        payload: {
            data: {
                cancel: cancel,
                confirm: confirm,
                message: data,
                onConfirm: response,
                onCancel: reject
            },
            type: type
        }
    };
};
export const displayModal_async = (type, message, confirm='OK', cancel) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(displayModal(type, message, confirm, cancel, resolve, reject));
        });
    }
}