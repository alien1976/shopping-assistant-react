import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { openSnackBar } from './snackBarReducer';
import { IShop } from '../globals/interfaces';
import { shopsService } from '../services/shops.service';

//reducers
export const shopsSlice = createSlice({
    name: 'shops',
    initialState: {
        shops: [],
    },
    reducers: {
        setShops: (state, action) => {
            state.shops = action.payload
        },
        updateShopState: (state, action) => {
            const newItem = action.payload;
            const oldItemIndex = state.shops.findIndex((el) => el.id === newItem.id);

            if (oldItemIndex === -1) return;

            state.shops[oldItemIndex] = newItem;
        },
        deleteShopState: (state, action) => {
            const oldItem = action.payload;
            const oldItemIndex = state.shops.findIndex((el) => el.id === oldItem.id);

            if (oldItemIndex === -1) return;

            state.shops.splice(oldItemIndex, 1);
        }
    }
});

//actions
export const { setShops, updateShopState, deleteShopState } = shopsSlice.actions;

export const getAllShops = () => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const shopsData = await shopsService.getAllShops();
        dispatch(setShops(shopsData));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const updateShop = (shop: IShop) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const shopData = await shopsService.updateShop(shop);
        dispatch(updateShopState(shopData))
        dispatch(openSnackBar({ message: `Successfully updated shop ${shop.name}!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteShop = (shop: IShop) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const shopData = await shopsService.deleteShop(shop.id.toString());
        dispatch(deleteShopState(shopData))
        dispatch(openSnackBar({ message: `Successfully deleted shop!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectShops = (state: IStoreState) => state.shopsState.shops;

export default shopsSlice.reducer;