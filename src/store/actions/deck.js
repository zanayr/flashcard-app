// import * as actionTypes from './actionTypes';
// import * as create from '../models/models';
// import axios from '../database';

// //  This file holds the action creators for the deck redux
// //  store and interface with the firebase deckbase


// //  ACTION CREATORS  ---------------------------------------------  ACTION CREATORS  //
// //  Add  ----------------------------------------------------------------  Add A.C.  //
// export const addDeck_success = (deck) => {
//     return {
//         type: actionTypes.ADD_DECK_SUCC,
//         payload: deck
//     }
// }

// //  Delete  ----------------------------------------------------------  Delete A.C.  //
// export const deleteDeck_success = (deck) => {
//     return {
//         type: actionTypes.DELETE_DECK_SUCC,
//         payload: deck
//     };
// };

// //  Failure  --------------------------------------------------------  Failure A.C.  //
// export const deck_fail = (error) => {
//     return {
//         type: actionTypes.DECK_FAIL,
//         payload: error
//     };
// };

// //  Get All  --------------------------------------------------------  Get All A.C.  //
// export const getAllDecks_init = () => {
//     return {
//         type: actionTypes.GET_ALL_DECKS_INIT,
//         payload: {}
//     }
// }
// export const getAllDecks_success = (deck) => {
//     return {
//         type: actionTypes.GET_ALL_DECKS_SUCC,
//         payload: deck
//     }
// }

// //  Update  ----------------------------------------------------------  Update A.C.  //
// export const updateDeck_success = (deck) => {
//     return {
//         type: actionTypes.UPDATE_DECK_SUCC,
//         payload: deck
//     };
// };


// //  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
// //  Add  ---------------------------------------------------------------  Add Async  //
// export const addDeck_async = (token, deck) => {
//     return dispatch => {
//         axios.patch('/deck/' + deck.id + '.json?auth=' + token, create.deckModel(deck))
//         .then(response => {
//             dispatch(addDeck_success(deck));
//         })
//         .catch(error => {
//             dispatch(deck_fail(error));
//         });
//     };
// };
// export const addManyDecks_async = (token, deck) => {
//     return dispatch => {
//         deck.forEach(deck => {
//             dispatch(addDeck_async(token, deck));
//         });
//     }
// };

// //  Delete  ---------------------------------------------------------  Delete Async  //
// export const deleteDeck_async = (token, deck) => {
//     return dispatch => {
//         axios.delete('/deck/' + deck.id + '.json?auth=' + token)
//         .then(response => {
//             dispatch(deleteDeck_success(deck));
//         })
//         .catch(error => {
//             dispatch(deck_fail(error));
//         });
//     };
// };
// export const deleteManyDecks_async = (token, deck) => {
//     return dispatch => {
//         deck.forEach(deck => {
//             dispatch(deleteDeck_async(token, deck));
//         });
//     }
// };

// //  Get All  -------------------------------------------------------  Get All Async  //
// export const getAllDecks_async = (token, user) => {
//     return dispatch => {
//         dispatch(getAllDecks_init());
//         axios.get('/deck.json?auth=' + token + '&orderBy="owner"&equalTo="' + user + '"')
//         .then(response => {
//             dispatch(getAllDecks_success(response.data));
//         })
//         .catch(error => {
//             dispatch(deck_fail(error));
//         });
//     };
// };

// //  Update  ---------------------------------------------------------  Update Async  //
// export const updateDeck_async = (token, deck) => {
//     return dispatch => {
//         axios.put('/deck/' + deck.id + '.json?auth=' + token, create.deckModel(deck))
//         .then(response => {
//             dispatch(updateDeck_success(deck));
//         })
//         .catch(error => {
//             dispatch(deck_fail(error));
//         });
//     };
// };
// export const updateDeckMember_async = (token, deck, members) => {
//     return dispatch => {
//         dispatch(updateDeck_async(token, {
//             ...deck,
//             member: members
//         }));
//     }
// }