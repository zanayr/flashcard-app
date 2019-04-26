import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';


export const createDeleteModal_sync = (payload) => {
    console.log(payload);
    payload.key = createHashId();
    return {
        type: actionTypes.DELETE_MODAL,
        payload: payload
    };
};
export const clearModal_sync = (payload) => {
    return {
        type: actionTypes.CLEAR_MODAL,
        payload: payload
    };
};