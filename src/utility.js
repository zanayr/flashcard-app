export const createHashId = () => {
    return Math.floor(((Date.now() + Math.random()) * 10)).toString(36).substr(2, 9).split('').reverse().join('');
}

export const insertItem = (array, index, item) => {
    let newArray = array.slice();
    newArray.splice(index, 0, item);
    console.log(newArray);
    return newArray;
}