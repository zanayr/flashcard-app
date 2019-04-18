import * as actionTypes from './actionTypes';

export const modalCreate = (message) => {
    return {
        type: actionTypes.MODAL_CREATE,
        payload: {
            message: message,
            modalId: Math.floor(((Date.now() + Math.random()) * 10)).toString(36).substr(2, 9)
        }
    };
};

export const modalConfirm = (id) => {
    console.log(id);
    return {
        type: actionTypes.MODAL_CONFIRM,
        payload: {
            id: id
        }
    };
};