
//  MODELS  ---------------------------------------------------------------  MODELS  //
//  Card  -------------------------------------------------------------  Card Model  //
// export function cardModel (card) {
//     const internal = /^\$[a-zA-Z0-9]*/;
//     return {
//         group: card.group,
//         date: card.date,
//         member: card.member,
//         meta: card.meta,
//         note: card.note,
//         owner: card.owner,
//         primary: card.primary,
//         secondary: card.secondary,
//         tag: card.tag.filter(tag => !tag.match(internal)),
//     }
// }
//  Tab  ---------------------------------------------------------------  Tab Model  //
//  Tab models are used for all "tab" database entites; these entites live inside of
//  of collection entites.
export function tabModel (model) {
    const internal = /^\$[a-zA-Z0-9]*/;
    return {
        date: model.date,
        group: model.group.filter(tag => !tag.match(internal)),
        name: model.name,
        tag: model.tag.filter(tag => !tag.match(internal))
    }
}

//  Item  -------------------------------------------------------------  Item Model  //
//  Item models are used for all "item" database entities; these inlcude cards,
//  students, reports and sessions.
export function itemModel (model) {
    const internal = /^\$[a-zA-Z0-9]*/;
    return {
        date: model.date,
        group: model.group.filter(tag => !tag.match(internal)),
        member: model.member,
        meta: model.meta,
        note: model.note,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tag: model.tag.filter(tag => !tag.match(internal)),
    }
}

//  Collection  -------------------------------------------------  Collection Model  //
//  Collection models are used for all "collection" database entities; these include
//  decks and classes.
export function collectionModel (model) {
    const internal = /^\$[a-zA-Z0-9]*/;
    const tab = {};
    if (model.tab) {
        Object.keys(model.tab).forEach(id => {
            tab[id] = tabModel(model.tab[id]);
        });
    }
    return {
        date: model.date,
        group: model.group.filter(tag => !tag.match(internal)),
        member: model.member,
        meta: model.meta,
        note: model.note,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tab: tab,
        tag: model.tag.filter(tag => !tag.match(internal))
    }
}


//  Deck  -------------------------------------------------------------  Deck Model  //
// export function deckModel (deck) {
//     const tab = {};
//     if (deck.tab) {
//         Object.keys(deck.tab).map(id => {
//             tab[id] = tabModel(deck.tab[id]);
//         });
//     }
//     return {
//         date: deck.date,
//         group: deck.group,
//         member: deck.member,
//         meta: deck.meta,
//         note: deck.note,
//         owner: deck.owner,
//         primary: deck.primary,
//         secondary: deck.secondary,
//         tab: tab,
//         tag: deck.tag
//     }
// }

//  Student  -------------------------------------------------------  Student Model  //
export function userModel (model) {
    return {
        class: model.class,
        date: model.date,
        deck: model.deck,
        group: model.group,
        info: {
            email: model.info.email,
            first: model.info.first,
            last: model.info.last,
            user: model.info.user
        },
        meta: model.meta,
        tab: model.tab,
        tag: model.tag
    }
}


//  VIEW MODELS  ------------------------------------------------------------  V.M.  //
//  Tab View Model  -----------------------------------------------------  Tab V.M.  //
export function tabViewModel (id, tab) {
    return {
        date: tab.date || Date.now(),
        group: tab.group || [],
        id: id,
        name: tab.name,
        tag: tab.tag || []
    }
}

//  Flashcard View Model  ------------------------------------------  FLASHCARD  //
//  Flashcard view models require a card ID with which to correlate
export function flashcardViewModel (model) {
    return {
        flagged: false,
        flipped: false,
        selected: false,
        id: model.id,
        meta: model.meta || {},
        primary: model.primary,
        secondary: model.secondary,
        tag: model.tag || [],
        zIndex: model.zIndex || 0
    }
}

//  Item View Model  ---------------------------------------------------  ITEM  //
//  Item view models require an ID and owner (a collection); they have an array of
//  member IDs (collection IDs)
export function itemViewModel (id, model) {
    const date = model.date || Date.now();
    const member = model.member || [];
    let tag = model.tag || [];
    if (!member.length) {
        tag = tag.concat('$unassigned');
    }
    if (Date.now() - date < 604800000 && !tag.includes('$new')) {
        tag = tag.concat('$new');
    }
    return {
        date: date,
        group: model.group || [],
        id: id,
        member: member,
        meta: model.meta || {},
        note: model.note || '',
        owner: model.owner,
        primary: model.primary || '',
        secondary: model.secondary || '',
        tag: tag,
    }
}


//  Collectionm View Model  -------------------------------------------  COLLECTION  //
//  Collection view models require an ID and an owner (a user); they have an array of
//  member IDs (item IDs)
export function collectionViewModel (id, model) {
    const tab = {};
    if (model.tab) {
        Object.keys(model.tab).map(id => {
            tab[id] = tabViewModel(id, model.tab[id]);
        });
    }
    return {
        date: model.date || Date.now(),
        group: model.group || [],
        id: id,
        member: model.member || [],
        meta: model.meta || {},
        note: model.note || '',
        owner: model.owner,
        primary: model.primary || '',
        secondary: model.secondary || '',
        tab: tab,
        tag: model.tag || []
    }
}


//  Deck View Model  --------------------------------------------------------  DECK  //
// export function deckViewModel (id, deck) {
//     const tab = {};
//     if (deck.tab) {
//         Object.keys(deck.tab).map(id => {
//             tab[id] = tabViewModel(id, deck.tab[id]);
//         });
//     }
//     return {
//         date: deck.date || Date.now(),
//         group: deck.group || [],
//         id: id,
//         member: deck.member || [],
//         meta: deck.meta || {},
//         note: deck.note || '',
//         owner: deck.owner,
//         primary: deck.primary || '',
//         secondary: deck.secondary || '',
//         tab: tab,
//         tag: deck.tag || []
//     }
// }

//  User View Model  ---------------------------------------------  User V.M.  //
export function userViewModel (id, model) {
    const classTab = {};
    const deckTab = {};
    if (model.class) {
        Object.keys(model.class).map(id => {
            classTab[id] = tabViewModel(id, model.class[id]);
        });
    }
    if (model.deck) {
        Object.keys(model.deck).map(id => {
            deckTab[id] = tabViewModel(id, model.deck[id]);
        });
    }
    return {
        class: classTab,
        date: model.date || Date.now(),
        deck: deckTab,
        group: model.group || [],
        id: id,
        info: {
            email: model.info.email,
            first: model.info.first,
            last: model.info.last,
            user: model.info.user || id
        },
        meta: model.meta || {},
        privilage: model.privilage || 0,
        tag: model.tag || []
    }
}