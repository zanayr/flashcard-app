import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import './index.css';

import App from './App';
import authReducer from './store/reducers/auth';
import collectionsReducer from './store/reducers/collections';
import deckReducer from './store/reducers/deck';
import modalReducer from './store/reducers/modal';

import * as serviceWorker from './serviceWorker';

/* Log all redux state changes --
const logger = store => {
    return next => {
        return action => {
            console.log('dispatch logger action:', action);
            const result = next(action);
            console.log('dispatch logger next state:', store.getState());
            return result;
        }
    }
}
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: authReducer,
    collections: collectionsReducer,
    deck: deckReducer,
    modal: modalReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(/*logger, */thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();