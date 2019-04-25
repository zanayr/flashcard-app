import {combineReducers} from 'redux'

import authReducer from './auth';
import collectionReducer, * as FromCollection from './collections';
import modalReducer from './modal';

const COLLECTION = 'collection';

const rootReducer = combineReducers({
    auth: authReducer,
    collection: collectionReducer,
    modal: modalReducer
});

export function getDeckCollection (store) {
    return FromCollection.getDecks(store[COLLECTION]);
}
export function getDecksBy (store, method) {
    return FromCollection.getDecksBy(store[COLLECTION], method);
}
export function getDeckById (store, id) {
    return FromCollection.getDeckById(store[COLLECTION], id);
}
export function getIsPosting (store) {
    return FromCollection.getIsPosting(store[COLLECTION]);
}
export function getIsLoading (store) {
    return FromCollection.getLoading(store[COLLECTION]);
}

export default rootReducer;