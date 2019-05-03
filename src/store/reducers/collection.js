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
const deleteItem_succ = (state, action) => {
    const collection = state[action.payload.type].collection;
    delete collection[action.payload.id];
    return {
        ...state,
        [action.payload.type]: {
            collection: {
                ...collection
            },
            error: null,
            isLoading: false
        }
    };
}
const getAllItems_init = (state, action) => {
    return {
        ...state,
        [action.payload]: {
            ...state[action.payload],
            isLoading: true
        }
    };
};
const getAllItems_succ = (state, action) => {
    let collection = {};
    Object.keys(action.payload.data).map(id => {
        collection[id] = create.itemViewModel(id, action.payload.data[id]);
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
const patchItem_succ = (state, action) => {
    return {
        ...state,
        [action.payload.type]: {
            collection: {
                ...state[action.payload.store].collection,
                [action.payload.id]: action.payload
            },
            error: null,
            isLoading: false
        }
    };
};
const putItem_succ = (state, action) => {
    return {
        ...state,
        [action.payload.type]: {
            collection: {
                ...state[action.payload.type].collection,
                [action.payload.id]: action.payload
            },
            error: null,
            isLoading: false
        }
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_ITEM_FAIL:
            return service_fail(state, action);
        case actionTypes.DELETE_ITEM_SUCC:
            return deleteItem_succ(state, action);
        case actionTypes.GET_ITEMS_FAIL:
            return service_fail(state, action);
        case actionTypes.GET_ITEMS_INIT:
            return getAllItems_init(state, action);
        case actionTypes.GET_ITEMS_SUCC:
            return getAllItems_succ(state, action);
        case actionTypes.PATCH_ITEM_FAIL:
            return service_fail(state, action);
        case actionTypes.PATCH_ITEM_SUCC:
            return patchItem_succ(state, action);
        case actionTypes.PUT_ITEM_FAIL:
            return service_fail(state, action);
        case actionTypes.PUT_ITEM_SUCC:
            return putItem_succ(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectCards (state) {
    return state.card.collection
}
export function selectCardsIsLoading (state) {
    return state.card.isLoading;
}
export function selectDecks (state) {
    return state.deck.collection
}
export function selectDecksIsLoading (state) {
    return state.deck.isLoading;
}


export default reducer;