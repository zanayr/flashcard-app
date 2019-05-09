//  Cards  //
export function cardModel (model) {
    return {
        date: model.date,
        groups: model.groups,
        memberOf: model.memberOf,
        meta: model.meta,
        notes: model.notes,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags
    }
}

export function cardViewModel (id, model) {
    //  The default values are a result of
    //  Google's firebase API deleting null values...
    return {
        date: model.date || Date.now(),
        groups: model.groups || [],
        id: id,
        memberOf: model.memberOf || [],
        meta: model.meta || {},
        notes: model.notes || '',
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary || '',
        tags: model.tags || []
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