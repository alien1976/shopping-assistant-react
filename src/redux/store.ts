import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './cartReducer';
import authenticationReducer from './authenticationReducer';
import snackBarReducer from './snackBarReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    appState: appReducer,
    authState: authenticationReducer,
    snackBarState: snackBarReducer,
    userState: userReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export type IStoreState = ReturnType<typeof rootReducer>;

export default store;