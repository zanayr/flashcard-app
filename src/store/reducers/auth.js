import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    error: null,
    isLoading: false,
    refesh: null,
    token: null,
    user: null,
};


const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        isLoading: false
    });
};
const authEnded = (state, action) => {
    return updateObject(state, {
        token: null,
        user: null
    });
};
const authInitiated = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true
    });
};
const authSucceeded = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user
    });
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_FAIL:
            return authFailed(state, action);
        case actionTypes.AUTH_OUT:
            return authEnded(state, action);
        case actionTypes.AUTH_INIT:
            return authInitiated(state, action);
        case actionTypes.AUTH_SUCC:
            return authSucceeded(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  --------------------------------------------------- SELECTORS  //
export function selectAuthError (state) {
    return state.error;
}
export function selectAuthIsLoading (state) {
    return state.isLoading;
}
export function selectAuthToken (state) {
    return state.token;
}
export function selectAuthUser (state) {
    return state.user;
}


export default reducer;