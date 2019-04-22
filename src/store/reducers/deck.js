import * as actionTypes from "../actions/actionTypes";

const initialState = {
    decks: [],
    error: null,
    isLoading: false,
};

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
        decks: state.decks.concat(action.payload),
        isLoading: false,
    };
};

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
        default:
            return state;
    }
}

export default reducer;