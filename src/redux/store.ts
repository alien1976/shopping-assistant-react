import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './cartReducer';

const rootReducer = combineReducers({
    appState: appReducer,
});

const store = configureStore({
    reducer: rootReducer
})

export type IStoreState = ReturnType<typeof rootReducer>;

export default store;