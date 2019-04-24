import * as actionTypes from './actionTypes';
import {createHashId} from '../../utility';

export const modalCreate = (payload) => {
    payload.data.id = createHashId();
    return {
        type: actionTypes.MODAL_CREATE,
        payload: payload
    };
};

export const modalClear = (payload) => {
    return {
        type: actionTypes.MODAL_CLEAR,
        payload: payload
    };
};