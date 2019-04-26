import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import deckReducer, * as FromDeck from './deck';
import modalReducer, * as FromModal from './modal';


const AUTH = 'AUTH';
const DECK = 'DECK';
const MODAL = 'MODAL';

const rootReducer = combineReducers({
    AUTH: authReducer,
    DECK: deckReducer,
    MODAL: modalReducer
});


//  STORE SELECTORS  --------------------------------------------------- SELECTORS  //
//  Auth  --------------------------------------------------------- Auth Selectors  //
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

//  Deck  ---------------------------------------------------------- Deck Selectors  //
export function deckByKey (store, id) {
    return FromDeck.selectDeckByKey(store[DECK], id);
}
export function decks (store, collection) {
    return FromDeck.selectDecks(store[DECK], collection);
}
export function decksBy (store, collection, sort) {
    return FromDeck.selectDecksBy(store[DECK], collection, sort);
}
export function deckIsLoading (store) {
    return FromDeck.selectDecksIsLoading(store[DECK]);
}

//  Modal  -------------------------------------------------------- Modal Selectors  //
export function modals (store) {
    return FromModal.selectModals(store[MODAL]);
}

export default rootReducer;