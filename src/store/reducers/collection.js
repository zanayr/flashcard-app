import * as actionTypes from '../actions/actionTypes';


const initialState = {
    cards: {
        collection: {},
        error: null,
        isLoading: false
    },
    decks: {
        collection: {},
        error: null,
        isLoading: false
    }
};


const service_fail = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            error: action.payload.error,
            isLoading: false
        }
    };
}
const delete_succ = (state, action) => {
    const collection = state[action.payload.store].collection;
    delete collection[action.payload.data.id];
    return {
        ...state,
        [action.payload.store]: {
            collection: {
                ...collection
            },
            error: null,
            isLoading: false
        }
    };
}
const getAll_init = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            ...state[action.payload.store],
            isLoading: true
        }
    };
};
const getAll_succ = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            collection: {
                ...action.payload.data
            },
            error: null,
            isLoading: false
        }
    };
};
const patch_succ = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            collection: {
                ...state[action.payload.store].collection,
                [action.payload.data.id]: {...action.payload.data}
            },
            error: null,
            isLoading: false
        }
    };
};
const put_succ = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            collection: {
                ...state[action.payload.store].collection,
                [action.payload.data.id]: {...action.payload.data}
            },
            error: null,
            isLoading: false
        }
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_FAIL:
            return service_fail(state, action);
        case actionTypes.DELETE_SUCC:
            return delete_succ(state, action);
        case actionTypes.GET_FAIL:
            return service_fail(state, action);
        case actionTypes.GET_INIT:
            return getAll_init(state, action);
        case actionTypes.GET_SUCC:
            return getAll_succ(state, action);
        case actionTypes.PATCH_FAIL:
            return service_fail(state, action);
        case actionTypes.PATCH_SUCC:
            return patch_succ(state, action);
        case actionTypes.PUT_FAIL:
            return service_fail(state, action);
        case actionTypes.PUT_SUCC:
            return put_succ(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectCards (state) {
    return state.cards.collection;
}
export function selectCardsIsLoading (state) {
    return state.cards.isLoading;
}
export function selectDecks (state) {
    return state.decks.collection;
}
export function selectDecksIsLoading (state) {
    return state.decks.isLoading;
}


export default reducer;