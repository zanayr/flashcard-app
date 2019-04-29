export const createHashId = (i) => {
    return (Date.now().toString(36) + (Math.floor((Date.now() + Math.random() * 10)) + i).toString(36).substr(4, 9)).split('').reverse().join('');
}

export const insertItem = (array, index, item) => {
    let newArray = array.slice();
    newArray.splice(index, 0, item);
    console.log(newArray);
    return newArray;
}