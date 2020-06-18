import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { openSnackBar } from './snackBarReducer';
import { IProduct } from '../globals/interfaces';
import { productsService } from '../services/products.service';

//reducers
export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        }
    }
});

//actions
export const { setProducts } = productsSlice.actions;

export const getAllProducts = () => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const productsData = await productsService.getAllProducts();
        dispatch(setProducts(productsData));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const updateProduct = (product: IProduct) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        await productsService.updateProduct(product);
        getAllProducts();
        dispatch(openSnackBar({ message: `Successfully updated product ${product.name}!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteProduct = (product: IProduct) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        await productsService.deleteProduct(product.id.toString());
        getAllProducts();
        dispatch(openSnackBar({ message: `Successfully deleted product!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectProducts = (state: IStoreState) => state.productsState.products;

export default productsSlice.reducer;