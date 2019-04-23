import * as actionTypes from '../actions/actionTypes';

const initialState = {
    modals: []
};

const modalCreate = (state, action) => {
    return {
        ...state,
        modals: [...state.modals, action.payload]
    };
};
const modalClear = (state, action) => {
    let modals = state.modals.filter(m => m.data.id !== action.payload.data.id);
    return {
        ...state,
        modals: [...modals]
    };
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.MODAL_CREATE:
            return modalCreate(state, action);
        case actionTypes.MODAL_CLEAR:
            return modalClear(state, action);
        default:
            return state;
    }
}

export default reducer;