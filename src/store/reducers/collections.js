import * as actionTypes from "../actions/actionTypes";

const initialState = {
    collections: {
        decks: {},
        cards: {}
    },
    postMap: {},
    error: null,
    isLoading: false
};

//  FAILURE  //
const serviceFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}

//  DELETE  //
const deleteSucceeded = (state, action) => {
    const store = action.payload.store;
    const collection = state.collections[store];
    delete collection[action.payload.key];
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: {
                ...collection
            }
        }
    };
}

//  GET  //
const getFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
};
const getInitiated = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const getSucceeded = (state, action) => {
    const store = action.payload.store;
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: {
                ...action.payload.data
            }
        },
        isLoading: false
    };
};

//  POST  //
const postFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false,
    };
};
const postInitiated = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const postSucceeded = (state, action) => {
    const store = action.payload.store;
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: {
                ...state.collections[store],
                [action.payload.key]: action.payload.data
            }
        },
        isLoading: false
    };
};

//  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_FAIL:
            return serviceFailed(state, action);
        case actionTypes.DELETE_SUCC:
            return deleteSucceeded(state, action);
        case actionTypes.GET_FAIL:
            return serviceFailed(state, action);
        case actionTypes.GET_INIT:
            return getInitiated(state, action);
        case actionTypes.GET_SUCC:
            return getSucceeded(state, action);
        case actionTypes.POST_FAIL:
            return serviceFailed(state, action);
        case actionTypes.POST_INIT:
            return postInitiated(state, action);
        case actionTypes.POST_SUCC:
            return postSucceeded(state, action);
        default:
            return state;
    }
}

export default reducer;