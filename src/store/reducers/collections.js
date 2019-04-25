import * as actionTypes from '../actions/actionTypes';
import * as sortTypes from './sortTypes';

const initialState = {
    collections: {
        decks: [],
        cards: []
    },
    postMap: {},
    error: null,
    isLoading: false,
    isPosting: false,
};

//  FAILURE  //
const serviceFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false,
        isPosting: false
    };
}

//  DELETE  //
const deleteSucceeded = (state, action) => {
    // const store = action.payload.store;
    // const collection = state.collections[store];
    // delete collection[action.payload.key];
    // return {
    //     ...state,
    //     collections: {
    //         ...state.collections,
    //         [store]: [...collection]
    //     }
    // };
    return state;
}

//  GET  //
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
            [store]: [
                ...action.payload.data
            ]
        },
        isLoading: false
    };
};

//  POST  //
const postInitiated = (state, action) => {
    return {
        ...state,
        isPosting: true
    };
};
const postSucceeded = (state, action) => {
    const store = action.payload.store;
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: state.collections[store].concat({
                key: action.payload.key,
                data: action.payload.data
            })
        }
    };
};
const postComplete = (state, action) => {
    return {
        ...state,
        isPosting: false
    };
};

//  PUT  //
const putSucceeded = (state, action) => {
    //const store = action.payload.store;
    // return {
    //     ...state,
    //     collections: {
    //         ...state.collections,
    //         [store]: [
    //             ...state.collections[store],
    //             [action.payload.key]: action.payload.data
    //         ]
    //     },
    //     isLoading: false
    // };
    return state;
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
        case actionTypes.POST_COMP:
            return postComplete(state, action);
        case actionTypes.POST_FAIL:
            return serviceFailed(state, action);
        case actionTypes.POST_INIT:
            return postInitiated(state, action);
        case actionTypes.POST_SUCC:
            return postSucceeded(state, action);
        case actionTypes.PUT_FAIL:
            return serviceFailed(state, action);
        case actionTypes.PUT_SUCC:
            return putSucceeded(state, action);
        default:
            return state;
    }
}

//  SELECTORS  //
export function getDecks (state) {
    return state.collections.decks;
}
export function getDecksBy (state, method) {
    switch (method) {
        case sortTypes.ALPHA_DEC:
            return state.collections.decks.sort((a, b) => {
                const A = a.data.title.toUpperCase();
                const B = b.data.title.toUpperCase();
                let comparison = 0;
                if (A > B) {
                    comparison = 1;
                } else if (A < B) {
                    comparison = -1;
                }
                return comparison;
            });
        default:
            break;
    }
}
export function getIsPosting (state) {
    return state.isPosting;
}
export function getDeckById (state, id) {
    return state.collections.decks.find(deck => deck.id === id);
}
export function getLoading (state) {
    return state.isLoading;
}

export default reducer;