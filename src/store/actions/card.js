import * as actionTypes from './actionTypes';
import * as create from '../models/models';
import axios from '../database';

//  This file holds the action creators for the card redux
//  store and interface with the firebase database


//  ACTION CREATORS  ---------------------------------------------  ACTION CREATORS  //
//  Add  -----------------------------------------------------------------  Add A.C. //
export const addCard_fail = (error) => {
    return {
        type: actionTypes.CARD_FAIL,
        payload: error
    }
}
export const addCard_success = (data) => {
    return {
        type: actionTypes.ADD_CARD_SUCC,
        payload: data
    }
}

//  Delete  -----------------------------------------------------------  Delete A.C. //
export const deleteCard_fail = (error) => {
    return {
        type: actionTypes.CARD_FAIL,
        payload: error
    };
};
export const deleteCard_success = (data) => {
    return {
        type: actionTypes.DELETE_CARD_SUCC,
        payload: data
    };
};

//  Get All  ----------------------------------------------------------  Get All A.C. //
export const getAllCards_fail = (error) => {
    return {
        type: actionTypes.CARD_FAIL,
        payload: error
    }
}
export const getAllCards_init = () => {
    return {
        type: actionTypes.GET_ALL_CARDS_INIT,
        payload: {}
    }
}
export const getAllCards_success = (data) => {
    return {
        type: actionTypes.GET_ALL_CARDS_SUCC,
        payload: data
    }
}

//  Update  -----------------------------------------------------------  Update A.C. //
export const updateCard_fail = (error) => {
    return {
        type: actionTypes.CARD_FAIL,
        payload: error
    };
};
export const updateCard_success = (data) => {
    return {
        type: actionTypes.UPDATE_CARD_SUCC,
        payload: data
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Add  ----------------------------------------------------------------  Add Async //
export const addCard_async = (token, data) => {
    return dispatch => {
        axios.patch('/card/' + data.id + '.json?auth=' + token, create.cardModel(data))
        .then(response => {
            dispatch(addCard_success(data));
        })
        .catch(error => {
            dispatch(addCard_fail(error));
        });
    };
};
export const addManyCards_async = (token, data) => {
    return dispatch => {
        data.forEach(card => {
            dispatch(addCard_async(token, card));
        });
    }
};

//  Delete  ---------------------------------------------------------  Delete Async  //
export const deleteCard_async = (token, data) => {
    return dispatch => {
        axios.delete('/card/' + data.id + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteCard_success(data));
        })
        .catch(error => {
            dispatch(deleteCard_fail(error));
        });
    };
};
export const deleteManyCards_async = (token, data) => {
    return dispatch => {
        data.forEach(card => {
            dispatch(deleteCard_async(token, card));
        });
    }
};

//  Get All  --------------------------------------------------------  Get All Async //
export const getAllCards_async = (token, user) => {
    return dispatch => {
        dispatch(getAllCards_init());
        axios.get('/card.json?auth=' + token + '&orderBy="owner"&equalTo="' + user + '"')
        .then(response => {
            dispatch(getAllCards_success(response.data));
        })
        .catch(error => {
            dispatch(getAllCards_fail(error));
        });
    };
};

//  Update  ----------------------------------------------------------  Update Async //
export const updateCard_async = (token, data) => {
    return dispatch => {
        axios.put('/card/' + data.id + '.json?auth=' + token, create.cardModel(data))
        .then(response => {
            dispatch(updateCard_success(data));
        })
        .catch(error => {
            dispatch(updateCard_fail(error));
        });
    };
};