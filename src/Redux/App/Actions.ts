// src/redux/App/Actions.ts

import { FETCH_USERS, ADD_USER, EDIT_USER, DELETE_USER, DELETE_ALL_USERS, User } from './ActionTypes';

export const fetchUsers = (users: User[]) => ({
    type: FETCH_USERS,
    payload: users,
});

export const addUser = (user: User) => ({
    type: ADD_USER,
    payload: user,
});

export const editUser = (user: User) => ({
    type: EDIT_USER,
    payload: user,
});

export const deleteUser = (userId: number) => ({
    type: DELETE_USER,
    payload: userId,
});

export const deleteAllUsers = () => ({
    type: DELETE_ALL_USERS,
});
