import * as actionTypes from '../actions/actionTypes';


const initialState = {
    error: null,
    isLoading: true,
    user: {},
    users: {}
};


const userFailure = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const getUserInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const userInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const getUserSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
        user: action.payload
    };
}
const getAllUsersInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const getAllUsersSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
        users: action.payload
    };
}
const updateUser = (state, action) => {
    return {
        ...state,
        users: {
            ...state.users,
            [action.payload.id]: action.payload
        },
        error: null
    }
}
const updateUserTag = (state, action) => {
    return {
        ...state,
        user: {
            ...state.user,
            [action.payload.collection]: action.payload.tag
        }
    }
}
const signOut = (state, action) => {
    return initialState;
}
//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_FAILURE:
            return userFailure(state, action);
        case actionTypes.GET_USER_INIT:
            return getUserInit(state, action);
        case actionTypes.GET_USER_SUCCESS:
            return getUserSuccess(state, action);
        case actionTypes.GET_ALL_USERS_INIT:
            return getAllUsersInit(state, action);
        case actionTypes.GET_ALL_USERS_SUCCESS:
            return getAllUsersSuccess(state, action);
        case actionTypes.SIGN_OUT:
            return signOut(state, action);
        case actionTypes.UPDATE_USER:
            return updateUser(state, action);
        case actionTypes.UPDATE_USER_TAG:
            return updateUserTag(state, action);
        case actionTypes.USER_INIT:
            return userInit(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectUser (state) {
    return state.user;
}
export function selectUserById (state, id) {
    return state.users[id];
}
export function selectUsers (state) {
    return state.users;
}
export function selectUserIsLoading (state) {
    return state.isLoading;
}


export default reducer;