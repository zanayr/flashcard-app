import * as actionTypes from './actionTypes';
import axios from '../database';


//  ACTION CREATORS  ---------------------------------------------  ACTION CREATORS  //
//  Delete  ----------------------------------------------------------  Delete ACs.  //
const delete_fail = (error, key) => {
    return {
        type: actionTypes.DECKS_DELETE_FAIL,
        payload: {
            error: error,
            key: key
        }
    };
};
const delete_success = (key) => {
    console.log(key);
    return {
        type: actionTypes.DECKS_DELETE_SUCC,
        payload: {
            key: key
        }
    };
};

//  Get  ----------------------------------------------------------------  Get ACs.  //
const getAll_fail = (error) => {
    return {
        type: actionTypes.DECKS_GET_FAIL,
        payload: error
    }
}
const getAll_init = () => {
    return {
        type: actionTypes.DECKS_GET_INIT
    }
}
const getAll_success = (data) => {
    return {
        type: actionTypes.DECKS_GET_SUCC,
        payload: data
    }
}

//  Post  --------------------------------------------------------------  Post ACs.  //
const post_fail = (error) => {
    return {
        type: actionTypes.DECKS_POST_FAIL,
        payload: error
    }
}
const post_success = (key, data) => {
    return {
        type: actionTypes.DECKS_POST_SUCC,
        payload: {
            data: data,
            key: key
        }
    }
}

//  Put  ----------------------------------------------------------------  Put ACs.  //
const put_fail = (error) => {
    return {
        type: actionTypes.DECKS_PUT_FAIL,
        payload: error
    };
};
const put_success = (key, data) => {
    return {
        type: actionTypes.DECKS_PUT_SUCC,
        payload: {
            data: data,
            key: key
        }
    };
};


//  ASYNC FUNCTIONS  ---------------------------------------------  ASYNC FUNCTIONS  //
//  Delete  ---------------------------------------------------------  Delete Async  //
export const deleteDeck_async = (token, key) => {
    console.log(key);
    return dispatch => {
        axios.delete('/decks/' + key + '.json?auth=' + token)
        .then(response => {
            
            dispatch(delete_success(key));
        })
        .catch(error => {
            dispatch(delete_fail(error));
        });
    };
};
//  Pass an array of key strings
export const deleteManyDecks_async = (token, keys) => {
    keys.forEach(key => {
        deleteDeck_async(token, key)
    });
}

//  Get  ----------------------------------------------------------------  Get Async //
export const getAllDecks_async = (token, user) => {
    return dispatch => {
        dispatch(getAll_init());
        axios.get('/decks.json?auth=' + token + '&orderBy="userId"&equalTo="' + user + '"')
        .then(response => {
            const models = {};
            Object.keys(response.data).map(key => {
                models[key] = {
                    ...response.data[key],
                    isDeleted: false,
                    isNew: false
                }
            });
            dispatch(getAll_success({
                data: models
            }));
        })
        .catch(error => {
            dispatch(getAll_fail(error));
        });
    };
};

//  Post  --------------------------------------------------------------  Post Async //
export const postDeck_async = (token, data) => {
    return dispatch => {
        axios.post('/decks.json?auth=' + token, data)
        .then(response => {
            dispatch(post_success(response.data.name, {
                ...data,
                isDeleted: false,
                isNew: true
            }));
        })
        .catch(error => {
            dispatch(post_fail(error));
        });
    };
};
//  Pass an object of deck objects
export const postManyDecks_async = (token, data) => {
    Object.keys(data).forEach(key => {
        postDeck_async(token, data[key]);
    });
};

//  Put  ----------------------------------------------------------------  Put Async //
export const putDeck_async = (token, key, data) => {
    return dispatch => {
        axios.put('/decks/' + key + '.json?auth=' + token, data)
        .then(response => {
            dispatch(put_success(response.data.name, data));
        })
        .catch(error => {
            dispatch(put_fail(error));
        });
    };
};
//  Pass an object of deck objects
export const putManyDecks_async = (token, data) => {
    Object.keys(data).forEach(key => {
        putDeck_async(token, key, data[key]);
    })
}