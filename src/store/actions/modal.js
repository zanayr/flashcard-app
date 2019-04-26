import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';


export const displayModal = (type, payload) => {
    return {
        type: actionTypes.DISPLAY_MODAL,
        payload: {
            ...payload,
            type: type
        }
    };
};
export const clearModal = (payload) => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};