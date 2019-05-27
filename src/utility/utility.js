import * as sortTypes from './sortTypes';

//  PRIVATE SORTING FUNCTIONS  //
//  Alphabetically Ascending  //
function _sortByAlpha_asc (arr) {
    return arr.sort((a, b) => {
        const A = a.primary.toUpperCase();
        const B = b.primary.toUpperCase();
        let c = 0;
        if (A > B) {
            c = 1;
        } else if (A < B) {
            c = -1;
        }
        return c;
    });
}
//  Alphabetically Descending  //
function _sortByAlpha_dsc (arr) {
    return arr.sort((a, b) => {
        const A = a.primary.toUpperCase();
        const B = b.primary.toUpperCase();
        let c = 0;
        if (A < B) {
            c = 1;
        } else if (A > B) {
            c = -1;
        }
        return c;
    });
}
//  Date Ascending  //
function _sortByDate_asc (arr) {
    return arr.sort((a, b) => {
        return b.date - a.date;
    });
}
//  Date Descending  //
function _sortByDate_dsc (arr) {
    return arr.sort((a, b) => {
        return a.date - b.date;
    });
}

//  SORT BY  //
export function sortBy (type, collection) {
    const arr = Object.keys(collection).map(id => {
        return collection[id];
    });
    switch (type) {
        case sortTypes.ALPHA_ASC:
            return _sortByAlpha_asc(arr);
        case sortTypes.ALPHA_DSC:
            return _sortByAlpha_dsc(arr);
        case sortTypes.DATE_ASC:
            return _sortByDate_asc(arr);;
        case sortTypes.DATE_DSC:
            return _sortByDate_dsc(arr);;
        default:
            return collection;
    }
}


//  PUBLIC SORTING FUNCTIONS  //
//  Ascending  //
export function sortByAlpha_asc (arr) {
    return arr.sort((a, b) => {
        const A = a.toUpperCase();
        const B = b.toUpperCase();
        let c = 0;
        if (A > B) {
            c = 1;
        } else if (A < B) {
            c = -1;
        }
        return c;
    });
}
//  Descending  //
export function sortByAlpha_dsc (arr) {
    return arr.sort((a, b) => {
        const A = a.toUpperCase();
        const B = b.toUpperCase();
        let c = 0;
        if (A < B) {
            c = 1;
        } else if (A > B) {
            c = -1;
        }
        return c;
    });
}


//  CREATE UNIQUE HASH ID  //
export function createHashId (i) {
    return (Date.now().toString(36) + (Math.floor((Date.now() + Math.random() * 10)) + (i * 10)).toString(36).substr(4, 9)).split('').reverse().join('');
}


//  SHUFFLE ARRAY  //
//  Fisher-Yates Shuffle  //
export function shuffle (arr) {
    let i = arr.length - 1;
    for (i; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}



//  COMPARE TWO ARRAYS  //
export function compareArrays (a, b) {
    if (a === b) {
        return true;
    }
    if (a == null || b == null) {
        return false;
    }
    if (a.length != b.length) {
        return false;
    }

    let A = sortByAlpha_asc(a.slice());
    let B = sortByAlpha_asc(b.slice());
  
    for (var i = 0; i < A.length; ++i) {
        if (A[i] !== B[i]) {
            return false;
        }
    }
    return true;
  }