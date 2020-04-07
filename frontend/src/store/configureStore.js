
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {applyMiddleware, combineReducers, compose, createStore,} from 'redux';
import thunkMiddleware from 'redux-thunk';


import albumsReducer from "./reducers/albumsReducer";
import reducerTracks from "./reducers/reducerTracks"
import usersReducer from "./reducers/usersReducer";
import trackHistory from "./reducers/trackHistoryReducer";
import reducerArtists from "./reducers/reducerArtists";

import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    artists: reducerArtists,
    albums: albumsReducer,
    tracks: reducerTracks,
    users: usersReducer,
    trackHistory: trackHistory
});
const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();


const store = createStore(rootReducer, persistedState, enhancers);
export default store;



