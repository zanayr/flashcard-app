export {
    auth_async,
    authOut_async,
    checkAuth_async
} from './auth';

export {
    addCard_async,
    addManyCards_async,
    deleteCard_async,
    deleteManyCards_async,
    getAllCards_async,
    updateCard_async
} from './card';

export {
    addDeck_async,
    addManyDecks_async,
    deleteDeck_async,
    deleteManyDecks_async,
    getAllDecks_async,
    updateDeck_async
} from './deck';

// export {
//     getCollection,
//     deleteItem_async,
//     deleteManyItems_async,
//     getAllItems_async,
//     patchItem_async,
//     patchManyItems_async,
//     putItem_async
// } from './collection';

export {
    deleteTab_async,
    getUser_async,
    patchUser_async,
    patchTab_async,
    putUser_async,
    putTag_async
} from './user'

export {
    displayModal,
    clearModal,
    displayModal_async
} from './modal';