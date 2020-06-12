// import * as React from 'react';
import { authHeader } from "../utils/utils";
import { IUser } from '../globals/interfaces';
import { SA_API_BASE } from "../globals/constants";

const login = async (userName: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    const response = await fetch(`${SA_API_BASE}/auth/login`, requestOptions);
    const user = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

const logout = () => {
    localStorage.removeItem('user');
}

const getAllUsers = async () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users`, requestOptions);
    return await handleResponse(response);
}

const getUserById = async (id: string) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users/${id}`, requestOptions)
    return await handleResponse(response);
}

const registerUser = async (user: IUser) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = fetch(`${SA_API_BASE}/auth/register`, requestOptions)
    return await handleResponse(response);
}

const updateUser = async (user: IUser) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = fetch(`${SA_API_BASE}/users/${user.id}`, requestOptions)
    return await handleResponse(response);
}

const deleteUser = async (userId: string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users/${userId}`, requestOptions)
    return await handleResponse(response);
}

const handleResponse = async (response: any) => {
    const res = await response;
    const text = await res.text()

    const data = text && JSON.parse(text);
    if (!res.ok) {
        if (res.status === 401) {
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}

export const userService = {
    login: login,
    logout: logout,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    registerUser: registerUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};
