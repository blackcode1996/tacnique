export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_ALL_USERS = 'DELETE_ALL_USERS';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
}
