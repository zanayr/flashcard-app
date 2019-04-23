import * as actionTypes from './actionTypes';
import axios from '../../database/deck';


//  GET  //
export const deckGetSuccess = (decks) => {
    return {
        type: actionTypes.DECK_GET_SUCCESS,
        payload: decks
    }
}

export const deckGetFail = (error) => {
    return {
        type: actionTypes.DECK_GET_FAIL,
        payload: error
    }
}

export const deckGetStart = () => {
    return {
        type: actionTypes.DECK_GET_START
    }
}
//  Get Async  //
export const deckGet_async = (token, userId) => {
    return dispatch => {
        dispatch(deckGetStart());
        const parameters = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/decks.json' + parameters)
        .then(response => {
            const decks = {};
            for (let key in response.data) {
                decks[key] = {...response.data[key]}
            }
            dispatch(deckGetSuccess(decks));
        })
        .catch(error => {
            dispatch(deckGetFail(error));
        });
    };
};


//  POST  //
export const deckPostFail = (error) => {
    return {
        type: actionTypes.DECK_POST_FAIL,
        payload: error
    };
};
export const deckPostStart = () => {
    return {
        type: actionTypes.DECK_POST_START
    }
}
export const deckPostSuccess = (id, deck) => {
    const data = {
        ...deck,
        id: id
    }
    return {
        type: actionTypes.DECK_POST_SUCCESS,
        payload: data
    };
};
//  Post Async  //
export const deckPost_async = (token, data) => {
    return dispatch => {
        dispatch(deckPostStart());
        axios.post('/decks.json?auth=' + token, data)
        .then(response => {
            dispatch(deckPostSuccess(response.data.name, data));
        })
        .catch(error => {
            dispatch(deckPostFail(error));
        });
    };
};


//  UPDATE  //
export const deckUpdateFail = (error) => {
    return {
        type: actionTypes.DECK_UPDATE_FAIL,
        payload: error
    };
};
export const deckUpdateStart = () => {
    return {
        type: actionTypes.DECK_UPDATE_START
    }
}
export const deckUpdateSuccess = (id, deck) => {
    const data = {
        ...deck,
        id: id
    }
    return {
        type: actionTypes.DECK_UPDATE_SUCCESS,
        payload: data
    };
};
//  Update Async  //
export const deckUpdate_async = (token, user, payload) => {
    return dispatch => {
        dispatch(deckUpdateStart());
        axios.put('/decks/' + payload.id + '.json?auth=' + token, {...payload.data, userId: user})
        .then(response => {
            dispatch(deckUpdateSuccess(response.data.name, payload));
        })
        .catch(error => {
            dispatch(deckUpdateFail(error));
        });
    };
};