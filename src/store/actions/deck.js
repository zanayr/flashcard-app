import * as actionTypes from './actionTypes';
import * as create from '../models/models';
import axios from '../database';

//  This file holds the action creators for the deck redux
//  store and interface with the firebase database


//  ACTION CREATORS  ---------------------------------------------  ACTION CREATORS  //
//  Add  -----------------------------------------------------------------  Add A.C. //
export const addDeck_fail = (error) => {
    return {
        type: actionTypes.DECK_FAIL,
        payload: error
    }
}
export const addDeck_success = (data) => {
    return {
        type: actionTypes.ADD_DECK_SUCC,
        payload: data
    }
}

//  Delete  -----------------------------------------------------------  Delete A.C. //
export const deleteDeck_fail = (error) => {
    return {
        type: actionTypes.DECK_FAIL,
        payload: error
    };
};
export const deleteDeck_success = (data) => {
    return {
        type: actionTypes.DELETE_DECK_SUCC,
        payload: data
    };
};

//  Get All  ----------------------------------------------------------  Get All A.C. //
export const getAllDecks_fail = (error) => {
    return {
        type: actionTypes.DECK_FAIL,
        payload: error
    }
}
export const getAllDecks_init = () => {
    return {
        type: actionTypes.GET_ALL_DECKS_INIT,
        payload: {}
    }
}
export const getAllDecks_success = (data) => {
    return {
        type: actionTypes.GET_ALL_DECKS_SUCC,
        payload: data
    }
}

//  Update  -----------------------------------------------------------  Update A.C. //
export const updateDeck_fail = (error) => {
    return {
        type: actionTypes.DECK_FAIL,
        payload: error
    };
};
export const updateDeck_success = (data) => {
    return {
        type: actionTypes.UPDATE_DECK_SUCC,
        payload: data
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Add  ----------------------------------------------------------------  Add Async //
export const addDeck_async = (token, data) => {
    return dispatch => {
        axios.patch('/deck/' + data.id + '.json?auth=' + token, create.deckModel(data))
        .then(response => {
            dispatch(addDeck_success(data));
        })
        .catch(error => {
            dispatch(addDeck_fail(error));
        });
    };
};
export const addManyDecks_async = (token, data) => {
    return dispatch => {
        data.forEach(deck => {
            dispatch(addDeck_async(token, deck));
        });
    }
};

//  Delete  ---------------------------------------------------------  Delete Async  //
export const deleteDeck_async = (token, data) => {
    return dispatch => {
        axios.delete('/deck/' + data.id + '.json?auth=' + token)
        .then(response => {
            dispatch(deleteDeck_success(url, data));
        })
        .catch(error => {
            dispatch(deleteDeck_fail(error));
        });
    };
};
export const deleteManyDecks_async = (token, data) => {
    return dispatch => {
        data.forEach(deck => {
            dispatch(deleteDeck_async(token, deck));
        });
    }
};

//  Get All  --------------------------------------------------------  Get All Async //
export const getAllDecks_async = (token, user) => {
    return dispatch => {
        dispatch(getAllDecks_init());
        axios.get('/deck.json?auth=' + token + '&orderBy="owner"&equalTo="' + user + '"')
        .then(response => {
            dispatch(getAllDecks_success(response.data));
        })
        .catch(error => {
            dispatch(getAllDecks_fail(error));
        });
    };
};

//  Update  ----------------------------------------------------------  Update Async //
export const updateDeck_async = (token, data) => {
    return dispatch => {
        axios.put('/deck/' + data.id + '.json?auth=' + token, create.deckModel(data))
        .then(response => {
            dispatch(updateDeck_success(data));
        })
        .catch(error => {
            dispatch(updateDeck_fail(error));
        });
    };
};