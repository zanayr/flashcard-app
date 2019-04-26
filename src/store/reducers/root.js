import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import collectionReducer, * as FromCollection from './collections';
import modalReducer from './modal';

const AUTH = 'auth';
const COLLECTION = 'collection';

const rootReducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
    modal: modalReducer
});



//  STORE SELECTORS  --------------------------------------------------- SELECTORS  //
//  Auth  --------------------------------------------------------- Auth Selectors  //
export function select_token (store) {
    return FromAuth.selectToken(store[AUTH]);
}
export function select_user (store) {
    return FromAuth.selectUser(store[AUTH]);
}

//  Collection  --------------------------------------------------- Coll. Selectors  //
export function select_collection (store, collection) {
    return FromCollection.selectCollection(store[COLLECTION], collection);
}
export function select_collectionBy (store, collection, method) {
    return FromCollection.selectCollectionBy(store[COLLECTION], collection, method);
}
export function select_isLoading (store) {
    return FromCollection.selectIsLoading(store[COLLECTION]);
}
export function select_itemByKey (store, id) {
    return FromCollection.selectItemByKey(store[COLLECTION], id);
}


export default rootReducer;