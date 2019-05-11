
//  MODELS  ---------------------------------------------------------------  MODELS  //
//  Card  -------------------------------------------------------------  Card Model  //
export function cardModel (card) {
    return {
        group: card.group,
        date: card.date,
        meta: card.meta,
        note: card.note,
        owner: card.owner,
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag,
    }
}

//  Deck  -------------------------------------------------------------  Deck Model  //
export function deckModel (deck) {
    return {
        date: deck.date,
        group: deck.group,
        member: deck.member,
        meta: deck.meta,
        note: deck.note,
        owner: deck.owner,
        primary: deck.primary,
        secondary: deck.secondary,
        tab: deck.tab,
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
    return {
        date: card.date || Date.now(),
        group: card.group || [],
        id: id,
        meta: card.meta || {},
        note: card.note || '',
        owner: card.owner,
        primary: card.primary,
        secondary: card.secondary,
        tag: card.tag || [],
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
        member: deck.member || {},
        meta: deck.meta || {},
        note: deck.note || '',
        owner: deck.owner,
        primary: deck.primary || '',
        secondary: deck.secondary || '',
        tab: {
            ...tab,
            all: {
                date: 0,
                delete: false,
                group: [],
                id: 'deck',
                name: 'Decks',
                tag: []
            }
        },
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
export function tabViewModel (id, data) {
    return {
        collection: data.collection,
        date: data.date,
        delete: true,
        group: data.group || [],
        id: id,
        name: data.name,
        tag: data.tag || []
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