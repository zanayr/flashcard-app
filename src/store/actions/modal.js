import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';


export const displayModal = (type, data) => {
    return {
        type: actionTypes.DISPLAY_MODAL,
        payload: {
            data: data,
            type: type
        }
    };
};
export const clearModal = payload => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};