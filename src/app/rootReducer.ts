import authReducer from './features/auth/auth.slice';
import { api } from './services';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
});

export default rootReducer;
