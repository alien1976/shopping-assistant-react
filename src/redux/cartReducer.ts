import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { IProduct } from '../globals/interfaces';

export interface IAppState {
    cart: string[]
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        cart: (localStorage.cart && localStorage.cart.split(',')) || [],
        productsList: []
    },
    reducers: {
        addProductToCart: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.cart.push(action.payload)
            localStorage.setItem('cart', state.cart);
        },
        removeProductFromCart: (state, action) => {
            const productIndex = state.cart.findIndex((el: string) => el === action.payload);
            state.cart.splice(productIndex, 1);
            localStorage.setItem('cart', state.cart);
        },
        initProductList: (state, action) => {
            state.productsList = action.payload.map((el: IProduct) => { return { ...el, bought: false } })
        },
        toggleProductState: (state, action) => {
            state.productsList[action.payload.index].bought = action.payload.value;

            if (action.payload.value === false) {
                state.cart.splice(action.payload.index, 1);
                localStorage.setItem('cart', state.cart);
            } else {
                state.cart.push(state.productsList[action.payload.index].id)
                localStorage.setItem('cart', state.cart);
            }
        }
    },
});

export const { addProductToCart, removeProductFromCart, initProductList, toggleProductState } = appSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number) => (dispatch: React.Dispatch<AnyAction>) => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCart = (state: IStoreState) => state.appState.cart;
export const selectCartLength = (state: IStoreState) => state.appState.cart.length;
export const selectIsProductSelected = (productId: string) => {
    return (state: IStoreState) => {
        return state.appState.cart.indexOf(productId.toString()) !== -1;
    }
}
export const selectAvailableProductsList = (state: IStoreState) => state.appState.productsList.filter((el) => !el.bought);
export const selectBoughtProductsList = (state: IStoreState) => state.appState.productsList.filter((el) => el.bought);

export default appSlice.reducer;