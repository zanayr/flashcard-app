import * as actionTypes from '../actions/actionTypes';
import * as create from '../models/models';

//  ABOUT  ----------------------------------------------------------------  ABOUT  //
//  This is the deck reducer, it listens for action calls to the redux store


//  Initial State  ------------------------------------------------  Initial State  //
const initialState = {
    collection: {},
    error: null,
    isLoading: false
};


//  HELPERS  -------------------------------------------------------------  HELPERS  //
//  Add  ---------------------------------------------------------------------  Add  //
const addDeck_success = (state, action) => {
    return {
        collection: {
            ...state.collection,
            [action.payload.id]: action.payload
        },
        error: null,
        isLoading: false
    };
};

//  Delete  ---------------------------------------------------------------  Delete  //
const deleteDeck_success = (state, action) => {
    const collection = {...state.collection};
    delete collection[action.payload.id];
    return {
        ...state,
        collection: collection,
        error: null,
        isLoading: false
    };
}

//  Failure  -------------------------------------------------------------  Failure  //
const deck_fail = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            error: action.payload,
            isLoading: false
        }
    };
}

//  Get  ---------------------------------------------------------------------  Get  //
const getAllDecks_init = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const getAllDecks_success = (state, action) => {
    let collection = {};
    Object.keys(action.payload).map(id => {
        collection[id] = create.deckViewModel(id, action.payload[id]);
    });
    return {
        collection: collection,
        error: null,
        isLoading: false
    };
};

//  Update  ---------------------------------------------------------------  Update  //
const updateDeck_success = (state, action) => {
    return {
        collection: {
            ...state.collection,
            [action.payload.id]: action.payload
        },
        error: null,
        isLoading: false
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DECK_SUCC:
            return addDeck_success(state, action);
        case actionTypes.DECK_FAIL:
            return deck_fail(state, action);
        case actionTypes.DELETE_DECK_SUCC:
            return deleteDeck_success(state, action);
        case actionTypes.GET_ALL_DECKS_INIT:
            return getAllDecks_init(state, action);
        case actionTypes.GET_ALL_DECKS_SUCC:
            return getAllDecks_success(state, action);
        case actionTypes.UPDATE_DECK_SUCC:
            return updateDeck_success(state, action);
        default:
            return state;
    }
}


//  SELECTORS  ---------------------------------------------------------  SELECTORS  //
export function selectDecks (state) {
    return state.collection
}
export function selectDecksIsLoading (state) {
    return state.isLoading;
}
export function selectDecksError (state) {
    return state.error;
}


export default reducer;