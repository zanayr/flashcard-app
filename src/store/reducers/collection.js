import * as actionTypes from '../actions/actionTypes';
import * as create from '../models/models';


const initialState = {
    card: {
        collection: {},
        error: null,
        isLoading: false
    },
    deck: {
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
        [action.payload]: {
            ...state[action.payload],
            isLoading: true
        }
    };
};
const getAll_succ = (state, action) => {
    let collection = {};
    Object.keys(action.payload.data).map(id => {
        collection[id] = create.itemModel(id, action.payload.data[id]);
    });
    
    return {
        ...state,
        [action.payload.store]: {
            collection: collection,
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
                [action.payload.id]: create.itemModel(action.payload.id, action.payload.data)
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
    return Object.keys(state.card.collection).map(id => {
        return state.card.collection[id];
    });
}
export function selectCardsIsLoading (state) {
    return state.card.isLoading;
}
export function selectDecks (state) {
    return Object.keys(state.deck.collection).map(id => {
        return state.deck.collection[id];
    });
}
export function selectDecksIsLoading (state) {
    return state.deck.isLoading;
}


export default reducer;