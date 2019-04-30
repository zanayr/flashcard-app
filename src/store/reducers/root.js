import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import collReducer, * as FromColl from './collection';
import modalReducer, * as FromModal from './modal';


const AUTH = 'AUTH';
const COLL = 'COLL';
const MODAL = 'MODAL';

const rootReducer = combineReducers({
    AUTH: authReducer,
    COLL: collReducer,
    MODAL: modalReducer
});


//  STORE SELECTORS  --------------------------------------------------- SELECTORS  //
//  Authentication  ------------------------------------- Authentication Selectors  //
export function authError (store) {
    return FromAuth.selectAuthError(store[AUTH]);
}
export function authIsLoading (store) {
    return FromAuth.selectAuthIsLoading(store[AUTH]);
}
export function authToken (store) {
    return FromAuth.selectAuthToken(store[AUTH]);
}
export function authUser (store) {
    return FromAuth.selectAuthUser(store[AUTH]);
}

//  Collection  ------------------------------------------------ Collection Selectors  //
export function cards (store) {
    return FromColl.selectCards(store[COLL]);
}
export function cardsIsLoading (store) {
    return FromColl.selectCardsIsLoading(store[COLL]);
}
export function decks (store) {
    return FromDeck.selectDecks(store[COLL]);
}
export function decksIsLoading (store) {
    return FromDeck.selectDecksIsLoading(store[COLL]);
}

//  Modal  -------------------------------------------------------- Modal Selectors  //
export function modals (store) {
    return FromModal.selectModals(store[MODAL]);
}

export default rootReducer;