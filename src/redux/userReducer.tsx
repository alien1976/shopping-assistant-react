import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { userService } from '../services/users.service';
import { openSnackBar } from './snackBarReducer';
import { IUser } from '../globals/interfaces';

//reducers
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        updatingUser: false,
        gettingUserData: false,
        user: {} as IUser
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUpdatingUser: (state, action) => {
            state.updatingUser = action.payload === undefined ? false : action.payload;
        },
        setGettingUserData: (state, action) => {
            state.gettingUserData = action.payload === undefined ? false : action.payload;
        }
    }
});

//actions
export const { setUser, setUpdatingUser, setGettingUserData } = userSlice.actions;

export const getUserData = (userId: string) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(setGettingUserData(true));
    try {
        const userData = await userService.getUserById(userId);
        dispatch(setGettingUserData(false));
        dispatch(setUser(userData));
    } catch (error) {
        dispatch(setGettingUserData(false));
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const updateUserData = (user: IUser) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(setUpdatingUser(true));

    try {
        await userService.updateUser(user);
        dispatch(setUpdatingUser(false));
        dispatch(setUser(user))
        dispatch(openSnackBar({ message: `Successfully updated user data!`, status: 'success' }));
    } catch (error) {
        dispatch(setUpdatingUser(false));
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectUser = (state: IStoreState) => state.userState.user;
export const selectUpdatingUser = (state: IStoreState) => state.userState.updatingUser;

export default userSlice.reducer;