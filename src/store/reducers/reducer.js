import * as actionTypes from '../actions/actionTypes';

const initialState = {
    foo: {
        spam: 0,
    },
    bar: 0
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_FAIL:
            return state;
        case actionTypes.AUTH_START:
            return state;
        case actionTypes.AUTH_SUCCESS:
            return state;
        default:
            return state;
    }
}

export default reducer;