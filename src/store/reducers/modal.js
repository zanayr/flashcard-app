import * as actionTypes from '../actions/actionTypes';


const initialState = {
    modals: []
};


const displayModal = (state, action) => {
    return {
        ...state,
        modals: state.modals.concat(action.payload)
    };
};
const clearModal = (state, action) => {
    return {
        ...state,
        modals: state.modals.filter(modal => modal !== state.modals[action.payload.key])
    };
};

const signOut = (state, action) => {
    return undefined;
}

//  REDUCER  -------------------------------------------------------------  REDUCER  //
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DISPLAY_MODAL:
            return displayModal(state, action);
        case actionTypes.CLEAR_MODAL:
            return clearModal(state, action);
        case actionTypes.SIGN_OUT:
            return signOut(state, action);
        default:
            return state;
    }
}


//  STORE SELECTORS  ---------------------------------------------------  SELECTORS  //
export const selectModals = (state) => {
    return state.modals;
}

export default reducer;