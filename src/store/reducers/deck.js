import * as actionTypes from '../actions/actionTypes';

//  ABOUT  ----------------------------------------------------------------  ABOUT  //
//  This is the deck reducer, it listens for action calls to the redux store


//  Initial State  ------------------------------------------------  Initial State  //
const initialState = {
    deck: {},
    error: null,
    isLoading: false
};


const deckFailure = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const addDeck = (state, action) => {
    return {
        ...state,
        deck: {
            ...state.deck,
            [action.payload.id]: action.payload
        },
        isLoading: false,
        error: null
    }
}
const deckInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    }
}
const deleteDeck = (state, action) => {
    const deck = {...state.deck};
    delete deck[action.payload.id];
    return {
        ...state,
        deck: deck,
        error: null
    }
}
const getAllDecksInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const getAllDecksSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
        deck: action.payload
    };
}
const updateDeck = (state, action) => {
    return {
        ...state,
        deck: {
            ...state.deck,
            [action.payload.id]: action.payload
        },
        error: null
    }
}


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DECK_FAILURE:
            return deckFailure(state, action);
        case actionTypes.ADD_DECK:
            return addDeck(state, action);
        case actionTypes.DECK_INIT:
            return deckInit(state, action);
        case actionTypes.DELETE_DECK:
            return deleteDeck(state, action);
        case actionTypes.GET_ALL_DECKS_INIT:
            return getAllDecksInit(state, action);
        case actionTypes.GET_ALL_DECKS_SUCCESS:
            return getAllDecksSuccess(state, action);
        case actionTypes.UPDATE_DECK:
            return updateDeck(state, action);
        default:
            return state;
    }
}


//  SELECTORS  ---------------------------------------------------------  SELECTORS  //
export function selectDeck (state, id) {
    return state.deck[id];
}
export function selectDecks (state) {
    return state.deck
}
export function selectDecksIsLoading (state) {
    return state.isLoading;
}


export default reducer;