import authReducer from './features/auth/auth.slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
