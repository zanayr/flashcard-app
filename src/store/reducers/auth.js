import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    error: null,
    loading: false,
    refeshToken: null,
    token: null,
    userId: null,
};


const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};
const authEnded = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};
const authInitiated = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};
const authSucceeded = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.payload.token,
        userId: action.payload.userId
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
export function selectToken (state) {
    return state.token;
}
export function selectUser (state) {
    return state.userId;
}


export default reducer;