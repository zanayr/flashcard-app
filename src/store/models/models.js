
//  MODELS  ---------------------------------------------------------------  MODELS  //
//  Card  -------------------------------------------------------------  Card Model  //
export function cardModel (card) {
    return {
        group: card.group,
        date: card.date,
        meta: card.meta,
        notes: card.notes,
        owner: card.owner,
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag,
    }
}

//  Deck  -------------------------------------------------------------  Deck Model  //
export function deckModel (deck) {
    return {
        group: deck.group,
        date: deck.date,
        members: deck.members,
        meta: deck.meta,
        notes: deck.notes,
        owner: deck.owner,
        primary: deck.primary,
        secondary: deck.secondary,
        tag: deck.tag,
    }
}


//  VIEW MODELS  ------------------------------------------------------------  V.M.  //
//  Card View Model  ---------------------------------------------------  Card V.M.  //
export function cardViewModel (id, card) {
    return {
        date: card.date || Date.now(),
        group: card.group || [],
        id: id,
        meta: card.meta || {},
        notes: card.notes || '',
        owner: card.owner,
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag || [],
    }
}

//  Deck View Model  ---------------------------------------------------  Deck V.M.  //
export function deckViewModel (id, deck) {
    return {
        date: deck.date || Date.now(),
        group: deck.group || [],
        groups: deck.groups || [],
        id: id,
        memberOf: deck.memberOf || [],
        meta: deck.meta || {},
        notes: deck.notes || '',
        owner: deck.owner,
        primary: deck.primary,
        secondary: deck.secondary,
        tag: deck.tag || [],
        tags: deck.tags || []
    }
}

//  Flashcard View Model  ------------------------------------------  Flashcard V.M.  //
export function flashcardViewModel (card) {
    return {
        flagged: false,
        flipped: false,
        selected: false,
        id: card.id,
        meta: card.meta || {},
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag || [],
        zIndex: card.zIndex || 0
    }
}





export function collectionViewModel (id, model) {
    const tabs = {};
    if (model.tabs) {
        Object.keys(model.tabs).map(id => {
            tabs[id] = tabViewModel(id, model.tabs[id]);
        });
    }
    return {
        date: model.date || Date.now(),
        groups: model.groups || [],
        id: id,
        members: model.members || {},
        meta: model.meta || {},
        notes: model.notes || '',
        owner: model.owner,
        primary: model.primary || '',
        secondary: model.secondary || '',
        tabs: {
            ...tabs,
            all: {
                date: 0,
                delete: false,
                groups: [],
                id: 'deck',
                name: 'Decks',
                tags: []
            }
        },
        tags: model.tags || []
    }
}
export function collectionModel (model) {
    return {
        date: model.date,
        groups: model.groups,
        members: model.members,
        meta: model.meta,
        notes: model.notes,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags
    }
}


//  Tab Models  //
export function tabViewModel (id, data) {
    return {
        collection: data.collection,
        date: data.date,
        delete: true,
        groups: data.groups || [],
        id: id,
        name: data.name,
        tags: data.tags || []
    }
}
export function tabModel (data) {
    return {
        collection: data.collection,
        date: data.date,
        groups: data.groups,
        name: data.name,
        tags: data.tags
    }
}


//  User Models  //
export function userModel (id, model) {
    const tabs = {};
    if (model.tabs) {
        Object.keys(model.tabs).map(id => {
            tabs[id] = tabViewModel(id, model.tabs[id]);
        });
    }
    return {
        classes: model.classes || [],
        date: model.date,
        groups: model.groups || [],
        id: id,
        info: {
            email: model.info.email,
            first: model.info.first,
            last: model.info.last,
            user: model.info.user
        },
        meta: model.meta || {},
        privilage: model.privilage,
        tabs: tabs,
        tags: model.tags || []
    }
}