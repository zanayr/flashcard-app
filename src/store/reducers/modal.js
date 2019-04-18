import * as actionTypes from '../actions/actionTypes';

const initialState = {
    modals: {}
};

const modalCreate = (state, action) => {
    return {
        ...state,
        modals: {
            ...state.modals,
            [action.payload.modalId]: {
                message: action.payload.message,
                active: true
            }
        }
    };
};
const modalConfirm = (state, action) => {
    return {
        ...state,
        modals: {
            ...state.modals,
            [action.payload.id]: {
                ...state.modals[action.payload.id],
                active: false
            }
        }
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.MODAL_CREATE:
            return modalCreate(state, action);
        case actionTypes.MODAL_CONFIRM:
            return modalConfirm(state, action);
        default:
            return state;
    }
}

export default reducer;