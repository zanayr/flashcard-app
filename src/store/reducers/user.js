import * as actionTypes from '../actions/actionTypes';
import * as create from '../models/models';


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
        user: create.userModel(action.payload.user, action.payload.data),
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

//  Tags  //
const putTag_success = (state, action) => {
    return {
        ...state,
        user: {
            ...state.user,
            [action.payload.filter]: [...action.payload.data]
        }
    }
}

//  Tabs  //
const deleteTab_succ = (state, action) => {
    let tabs = state.user.tabs;
    delete tabs[action.payload];
    return {
        ...state,
        user: {
            ...state.user,
            tabs: {
                ...tabs
            }
        }
    }
}
const patchTab_succ = (state, action) => {
    console.log('here');
    return {
        ...state,
        user: {
            ...state.user,
            tabs: {
                ...state.tabs,
                [action.payload.id]: create.tabModel(action.payload.data)
            }
        }
    }
}

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
        case actionTypes.PUT_TAG_FAIL:
            return service_fail(state, action);
        case actionTypes.PUT_TAG_SUCC:
            return putTag_success(state, action);
        case actionTypes.DELETE_TAB_FAIL:
            return service_fail(state, action);
        case actionTypes.DELETE_TAB_SUCC:
            return deleteTab_succ(state, action);
        case actionTypes.PATCH_TAB_FAIL:
            return service_fail(state, action);
        case actionTypes.PATCH_TAB_SUCC:
            return patchTab_succ(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectUser (state) {
    return state.user;
}
export function selectUserId (state) {
    return state.user.id;
}
export function selectUserInfo (state) {
    return state.user.info;
}
export function selectUserIsLoading (state) {
    return state.isLoading;
}
export function selectUserPreviliage (state) {
    return state.user.previliage;
}
export function selectUserTabs (state) {
    return state.user.tabs;
}



export default reducer;