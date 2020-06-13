import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { openSnackBar } from './snackBarReducer';
import { IShopBrand } from '../globals/interfaces';
import { shopBrandsService } from '../services/shopBrands.service';

//reducers
export const userSlice = createSlice({
    name: 'shopBrands',
    initialState: {
        shopBrands: [],
    },
    reducers: {
        setShopBrands: (state, action) => {
            state.shopBrands = action.payload
        }
    }
});

//actions
export const { setShopBrands } = userSlice.actions;

export const getAllShopBrands = () => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const shopBrandsData = await shopBrandsService.getAllShopBrands();
        dispatch(setShopBrands(shopBrandsData));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const updateShopBrand = (shopBrand: IShopBrand) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        await shopBrandsService.updateShopBrand(shopBrand);
        getAllShopBrands();
        dispatch(openSnackBar({ message: `Successfully updated user shop brand ${shopBrand.name}!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteShopBrand = (shopBrand: IShopBrand) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        await shopBrandsService.deleteShopBrand(shopBrand.id.toString());
        getAllShopBrands();
        dispatch(openSnackBar({ message: `Successfully deleted user account!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectShopBrands = (state: IStoreState) => state.shopBrandsState.shopBrands;

export default userSlice.reducer;