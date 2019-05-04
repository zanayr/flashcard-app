//  Item Models  //
export function itemViewModel (id, model) {
    return {
        date: model.date,
        groups: model.groups || [],
        id: id,
        meta: model.meta || {},
        notes: model.notes || '',
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags || [],
        type: model.type
    }
}
export function itemModel (model) {
    return {
        date: model.date,
        groups: model.groups,
        meta: model.meta,
        notes: model.notes,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags,
        type: model.type
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
    let tabs = {};
    Object.keys(model.tabs).map(id => {
        tabs[id] = tabViewModel(id, model.tabs[id]);
    });
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
        tabs: {
            ...tabs,
            card: {
                collection: 'card',
                date: 1,
                delete: false,
                groups: [],
                id: 1,
                name: 'Cards',
                tags: []
            },
            deck: {
                collection: 'deck',
                date: 0,
                delete: false,
                groups: [],
                id: 0,
                name: 'Decks',
                tags: []
            },
        },
        tags: model.tags || []
    }
}