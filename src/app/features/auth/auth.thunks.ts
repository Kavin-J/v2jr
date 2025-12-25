import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient } from "../../services";
import { User } from "./auth.type";
import { AppDispatch, RootState } from "../../store";
import { logout } from "./auth.slice";
import { LanguageType } from "./auth.type";

export interface LoginPayload {
    email: string;
    password: string;
}

export const loginCredentials = createAsyncThunk<{ token: string | null; isAuthenticated: boolean; }, LoginPayload, { extra: { api: ApiClient }, rejectValue: string }>(
    'auth/loginCredentials',
    async (payload, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.auth.login(payload)
            if (!response.success || !response.data) {
                throw new Error(response.message);
            }
            return {
                token: response.data.token,
                isAuthenticated: true,
            };
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An error occurred');
        }
    },
);
export const getUserInfo = createAsyncThunk<{ user: User; permissions: string[]; language: LanguageType }, void, { extra: { api: ApiClient }; rejectValue: string; dispatch: AppDispatch; getState: () => RootState }>(
    'auth/getUserInfo',
    async (_, { extra, rejectWithValue, dispatch, getState }) => {
        const token = (getState() as RootState).auth.token;
        if (!token) {
            dispatch(logout());
            return rejectWithValue('Token not found');
        }
        try {
            const response = await extra.api.auth.getUserInfo(token)
            if (!response.success || !response.data) {
                dispatch(logout());
                return rejectWithValue(response.message);
            }
            return {
                user: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    role: response.data.user.role,
                    name: response.data.user.name,
                    avatar: response.data.user.avatar,
                },
                permissions: response.data.user.permissions,
                language: response.data.user.language,
            };
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An error occurred');
        }
    },
);