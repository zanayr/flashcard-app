
//  MODELS  ---------------------------------------------------------------  MODELS  //
//  Card  -------------------------------------------------------------  Card Model  //
export function cardModel (card) {
    const internal = /^\$[a-zA-Z0-9]*/;
    return {
        group: card.group,
        date: card.date,
        member: card.member,
        meta: card.meta,
        note: card.note,
        owner: card.owner,
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag.filter(tag => !tag.match(internal)),
    }
}

//  Deck  -------------------------------------------------------------  Deck Model  //
export function deckModel (deck) {
    const tab = {};
    if (deck.tab) {
        Object.keys(deck.tab).map(id => {
            tab[id] = tabModel(deck.tab[id]);
        });
    }
    return {
        date: deck.date,
        group: deck.group,
        member: deck.member,
        meta: deck.meta,
        note: deck.note,
        owner: deck.owner,
        primary: deck.primary,
        secondary: deck.secondary,
        tab: tab,
        tag: deck.tag
    }
}

//  Tab  ---------------------------------------------------------------  Tab Model  //
export function tabModel (tab) {
    return {
        collection: tab.collection,
        date: tab.date,
        group: tab.group,
        name: tab.name,
        tag: tab.tag
    }
}

//  Student  -------------------------------------------------------  Student Model  //
export function userModel (student) {
    return {
        date: student.date,
        group: student.group,
        info: {
            email: student.info.email,
            first: student.info.first,
            last: student.info.last,
            user: student.info.user
        },
        meta: student.meta,
        tab: student.tab,
        tag: student.tag
    }
}


//  VIEW MODELS  ------------------------------------------------------------  V.M.  //
//  Card View Model  ---------------------------------------------------  Card V.M.  //
export function cardViewModel (id, card) {
    const date = card.date || Date.now();
    const member = card.member || [];
    let tag = card.tag || [];
    if (!member.length) {
        tag = tag.concat('$unassigned');
    }
    if (Date.now() - date < 604800000) {
        tag = tag.concat('$new');
    }
    return {
        date: date,
        group: card.group || [],
        id: id,
        member: member,
        meta: card.meta || {},
        note: card.note || '',
        owner: card.owner,
        primary: card.primary || '',
        secondary: card.secondary || '',
        tag: tag,
    }
}

//  Deck View Model  ---------------------------------------------------  Deck V.M.  //
export function deckViewModel (id, deck) {
    const tab = {};
    if (deck.tab) {
        Object.keys(deck.tab).map(id => {
            tab[id] = tabViewModel(id, deck.tab[id]);
        });
    }
    return {
        date: deck.date || Date.now(),
        group: deck.group || [],
        id: id,
        member: deck.member || [],
        meta: deck.meta || {},
        note: deck.note || '',
        owner: deck.owner,
        primary: deck.primary || '',
        secondary: deck.secondary || '',
        tab: tab,
        tag: deck.tag || []
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

//  Tab View Model  -----------------------------------------------------  Tab V.M.  //
export function tabViewModel (id, tab) {
    return {
        active: tab.active || false,
        collection: tab.collection,
        date: tab.date || Date.now(),
        delete: id === 'default' ? false : true,
        group: tab.group || [],
        id: id,
        name: tab.name,
        tag: tab.tag || []
    }
}

//  Student View Model  ---------------------------------------------  Student V.M.  //
export function userViewModel (id, student) {
    const tab = {};
    if (student.tab) {
        Object.keys(student.tab).map(id => {
            tab[id] = tabViewModel(id, student.tab[id]);
        });
    }
    return {
        date: student.date || Date.now(),
        group: student.group || [],
        id: id,
        info: {
            email: student.info.email,
            first: student.info.first,
            last: student.info.last,
            user: student.info.user || id
        },
        meta: student.meta || {},
        privilage: 0,
        tab: tab,
        tag: student.tag || []
    }
}