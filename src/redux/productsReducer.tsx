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
        },
        addNewProductState: (state, action) => {
            state.products.push(action.payload);
        },
        updateProductState: (state, action) => {
            const newItem = action.payload;
            const oldItemIndex = state.products.findIndex((el) => el.id === newItem.id);

            if (oldItemIndex === -1) return;

            state.products[oldItemIndex] = newItem;
        },
        deleteProductState: (state, action) => {
            const oldItem = action.payload;
            const oldItemIndex = state.products.findIndex((el) => el.id === oldItem.id);

            if (oldItemIndex === -1) return;

            state.products.splice(oldItemIndex, 1);
        }
    }
});

//actions
export const { setProducts, addNewProductState, updateProductState, deleteProductState } = productsSlice.actions;

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
        const newProductData = await productsService.updateProduct(product);
        dispatch(updateProductState(newProductData));
        dispatch(openSnackBar({ message: `Successfully updated product ${product.name}!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteProduct = (product: IProduct) => async (dispatch: React.Dispatch<AnyAction>) => {
    try {
        const productData = await productsService.deleteProduct(product.id.toString());
        dispatch(deleteProductState(productData))
        dispatch(openSnackBar({ message: `Successfully deleted product!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectProducts = (state: IStoreState) => state.productsState.products;

export default productsSlice.reducer;