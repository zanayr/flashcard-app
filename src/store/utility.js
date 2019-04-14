
export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}
/*

inside all reducers:
import {updateObject} from '../utility.js';

//...
    case actionType.FOO:
        return updateObject(state, {bar: state.bar - action.payload})
//...
OR
//..
    case actionType.FOO:
        const value = state.bar - action.payload;
        return updateObject(state, {bar: value})
//..

NOTE:   sometimes it's better to extract large switch
        case statements into a function:
/...
const spam = (state, action) = {
    const value = state.bar - action.payload;
    return updateObject(state, {bar: value})
}
//..
    case actionType.FOO:
        spam(state, action)
//..
*/