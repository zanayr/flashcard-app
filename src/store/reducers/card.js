import * as actionTypes from '../actions/actionTypes';

//  ABOUT  ----------------------------------------------------------------  ABOUT  //
//  This is the card reducer, it listens for action calls to the redux store


//  Initial State  ------------------------------------------------  Initial State  //
const initialState = {
    card: {},
    error: null,
    isLoading: false
};


const cardFailure = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const addCard = (state, action) => {
    return {
        ...state,
        card: {
            ...state.card,
            [action.payload.id]: action.payload
        },
        error: null
    }
}
const deleteCard = (state, action) => {
    const card = {...state.card};
    delete card[action.payload.id];
    return {
        ...state,
        card: card,
        error: null
    }
}
const getAllCardsInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const getAllCardsSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
        card: action.payload
    };
}
const updateCard = (state, action) => {
    console.log(action.payload.member);
    return {
        ...state,
        card: {
            ...state.card,
            [action.payload.id]: action.payload
        },
        error: null
    }
}


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CARD_FAILURE:
            return cardFailure(state, action);
        case actionTypes.ADD_CARD:
            return addCard(state, action);
        case actionTypes.DELETE_CARD:
            return deleteCard(state, action);
        case actionTypes.GET_ALL_CARDS_INIT:
            return getAllCardsInit(state, action);
        case actionTypes.GET_ALL_CARDS_SUCCESS:
            return getAllCardsSuccess(state, action);
        case actionTypes.UPDATE_CARD:
            return updateCard(state, action);
        // case actionTypes.UPDATE2_CARD:
        //     return update2Card(state, action);
        default:
            return state;
    }
}


//  SELECTORS  ---------------------------------------------------------  SELECTORS  //
export function selectCards (state) {
    return state.card
}
export function selectCardsIsLoading (state) {
    return state.isLoading;
}


export default reducer;