import * as actionTypes from './actionTypes';
import * as create from '../models/models';
import axios from '../database';

//  Failure  -------------------------------------------------------------  Failure  //
export const failure = (store, error) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.CARD_FAILURE;
            break;
        case 'deck':
            type = actionTypes.DECK_FAILURE;
            break;
        case 'user':
            type = actionTypes.USER_FAILURE;
            break;
        default:
            type = actionTypes.FAILURE;
            break;
    }
    return {
        type: type,
        payload: error
    };
};


//  Get  --------------------------------------------------------------------  Get  //
export const get_success = (store, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.GET_CARD_SUCCESS;
            break;
        case 'deck':
            type = actionTypes.GET_DECK_SUCCESS;
            break;
        case 'user':
            type = actionTypes.GET_USER_SUCCESS;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: data
    };
};
export const get_init = (store) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.GET_CARD_INIT;
            break;
        case 'deck':
            type = actionTypes.GET_DECK_INIT;
            break;
        case 'user':
            type = actionTypes.GET_USER_INIT;
            break;
        default:
            type = actionTypes.INIT;
            break;
    }
    return {
        type: type,
        payload: {}
    };
};


//  Get All  -------------------------------------------------------------  Get All  //
export const getAll_success = (store, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.GET_ALL_CARDS_SUCCESS;
            break;
        case 'deck':
            type = actionTypes.GET_ALL_DECKS_SUCCESS;
            break;
        case 'user':
            type = actionTypes.GET_ALL_USERS_SUCCESS;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: data
    };
};
export const getAll_init = (store) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.GET_ALL_CARDS_INIT;
            break;
        case 'deck':
            type = actionTypes.GET_ALL_DECKS_INIT;
            break;
        case 'user':
            type = actionTypes.GET_ALL_USERS_INIT;
            break;
        default:
            type = actionTypes.INIT;
            break;
    }
    return {
        type: type,
        payload: {}
    };
};

//  Get  ---------------------------------------------------------------  Get Async  //
export const get_async = (store, token, id) => {
    return dispatch => {
        dispatch(get_init(store));
        axios.get('/' + store + '/' + id + '.json?auth=' + token)
        .then(response => {
            let model = {};
            switch (store) {
                // case 'card':
                //     model = create.cardViewModel(id, response.data);
                //     break;
                // case 'deck':
                //     model = create.deckViewModel(id, response.data);
                //     break;
                case 'user':
                    model = create.userViewModel(id, response.data);
                    break;
                default:
                    break;
            }
            dispatch(get_success(store, model));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}


//  Get All  -------------------------------------------------------  Get All Async  //
export const getAll_async = (store, token, user) => {
    return dispatch => {
        dispatch(getAll_init(store));
        axios.get('/' + store + '.json?auth=' + token + '&orderBy="owner"&equalTo="' + user + '"')
        .then(response => {
            let models = {};
            switch (store) {
                case 'card':
                    Object.keys(response.data).forEach(id => {
                        models[id] = create.cardViewModel(id, response.data[id]);
                    });
                    break;
                case 'deck':
                    Object.keys(response.data).forEach(id => {
                        models[id] = create.deckViewModel(id, response.data[id]);
                    });
                    break;
                case 'user':
                    Object.keys(response.data).forEach(id => {
                        models[id] = create.userViewModel(id, response.data[id]);
                    });
                    break;
                default:
                    break;
            }
            dispatch(getAll_success(store, models));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    };
};