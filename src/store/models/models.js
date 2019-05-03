//  Item Models  //
export function itemStoreModel (model) {
    return {
        date: model.date,
        notes: model.notes,
        meta: model.meta,
        primary: model.primary,
        secondary: model.secondary,
        type: model.type,
        owner: model.owner
    }
}
export function itemViewModel (id, model) {
    return {
        date: model.date,
        id: id,
        isSelected: false,
        isActive: false,
        notes: model.notes,
        meta: model.meta,
        primary: model.primary,
        secondary: model.secondary,
        type: model.type,
        owner: model.owner
    }
}

//  User Models  //
export function userStoreModel (model) {
    return {
        classes: model.classes || [],
        date: model.date,
        groups: model.groups || [],
        info: {
            email: model.info.email,
            first: model.info.first,
            last: model.info.last,
        },
        priv: model.priv,
        meta: model.meta,
        tabs: model.tabs,
        tags: model.tags || []
    }
}
export function userViewModel (id, model) {
    return {
        classes: model.classes || [],
        date: model.date,
        groups: model.groups || [],
        id: id,
        info: {
            email: model.info.email,
            first: model.info.first,
            last: model.info.last,
        },
        priv: model.priv,
        meta: model.meta,
        tabs: model.tabs,
        tags: model.tags || []
    }
}