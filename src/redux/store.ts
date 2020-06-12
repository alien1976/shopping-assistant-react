import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './cartReducer';
import authenticationReducer from './authenticationReducer';
import snackBarReducer from './snackBarReducer';

const rootReducer = combineReducers({
    appState: appReducer,
    authState: authenticationReducer,
    snackBarState: snackBarReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export type IStoreState = ReturnType<typeof rootReducer>;

export default store;