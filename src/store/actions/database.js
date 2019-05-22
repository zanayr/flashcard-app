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
        case 'class':
            type = actionTypes.CLASS_FAILURE;
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
        case 'class':
            type = actionTypes.ADD_CLASS;
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
export const _addTab = (store, collection, data) => {
    let type = null;
    switch (store) {
        case 'class':
            type = actionTypes.ADD_CLASS_TAB;
            break;
        case 'deck':
            type = actionTypes.ADD_DECK_TAB;
            break;
        case 'user':
            type = actionTypes.ADD_USER_TAB;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
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
        case 'class':
            type = actionTypes.DELETE_CLASS;
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
export const _deleteTab = (store, collection, data) => {
    let type = null;
    switch (store) {
        case 'class':
            type = actionTypes.DELETE_CLASS_TAB;
            break;
        case 'deck':
            type = actionTypes.DELETE_DECK_TAB;
            break;
        case 'user':
            type = actionTypes.DELETE_USER_TAB;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
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
        case 'class':
            type = actionTypes.GET_ALL_CLASSES_SUCCESS;
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
    console.log(store);
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.GET_ALL_CARDS_INIT;
            break;
        case 'class':
            type = actionTypes.GET_ALL_CLASSES_INIT;
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
        case 'class':
            type = actionTypes.UPDATE_CLASS;
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
export const _updateTag = (store, collection, data) => {
    let type = null;
    switch (store) {
        case 'card':
            type = actionTypes.UPDATE_CARD_TAG;
            break;
        case 'class':
            type = actionTypes.UPDATE_CLASS_TAG;
            break;
        case 'deck':
            type = actionTypes.UPDATE_DECK_TAG;
            break;
        case 'user':
            type = actionTypes.UPDATE_USER_TAG;
            break;
        default:
            type = actionTypes.SUCCESS;
            break;
    }
    return {
        type: type,
        payload: {
            collection: collection,
            tag: data
        }
    };
}


//  Add  ---------------------------------------------------------------  Add Async  //
export const add_async = (store, token, viewModel) => {
    return dispatch => {
        let model = {};
        switch (store) {
            case 'card':
                model = create.itemModel(viewModel);
                break;
            case 'class':
                model = create.collectionModel(viewModel);
                break;
            case 'deck':
                model = create.collectionModel(viewModel);
                break;
            case 'user':
                model = create.userModel(viewModel);
                break;
            default:
                break;
        }
        console.log(store, model);
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
export const addTab_async = (store, collection, token, id, tab) => {
    return dispatch => {
        axios.patch('/' + store + '/' + id + '/' + collection + '/' + tab.id + '.json?auth=' + token, create.tabModel(tab))
        .then(response => {
            dispatch(_addTab(store, collection, tab));
        })
        .catch(error => {
            dispatch(failure(store, error));
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
export const deleteTab_async = (store, collection, token, id, tab) => {
    console.log(store);
    return dispatch => {
        axios.delete('/' + store + '/' + id + '/' + collection + '/' + tab.id + '.json?auth=' + token)
        .then(response => {
            dispatch(_deleteTab(store, collection, tab));
        })
        .catch(error => {
            dispatch(failure(store, error));
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
                //     model = create.itemViewModel(id, response.data);
                //     break;
                // case 'deck':
                //     model = create.collectionViewModel(id, response.data);
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
                        models[id] = create.itemViewModel(id, response.data[id]);
                    });
                    break;
                case 'class':
                        Object.keys(response.data).forEach(id => {
                            models[id] = create.collectionViewModel(id, response.data[id]);
                        });
                        break;
                case 'deck':
                    Object.keys(response.data).forEach(id => {
                        models[id] = create.collectionViewModel(id, response.data[id]);
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
                model = create.itemModel(viewModel);
                break;
            case 'class':
                model = create.collectionModel(viewModel);
                break;
            case 'deck':
                model = create.collectionModel(viewModel);
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

//  Update Tag  -------------------------------------------------  Update Tag Async  //
export const updateTag_async = (store, collection, token, id, tag) => {
    return dispatch => {
        axios.put('/' + store + '/' + id + '/' + collection + '.json?auth=' + token, tag)
        .then(response => {
            dispatch(_updateTag(store, collection, tag));
        })
        .catch(error => {
            dispatch(failure(store, error));
        });
    }
}