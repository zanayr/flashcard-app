import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    error: null,
    loading: false,
    refeshToken: null,
    token: null,
    userId: null,
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};
const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
};
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};
const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: action.payload.token,
        userId: action.payload.userId
    });
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;