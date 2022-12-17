import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistedReducer from '../reducers';
import {  persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import logger from "redux-logger";
//save state to localstorage and load data from localstorage
// function saveToLocalStorage(state) {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         console.log(e);
//     }

// }

// function loadFromLocalStorage() {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState == null) return undefined;
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.log(e);
//         return undefined;
//     }
// }
// const persistedState = loadFromLocalStorage();

const configureStores = () => {
    return configureStore(
        {
            reducer: persistedReducer,
            middleware: () => getDefaultMiddleware({serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
              }}).concat(logger)
        });
}

export const store = configureStores();
//store.subscribe(() => saveToLocalStorage(store.getState()));

export const persistor = persistStore(store);