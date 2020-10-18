import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './cartReducer';
import authenticationReducer from './authenticationReducer';
import snackBarReducer from './snackBarReducer';
import userReducer from './userReducer';
import shopBrandsReducer from './shopBrandsReducer';
import shopsReducer from './shopsReducer';
import productsReducer from './productsReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
    appState: appReducer,
    authState: authenticationReducer,
    snackBarState: snackBarReducer,
    userState: userReducer,
    shopBrandsState: shopBrandsReducer,
    shopsState: shopsReducer,
    productsState: productsReducer,
    mapState: mapReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export type IStoreState = ReturnType<typeof rootReducer>;

export default store;