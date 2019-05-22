import * as actionTypes from '../actions/actionTypes';
import * as create from '../models/models';

//  ABOUT  ----------------------------------------------------------------  ABOUT  //
//  This is the class reducer, it listens for action calls to the redux store


//  Initial State  ------------------------------------------------  Initial State  //
const initialState = {
    class: {},
    error: null,
    isLoading: true
};


const classFailure = (state, action) => {
    return {
        ...state,
        error: action.payload,
        isLoading: false
    };
}
const addClass = (state, action) => {
    return {
        ...state,
        class: {
            ...state.class,
            [action.payload.id]: action.payload
        },
        error: null
    }
}
const deleteClass = (state, action) => {
    const c = {...state.class};
    delete c[action.payload.id];
    return {
        ...state,
        class: c,
        error: null
    }
}
const getAllClassesInit = (state, action) => {
    return {
        ...state,
        isLoading: true
    };
}
const getAllClassesSuccess = (state, action) => {
    return {
        ...state,
        isLoading: false,
        class: action.payload
    };
}
const updateClass = (state, action) => {
    return {
        ...state,
        class: {
            ...state.class,
            [action.payload.id]: action.payload
        },
        error: null
    }
}


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.CLASS_FAILURE:
            return classFailure(state, action);
        case actionTypes.ADD_CLASS:
            return addClass(state, action);
        case actionTypes.DELETE_CLASS:
            return deleteClass(state, action);
        case actionTypes.GET_ALL_CLASSES_INIT:
            return getAllClassesInit(state, action);
        case actionTypes.GET_ALL_CLASSES_SUCCESS:
            return getAllClassesSuccess(state, action);
        case actionTypes.UPDATE_CLASS:
            return updateClass(state, action);
        default:
            return state;
    }
}


//  SELECTORS  ---------------------------------------------------------  SELECTORS  //
export function selectClass (state, id) {
    return state.class[id];
}
export function selectClasses (state) {
    return state.class
}
export function selectClassesIsLoading (state) {
    return state.isLoading;
}


export default reducer;