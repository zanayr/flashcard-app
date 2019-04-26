import * as actionTypes from '../actions/actionTypes';
import * as sortTypes from './sortTypes';


const initialState = {
    collections: {
        decks: [],
        cards: []
    },
    postMap: {},
    error: null,
    isLoading: false
};


const serviceFailed = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const deleteSucceeded = (state, action) => {
    const store = action.payload.store;
    const collection = state.collections[store].map(item => {
        if (item.key === action.payload.key) {
            item.isDeleted = true;
        }
        return item;
    });
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: [...collection]
        }
    };
}
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
const putSucceeded = (state, action) => {
    const store = action.payload.store;
    const collection = state.collections[store].map(item => {
        if (item.key === action.payload.key) {
            item.data = {
                ...action.payload.data
            }
        }
        return item;
    });
    return {
        ...state,
        collections: {
            ...state.collections,
            [store]: [...collection]
        },
        isLoading: false
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
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


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectCollection (state, store) {
    return state.collections[store];
}
export function selectCollectionBy (state, store, method) {
    switch (method) {
        case sortTypes.ALPHA_DEC:
            return state.collections[store].sort((a, b) => {
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
export function selectIsLoading (state) {
    return state.isLoading;
}
export function selectItemByKey (state, key) {
    return state.collections.decks.find(item => item.key === key);
}


export default reducer;