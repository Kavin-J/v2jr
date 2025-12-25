import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './auth.type';
import { AuthState } from './auth.type';
import { getUserInfo, loginCredentials } from './auth.thunks';
import { LanguageType } from './auth.type';

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
    permissions: [],
    error: null,
    loading: false,
    language: 'th',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User, token: string, language: LanguageType, permissions: string[] }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.permissions = action.payload.permissions;
            state.language = action.payload.language;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.permissions = [];
            state.error = null;
            state.loading = false;
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
        setPermission: (state, action: PayloadAction<string[]>) => {
            state.permissions = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginCredentials.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginCredentials.fulfilled, (state, action: PayloadAction<{ token: string | null; isAuthenticated: boolean; }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = action.payload.isAuthenticated;
                state.error = null;
            })
            .addCase(loginCredentials.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || action.error.message || 'Login failed';
            })
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<{ user: User; permissions: string[]; language: LanguageType }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.permissions = action.payload.permissions;
                state.language = action.payload.language;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || action.error.message || 'Fetch failed';
            })
    },
});

export const { login, logout, setError, setLoading, setLanguage, setPermission, setToken } = authSlice.actions;

export default authSlice.reducer;
