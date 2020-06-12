import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from './store';

//reducers
export const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState: {
        opened: false,
        message: '',
        status: 'success'
    },
    reducers: {
        openSnackBar: (state, action) => {
            state.opened = true;
            state.message = action.payload.message;
            state.status = action.payload.status;
        },
        closeSnackBar: (state) => {
            state.opened = false;
        },
    }
});


//actions
export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;

//selectors
export const selectSnackState = (state: IStoreState) => state.snackBarState.opened;
export const selectSnackStatus = (state: IStoreState) => state.snackBarState.status;
export const selectSnackMessage = (state: IStoreState) => state.snackBarState.message;

export default snackBarSlice.reducer;