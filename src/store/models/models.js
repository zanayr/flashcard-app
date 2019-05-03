//  Item Models  //
export function itemStoreModel (model) {
    return {
        date: model.date,
        groups: model.groups || [],
        meta: model.meta || {},
        notes: model.notes || '',
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags || [],
        type: model.type
    }
}
export function itemViewModel (id, model) {
    return {
        date: model.date,
        groups: model.groups,
        id: id,
        isSelected: false,
        isActive: false,
        meta: model.meta,
        notes: model.notes,
        owner: model.owner,
        primary: model.primary,
        secondary: model.secondary,
        tags: model.tags,
        type: model.type
    }
}

//  User Models  //
export function userModel (id, model) {
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
            ...model.tabs,
            card: {
                collection: 'card',
                date: 1,
                delete: false,
                groups: [],
                name: 'Cards',
                tags: []
            },
            deck: {
                collection: 'deck',
                date: 0,
                delete: false,
                groups: [],
                name: 'Decks',
                tags: []
            },
        },
        tags: model.tags || []
    }
}

//  Tab Models  //
export function tabModel (data) {
    return {
        collection: data.collection,
        date: data.date,
        delete: true,
        groups: data.groups,
        name: data.name,
        tags: data.tags
    }
}