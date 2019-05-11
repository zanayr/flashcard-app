import * as actionTypes from '../actions/actionTypes';
import * as create from '../models/models';

//  ABOUT  ----------------------------------------------------------------  ABOUT  //
//  This is the card reducer, it listens for action calls to the redux store


//  Initial State  ------------------------------------------------  Initial State  //
const initialState = {
    collection: {},
    error: null,
    isLoading: false
};


//  HELPERS  -------------------------------------------------------------  HELPERS  //
//  Add  ---------------------------------------------------------------------  Add  //
const addCard_success = (state, action) => {
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
const deleteCard_success = (state, action) => {
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
const card_fail = (state, action) => {
    return {
        ...state,
        [action.payload.store]: {
            error: action.payload.error,
            isLoading: false
        }
    };
}

//  Get  ---------------------------------------------------------------------  Get  //
const getAllCards_init = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const getAllCards_success = (state, action) => {
    let collection = {};
    Object.keys(action.payload).map(id => {
        collection[id] = create.cardViewModel(id, action.payload[id]);
    });
    return {
        collection: collection,
        error: null,
        isLoading: false
    };
};

//  Update  ---------------------------------------------------------------  Update  //
const updateCard_success = (state, action) => {
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
        case actionTypes.ADD_CARD_SUCC:
            return addCard_success(state, action);
        case actionTypes.CARD_FAIL:
            return card_fail(state, action);
        case actionTypes.DELETE_CARD_SUCC:
            return deleteCard_success(state, action);
        case actionTypes.GET_ALL_CARDS_INIT:
            return getAllCards_init(state, action);
        case actionTypes.GET_ALL_CARDS_SUCC:
            return getAllCards_success(state, action);
        case actionTypes.UPDATE_CARD_SUCC:
            return updateCard_success(state, action);
        default:
            return state;
    }
}


//  SELECTORS  ---------------------------------------------------------  SELECTORS  //
export function selectCards (state) {
    return state.collection
}
export function selectCardsIsLoading (state) {
    return state.isLoading;
}
export function selectCardsError (state) {
    return state.error;
}


export default reducer;