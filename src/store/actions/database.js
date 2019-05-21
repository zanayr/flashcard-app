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


//  Add  --------------------------------------------------------------------  Add  //
export const _add = (store, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.ADD_CARD;
            break;
        case 'deck':
            type = actionTypes.ADD_DECK;
            break;
        case 'user':
            type = actionTypes.ADD_USER;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: data
    };
}


//  Add Tab  -------------------------------------------------------  Add Tab Async  //
export const _addCollectionTab = (collection, data) => {
    return {
        type: actionTypes.ADD_COLLECTION_TAB,
        payload: {
            collection: collection,
            tab: data
        }
    };
}


//  Delete  ---------------------------------------------------------------  Delete  //
export const _delete = (store, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.DELETE_CARD;
            break;
        case 'deck':
            type = actionTypes.DELETE_DECK;
            break;
        case 'user':
            type = actionTypes.DELETE_USER;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: data
    };
}


//  Delete Tab  -------------------------------------------------  Delete Tab Async  //
export const _deleteCollectionTab = (collection, data) => {
    return {
        type: actionTypes.DELETE_COLLECTION_TAB,
        payload: {
            collection: collection,
            tab: data
        }
    };
}


//  Get  --------------------------------------------------------------------  Get  //
export const _get_success = (store, data) => {
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
export const _get_init = (store) => {
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
export const _getAll_success = (store, data) => {
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
export const _getAll_init = (store) => {
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


//  Update  ---------------------------------------------------------------  Update  //
export const _update = (store, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.UPDATE_CARD;
            break;
        case 'deck':
            type = actionTypes.UPDATE_DECK;
            break;
        case 'user':
            type = actionTypes.UPDATE_USER;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: data
    };
}


//  Add  ---------------------------------------------------------------  Add Async  //
export const add_async = (store, token, viewModel) => {
    return dispatch => {
        let model = {};
        switch (store) {
            case 'card':
                model = create.cardModel(viewModel);
                break;
            case 'deck':
                model = create.deckModel(viewModel);
                break;
            case 'user':
                model = create.userModel(viewModel);
                break;
            default:
                break;
        }
        axios.patch('/' + store + '/' + viewModel.id + '.json?auth=' + token, model)
        .then(response => {
            dispatch(_add(store, viewModel));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}
export const addMany_async = (store, token, viewModels) => {
    return dispatch => {
        viewModels.forEach(viewModel => {
            dispatch(add_async(store, token, viewModel));
        });
    }
}


//  Add Tab  -------------------------------------------------------  Add Tab Async  //
export const addCollectionTab_async = (collection, token, user, viewModel) => {
    return dispatch => {
        axios.patch('/user/' + user + '/' + collection + '/' + viewModel.id + '.json?auth=' + token, create.tabModel(viewModel))
        .then(response => {
            dispatch(_addCollectionTab(collection, viewModel));
        })
        .catch(error => {
            dispatch(failure('user', error));
        });
    }
}


//  Delete  ---------------------------------------------------------  Delete Async  //
export const delete_async = (store, token, viewModel) => {
    return dispatch => {
        axios.delete('/' + store + '/' + viewModel.id + '.json?auth=' + token)
        .then(response => {
            dispatch(_delete(store, viewModel));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}
export const deleteMany_async = (store, token, viewModels) => {
    return dispatch => {
        viewModels.forEach(viewModel => {
            dispatch(delete_async(store, token, viewModel));
        });
    }
}


//  Delete Tab  -------------------------------------------------  Delete Tab Async  //
export const deleteCollectionTab_async = (collection, token, user, viewModel) => {
    return dispatch => {
        axios.delete('/user/' + user + '/' + collection + '/' + viewModel.id + '.json?auth=' + token)
        .then(response => {
            dispatch(_deleteCollectionTab(collection, viewModel));
        })
        .catch(error => {
            dispatch(failure('user', error));
        });
    }
}


//  Get  ---------------------------------------------------------------  Get Async  //
export const get_async = (store, token, id) => {
    return dispatch => {
        dispatch(_get_init(store));
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
            dispatch(_get_success(store, model));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}


//  Get All  -------------------------------------------------------  Get All Async  //
export const getAll_async = (store, token, user) => {
    return dispatch => {
        dispatch(_getAll_init(store));
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
            dispatch(_getAll_success(store, models));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    };
};


//  Update  ----------------------------------------------------------  Update Async  //
export const update_async = (store, token, viewModel) => {
    return dispatch => {
        let model = {};
        switch (store) {
            case 'card':
                model = create.cardModel(viewModel);
                break;
            case 'deck':
                model = create.deckModel(viewModel);
                break;
            case 'user':
                model = create.userModel(viewModel);
                break;
            default:
                break;
        }
        axios.put('/' + store + '/' + viewModel.id + '.json?auth=' + token, model)
        .then(response => {
            dispatch(_update(store, viewModel));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}
export const updateMany_async = (store, token, viewModels) => {
    return dispatch => {
        viewModels.forEach(viewModel => {
            dispatch(update_async(store, token, viewModel));
        });
    }
}