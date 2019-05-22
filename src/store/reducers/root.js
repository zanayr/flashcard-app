import {combineReducers} from 'redux'

import authReducer, * as FromAuth from './auth';
import cardReducer, * as FromCard from './card';
import classReducer, * as FromClass from './class';
import deckReducer, * as FromDeck from './deck';
import modalReducer, * as FromModal from './modal';
import studentReducer, * as FromStudent from './student';
import userReducer, * as FromUser from './user';


//  Store constants
const AUTH = 'AUTH';
const CARD = 'CARD';
const CLASS = 'CLASS';
const DECK = 'DECK';
const MODAL = 'MODAL';
const STUDENT = 'STUDENT';
const USER = 'USER';


const rootReducer = combineReducers({
    AUTH: authReducer,
    CARD: cardReducer,
    CLASS: classReducer,
    DECK: deckReducer,
    MODAL: modalReducer,
    STUDENT: studentReducer,
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
        case 'class':
            return FromClass.selectClassesIsLoading(store[CLASS]);
        case 'deck':
            return FromDeck.selectDecksIsLoading(store[DECK]);
        case 'user':
            return FromUser.selectUserIsLoading(store[USER]);
            break;
        default:
            break;
    }
}
//  Collection  ------------------------------------------------ Collection Selectors  //
export function collections (store, collection) {
    switch (collection) {
        case 'class':
            return FromClass.selectClasses(store[CLASS]);
        case 'deck':
            return FromDeck.selectDecks(store[DECK]);
        case 'class':
            break;
        default:
            break;
    }
}
export function collection (store, collection, id) {
    switch (collection) {
        case 'class':
            return FromClass.selectClass(store[CLASS], id);
        case 'deck':
            return FromDeck.selectDeck(store[DECK], id);
        case 'class':
            break;
        default:
            break;
    }
}

//  Item  ---------------------------------------------------------- Item Selectors  //
export function items (store, collection) {
    switch (collection) {
        case 'card':
            return FromCard.selectCards(store[CARD]);
        case 'student':
            return FromStudent.selectStudents(store[STUDENT]);
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