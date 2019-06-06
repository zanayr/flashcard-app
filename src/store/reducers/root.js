import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import cardReducer, * as FromCard from './card';
import deckReducer, * as FromDeck from './deck';
import modalReducer, * as FromModal from './modal';
import userReducer, * as FromUser from './user';


//  Store constants
const AUTH = 'AUTH';
const CARD = 'CARD';
const DECK = 'DECK';
const MODAL = 'MODAL';
const USER = 'USER';


const rootReducer = combineReducers({
    AUTH: authReducer,
    CARD: cardReducer,
    DECK: deckReducer,
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
export function cardsById (store, ids) {
    return FromCard.selectCardsById(store[CARD], ids);
}

//  Deck  -----------------------------------------------------------  Deck Selectors  //
export function deck (store, id) {
    return FromDeck.selectDeck(store[DECK], id);
}
export function decks (store) {
    return FromDeck.selectDecks(store[DECK]);
}
export function decksIsLoading (store) {
    return FromDeck.selectDecksIsLoading(store[DECK]);
}


//  Is Loading  ------------------------------------------------  Is Loading Selector  //
export function isLoading (store, collection) {
    switch (collection) {
        case 'card':
            return FromCard.selectCardsIsLoading(store[CARD]);
        case 'deck':
            return FromDeck.selectDecksIsLoading(store[DECK]);
        case 'user':
            return FromUser.selectUserIsLoading(store[USER]);
        default:
            break;
    }
}
//  Collection  ------------------------------------------------ Collection Selectors  //
export function collections (store, collection) {
    switch (collection) {
        case 'deck':
            return FromDeck.selectDecks(store[DECK]);
        default:
            break;
    }
}
export function collection (store, collection, id) {
    switch (collection) {
        case 'deck':
            return FromDeck.selectDeck(store[DECK], id);
        default:
            break;
    }
}

//  Item  ---------------------------------------------------------- Item Selectors  //
export function items (store, collection) {
    switch (collection) {
        case 'card':
            return FromCard.selectCards(store[CARD]);
        default:
            break;
    }
}

//  Modal  -------------------------------------------------------- Modal Selectors  //
export function modals (store) {
    return FromModal.selectModals(store[MODAL]);
}

//  User  ---------------------------------------------------------  User Selectors  //
export function user (store) {
    return FromUser.selectUser(store[USER]);
}
export function userById (store, id) {
    return FromUser.selectUserById(store[USER], id);
}
export function users (store) {
    return FromUser.selectUsers(store[USER]);
}
export function userIsLoading (store) {
    return FromUser.selectUserIsLoading(store[USER]);
}


export default rootReducer;