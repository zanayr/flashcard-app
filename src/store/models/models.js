//  MODELS  ---------------------------------------------------------------  MODELS  //
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
        flag: model.flag,
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

//  Student  -------------------------------------------------------  Student Model  //
export function userModel (model) {
    return {
        card: model.card,
        class: model.class,
        date: model.date,
        deck: model.deck,
        group: model.group,
        info: {
            email: model.info.email,
            first: model.primary,
            last: model.secondary,
            note: model.note,
            user: model.info.user
        },
        meta: model.meta,
        privilage: model.privilage,
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
        flagged: model.flag,
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
        flag: model.flag || false,
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
    const date = model.date || Date.now();
    const tab = {};
    let tag = model.tag || [];
    if (model.tab) {
        Object.keys(model.tab).forEach(id => {
            tab[id] = tabViewModel(id, model.tab[id]);
        });
    }
    if (Date.now() - date < 604800000 && !tag.includes('$new')) {
        tag = tag.concat('$new');
    }
    return {
        date: date,
        group: model.group || [],
        id: id,
        member: model.member || [],
        meta: model.meta || {},
        note: model.note || '',
        owner: model.owner,
        primary: model.primary || '',
        secondary: model.secondary || '',
        tab: tab,
        tag: tag
    }
}

//  User View Model  ---------------------------------------------  User V.M.  //
export function userViewModel (id, model) {
    const cardTab = {};
    const classTab = {};
    const deckTab = {};
    if (model.card) {
        Object.keys(model.card).forEach(id => {
            cardTab[id] = tabViewModel(id, model.card[id]);
        });
    }
    if (model.class) {
        Object.keys(model.class).forEach(id => {
            classTab[id] = tabViewModel(id, model.class[id]);
        });
    }
    if (model.deck) {
        Object.keys(model.deck).forEach(id => {
            deckTab[id] = tabViewModel(id, model.deck[id]);
        });
    }
    return {
        card: cardTab,
        class: classTab,
        date: model.date || Date.now(),
        deck: deckTab,
        group: model.group || [],
        id: id,
        info: {
            email: model.info.email,
            user: model.info.user || id
        },
        meta: model.meta || {},
        note: model.info.note || '',
        primary: model.info.first,
        privilage: model.privilage || 0,
        secondary: model.info.last,
        tag: model.tag || []
    }
}