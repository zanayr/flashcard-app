import * as actionTypes from "../actions/actionTypes";

const initialState = {
    collections: {
        decks: {},
        cards: {}
    },
    error: null,
    getIsLoading: false,
};

//  GET  //
const getFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        getIsLoading: false
    };
};
const getInitiated = (state, action) => {
    return {
        ...state,
        getIsLoading: true
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
        getIsLoading: false
    };
};

//  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FAIL_ASYNC:
            return getFailed(state, action);
        case actionTypes.GET_INIT_ASYNC:
            return getInitiated(state, action);
        case actionTypes.GET_SUCC_ASYNC:
            return getSucceeded(state, action);
        default:
            return state;
    }
}

export default reducer;