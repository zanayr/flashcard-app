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
        tags: model.tags || []
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
        tags: model.tags
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
            cards: {
                collection: 'cards',
                date: 1,
                groups: [],
                name: 'Cards',
                tags: []
            },
            decks: {
                collection: 'decks',
                date: 0,
                groups: [],
                name: 'Decks',
                tags: []
            },
        },
        tags: model.tags || []
    }
}