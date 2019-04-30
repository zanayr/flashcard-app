import * as actionTypes from '../actions/actionTypes';


const initialState = {
    user: {},
    error: null,
    isLoading: true
};


const service_fail = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const getUser_init = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const getUser_succ = (state, action) => {
    return {
        ...state,
        user: {...action.payload.data},
        error: null,
        isLoading: false
    };
};
const patchUser_succ = (state, action) => {
    return {
        ...state,
        user: {...action.payload.data},
        error: null
    };
};
const putUser_succ = (state, action) => {
    return {
        ...state,
        user: {...action.payload.data},
        error: null
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_FAIL:
            return service_fail(state, action);
        case actionTypes.GET_USER_INIT:
            return getUser_init(state, action);
        case actionTypes.GET_USER_SUCC:
            return getUser_succ(state, action);
        case actionTypes.PATCH_USER_FAIL:
            return service_fail(state, action);
        case actionTypes.PATCH_USER_SUCC:
            return patchUser_succ(state, action);
        case actionTypes.PUT_USER_FAIL:
            return service_fail(state, action);
        case actionTypes.PUT_USER_SUCC:
            return putUser_succ(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectUser (state) {
    return state.user;
}
export function selectUserInfo (state) {
    return state.user.info;
}
export function selectUserIsLoading (state) {
    return state.user.isLoading;
}
export function selectUserPreviliage (state) {
    return state.user.previliage;
}
export function selectUserTabs (state) {
    return state.user.tabs;
}



export default reducer;