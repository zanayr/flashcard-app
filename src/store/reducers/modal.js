import * as actionTypes from '../actions/actionTypes';


const initialState = {
    modals: []
};


const deleteModalDisplayed = (state, action) => {
    return {
        ...state,
        modals: state.modals.concat(action.payload)
    };
};
const modalCleared = (state, action) => {
    return {
        ...state,
        modals: state.modals.filter(modal => modal.key !== action.payload.key)
    };
};


//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_MODAL:
            return deleteModalDisplayed(state, action);
        case actionTypes.CLEAR_MODAL:
            return modalCleared(state, action);
        default:
            return state;
    }
}

export default reducer;