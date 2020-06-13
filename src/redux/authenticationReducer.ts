import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { userService } from '../services/users.service';
import { openSnackBar } from './snackBarReducer';
import { IUser } from '../globals/interfaces';
import { setUser } from './userReducer';

export interface IUsersSate {
    cart: string[]
}

let userToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

//reducers
export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggingIn: false,
        loggedIn: userToken ? true : false,
        userToken: userToken,
        registering: false
    },
    reducers: {
        loginRequest: (state) => {
            state.loggingIn = true
        },
        loginSuccess: (state, action) => {
            state.loggingIn = false;
            state.loggedIn = true;
            state.userToken = action.payload;
        },
        loginFailure: (state) => {
            state.loggingIn = false;
            state.loggedIn = false;
        },
        registerRequest: (state) => {
            state.registering = true;
        },
        registerEnd: (state) => {
            state.registering = false;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userToken = null;
        }
    }
});

//actions
export const { loginRequest, loginSuccess, loginFailure, registerRequest, registerEnd, logout } = authSlice.actions;

export const logoutRequest = () => async (dispatch: React.Dispatch<AnyAction>) => {
    localStorage.removeItem('user');
    dispatch(logout());
    dispatch(setUser({}))
    dispatch(openSnackBar({ message: 'Successfully sign out', status: 'success' }))
};

export const logUserIn = (userName: string, password: string, from?: string) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(loginRequest());

    try {
        const respData = await userService.login(userName, password);
        location.replace(from ? from : '/')
        dispatch(loginSuccess(respData));
        dispatch(setUser(respData.user))
        dispatch(openSnackBar({ message: `Hello ${userName}!`, status: 'info' }));
    } catch (error) {
        dispatch(loginFailure())
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const registerUser = (user: IUser) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(registerRequest());

    try {
        await userService.registerUser(user);
        location.replace('/')
        dispatch(openSnackBar({ message: `Successfully registered user ${user.userName}`, status: 'success' }));
        dispatch(registerEnd());
    } catch (error) {
        dispatch(registerEnd());
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectLogingIn = (state: IStoreState) => state.authState.loggingIn;
export const selectLoggedIn = (state: IStoreState) => state.authState.loggedIn;
export const selectUserToken = (state: IStoreState) => state.authState.userToken;

export default authSlice.reducer;