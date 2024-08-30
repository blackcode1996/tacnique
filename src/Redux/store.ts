import { createStore } from 'redux';
import { userReducer } from './App/Reducer';

const store = createStore(userReducer);

export default store;
