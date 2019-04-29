import * as actionTypes from '../actions/actionTypes';
import * as sortTypes from './sortTypes';

//  Initial State  //
const initialState = {
    decks: {},
    error: null,
    isLoading: true
};


//  Service Failure  //
const failure = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}

//  Delete Success  //
const deleteSuccess = (state, action) => {
    //const key = action.payload.key;
    const collection = state.decks;
    delete collection[action.payload.key]
    return {
        ...state,
        decks: {
            ...collection,
        },
        error: null,
    };
    // return {
    //     ...state,
    //     decks: {
    //         ...state.decks,
    //         [key]: {
    //             ...state.decks[key],
    //             isDeleted: true
    //         }
    //     },
    //     error: null,
    // };
}

//  Get Init  //
const getInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
};
//  Get Success  //
const getSuccess = (state, action) => {
    return {
        ...state,
        decks: {...action.payload.data},
        error: null,
        isLoading: false
    };
};

//  Post Success  //
const postSuccess = (state, action) => {
    return {
        ...state,
        decks: {
            ...state.decks,
            [action.payload.key]: {...action.payload.data}
        },
        error: null
    };
};

//  Put Success  //
const putSuccess = (state, action) => {
    return {
        ...state,
        decks: {
            ...state.decks,
            [action.payload.key]: {...action.payload.data}
        },
        error: null
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DECKS_DELETE_FAIL:
            return failure(state, action);
        case actionTypes.DECKS_DELETE_SUCC:
            return deleteSuccess(state, action);
        case actionTypes.DECKS_GET_FAIL:
            return failure(state, action);
        case actionTypes.DECKS_GET_INIT:
            return getInit(state, action);
        case actionTypes.DECKS_GET_SUCC:
            return getSuccess(state, action);
        case actionTypes.DECKS_POST_FAIL:
            return failure(state, action);
        case actionTypes.DECKS_POST_SUCC:
            return postSuccess(state, action);
        case actionTypes.DECKS_PUT_FAIL:
            return failure(state, action);
        case actionTypes.DECKS_PUT_SUCC:
            return putSuccess(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export function selectDeckByKey (state, key) {
    return {
            ...state.decks[key],
            key: key
        };
}
//  Returns array of all decks
export function selectDecks (state) {
    return Object.keys(state.decks).map(key => {
        return {
            ...state.decks[key],
            key: key
        };
    });
}
//  Pass a sort type string, returns array of decks
export function selectDecksBy (state, sort) {
    switch (sort) {
        case sortTypes.ALPHA_DEC:
            return Object.keys(state.decks).map(key => {
                return {
                    ...state.decks[key],
                    id: key
                }
            })
            .sort((a, b) => {
                const A = a.title.toUpperCase();
                const B = b.title.toUpperCase();
                let c = 0;
                if (A > B) {
                    c = 1;
                } else if (A < B) {
                    c = -1;
                }
                return c;
            });
        default:
            return [];
    }
}
export function selectDecksIsLoading (state) {
    return state.isLoading;
}


export default reducer;