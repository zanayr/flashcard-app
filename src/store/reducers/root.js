import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import cardReducer, * as FromCard from './card';
import deckReducer, * as FromDeck from './deck';
import collReducer, * as FromColl from './collection';
import modalReducer, * as FromModal from './modal';
import userReducer, * as FromUser from './user';


//  Store constants
const AUTH = 'AUTH';
const CARD = 'CARD';
const DECK = 'DECK';
const COLL = 'COLL';
const MODAL = 'MODAL';
const USER = 'USER';


const rootReducer = combineReducers({
    AUTH: authReducer,
    CARD: cardReducer,
    DECK: deckReducer,
    COLL: collReducer,
    MODAL: modalReducer,
    USER: userReducer
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

//  Card  -----------------------------------------------------------  Card Selectors  //
export function cards (store) {
    return FromCard.selectCards(store[CARD]);
}
export function cardsIsLoading (store) {
    return FromCard.selectCardsIsLoading(store[CARD]);
}

//  Deck  -----------------------------------------------------------  Deck Selectors  //
export function decks (store) {
    return FromDeck.selectDecks(store[DECK]);
}
export function decksIsLoading (store) {
    return FromDeck.selectDecksIsLoading(store[DECK]);
}

//  Collection  ------------------------------------------------ Collection Selectors  //
export function collection (store, collection, id) {
    return FromColl.selectCollection(store[COLL], collection, id);
}
// export function cards (store) {
//     return FromColl.selectCards(store[COLL]);
// }
// export function cardsIsLoading (store) {
//     return FromColl.selectCardsIsLoading(store[COLL]);
// }
// export function decks (store) {
//     return FromColl.selectDecks(store[COLL]);
// }
// export function decksIsLoading (store) {
//     return FromColl.selectDecksIsLoading(store[COLL]);
// }

//  Modal  -------------------------------------------------------- Modal Selectors  //
export function modals (store) {
    return FromModal.selectModals(store[MODAL]);
}

//  User  ---------------------------------------------------------  User Selectors  //
export function user (store) {
    return FromUser.selectUser(store[USER]);
}
export function userId (store) {
    return FromUser.selectUserId(store[USER]);
}
export function userIsLoading (store) {
    return FromUser.selectUserIsLoading(store[USER]);
}
export function userTabs (store) {
    return FromUser.selectUserTabs(store[USER]);
}


export default rootReducer;