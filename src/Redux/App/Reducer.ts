import { FETCH_USERS, ADD_USER, EDIT_USER, DELETE_USER, DELETE_ALL_USERS, User } from './ActionTypes';

interface State {
    users: User[];
}

const initialState: State = {
    users: [],
};


type UserAction =
  | { type: typeof FETCH_USERS; payload: User[] }
  | { type: typeof ADD_USER; payload: User }
  | { type: typeof EDIT_USER; payload: User }
  | { type: typeof DELETE_USER; payload: string | number }
  | { type: typeof DELETE_ALL_USERS };

export const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload };
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        case DELETE_ALL_USERS:
            return { ...state, users: [] };
        default:
            return state;
    }
};
