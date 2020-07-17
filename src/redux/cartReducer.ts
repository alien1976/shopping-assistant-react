import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from './store';

export interface IAppState {
    cart: string[]
}

//reducers
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        cart: (localStorage.cart && localStorage.cart.split(',')) || [],
        fastestPath: []
    },
    reducers: {
        addProductToCart: (state, action) => {
            state.cart.push(action.payload)
            localStorage.setItem('cart', state.cart);
        },
        removeProductFromCart: (state, action) => {
            const productIndex = state.cart.findIndex((el: string) => el === action.payload);
            state.cart.splice(productIndex, 1);
            localStorage.setItem('cart', state.cart);
        },
        setFastestPath: (state, action) => {
            state.fastestPath = action.payload
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem('cart', state.cart)
        }
    }
});

//actions
export const { addProductToCart, removeProductFromCart, setFastestPath, clearCart } = appSlice.actions;

//selectors
export const selectCart = (state: IStoreState) => state.appState.cart;
export const selectCartLength = (state: IStoreState) => state.appState.cart.length;
export const selectIsProductSelected = (productId: string) => {
    return (state: IStoreState) => {
        return state.appState.cart.indexOf(productId.toString()) !== -1;
    }
}
export const selectFastestPath = (state: IStoreState) => state.appState.fastestPath;

export default appSlice.reducer;