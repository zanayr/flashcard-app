import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';


export const displayModal = (payload) => {
    payload.key = createHashId();
    return {
        type: actionTypes.DISPLAY_MODAL,
        payload: payload
    };
};
export const clearModal = (payload) => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};