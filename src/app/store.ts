import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { AuthState } from './features/auth/auth.type';
import { api } from './services/api';
function saveAuthToLocalStorage(auth: AuthState) {
    try {
        const serializedState = JSON.stringify(auth);
        localStorage.setItem('auth', serializedState);
    } catch (e) {
        console.log(e);
    }

}
function loadAuthFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('auth');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const preloadedState = { auth: loadAuthFromLocalStorage() };

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: { api },
        },
    }),
});
store.subscribe(() => {
    const state = store.getState();
    saveAuthToLocalStorage(state.auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


