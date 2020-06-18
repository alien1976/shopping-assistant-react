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
        }
    }
});

//actions
export const { setShops } = shopsSlice.actions;

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
        await shopsService.updateShop(shop);
        getAllShops();
        dispatch(openSnackBar({ message: `Successfully updated shop ${shop.name}!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteShop = (shop: IShop) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        await shopsService.deleteShop(shop.id.toString());
        getAllShops();
        dispatch(openSnackBar({ message: `Successfully deleted shop!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectShops = (state: IStoreState) => state.shopsState.shops;

export default shopsSlice.reducer;