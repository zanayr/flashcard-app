import * as actionTypes from "./actionTypes";
import axios from "../../database/deck";

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

export const deckGet_async = (token, userId) => {
    return dispatch => {
        dispatch(deckGetStart());
        const parameters = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/decks.json" + parameters)
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

export const deckPost_async = (token, data) => {
    return dispatch => {
        dispatch(deckPostStart());
        axios.post("/decks.json?auth=" + token, data)
        .then(response => {
            dispatch(deckPostSuccess(response.data.name, data));
        })
        .catch(error => {
            dispatch(deckPostFail(error));
        });
    };
};