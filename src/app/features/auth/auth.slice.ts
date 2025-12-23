import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './auth.type';
import { AuthState } from './auth.type';
import { loginCredentials } from './auth.thunks';
import { LanguageType } from './auth.type';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
    error: null,
    loading: false,
    language: 'th',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User, token: string, language: LanguageType }>) => {
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.language = action.payload.language;
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
        setLanguage: (state, action: PayloadAction<LanguageType>) => {
            state.language = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCredentials.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginCredentials.fulfilled, (state, action: PayloadAction<{ user: User, token: string }>) => {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginCredentials.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || action.error.message || 'Login failed';
            })
    },
});

export const { login, logout, setError, setLoading, setLanguage } = authSlice.actions;

export default authSlice.reducer;
