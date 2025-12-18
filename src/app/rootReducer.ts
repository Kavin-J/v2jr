import authReducer from './features/auth/auth.slice';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
