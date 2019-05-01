export const createHashId = (i) => {
    return (Date.now().toString(36) + (Math.floor((Date.now() + Math.random() * 10)) + i).toString(36).substr(4, 9)).split('').reverse().join('');
}

export const sortAlpha = (arr) => {
    return arr.slice().sort((a, b) => {
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

export const insertItem = (array, index, item) => {
    let newArray = array.slice();
    newArray.splice(index, 0, item);
    console.log(newArray);
    return newArray;
}