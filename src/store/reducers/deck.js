import * as actionTypes from "../actions/actionTypes";

const initialState = {
    decks: {},
    error: null,
    isLoading: false,
};

//  GET  //
const deckGetFail = (state, action) => {
    return {
        ...state,
        error: action.payload.error,
        isLoading: false
    };
};
const deckGetStart = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const deckGetSuccess = (state, action) => {
    return {
        ...state,
        decks: action.payload,
        isLoading: false
    };
};

//  POST  ///
const deckPostFail = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
};
const deckPostStart = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const deckPostSuccess = (state, action) => {
    return {
        ...state,
        decks: {
            ...state.decks,
            [action.payload.id]: {
                userId: action.payload.userId,
                title: action.payload.title,
                details: action.payload.details
            }
        },
        isLoading: false,
    };
};

//  UPDATE  //
const deckUpdateFail = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
};
const deckUpdateStart = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
const deckUpdateSuccess = (state, action) => {
    return {
        ...state,
        decks: {
            ...state.decks,
            [action.payload.id]: {
                userId: action.payload.userId,
                title: action.payload.title,
                details: action.payload.details
            }
        },
        isLoading: false,
    };
};

//  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DECK_GET_FAIL:
            return deckGetFail(state, action);
        case actionTypes.DECK_GET_START:
            return deckGetStart(state, action);
        case actionTypes.DECK_GET_SUCCESS:
            return deckGetSuccess(state, action);
        case actionTypes.DECK_POST_FAIL:
            return deckPostFail(state, action);
        case actionTypes.DECK_POST_START:
            return deckPostStart(state, action);
        case actionTypes.DECK_POST_SUCCESS:
            return deckPostSuccess(state, action);
        case actionTypes.DECK_UPDATE_FAIL:
            return deckUpdateFail(state, action);
        case actionTypes.DECK_UPDATE_START:
            return deckUpdateStart(state, action);
        case actionTypes.DECK_UPDATE_SUCCESS:
            return deckUpdateSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;