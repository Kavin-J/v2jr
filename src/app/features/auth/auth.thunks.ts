import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./auth.type";
import { ApiClient } from "../../services/apiClient";
export interface LoginPayload {
    email: string;
    password: string;
}

export const loginCredentials = createAsyncThunk<{ user: User; token: string }, LoginPayload, { extra: { api: ApiClient } }>(
    'auth/login',
    async (payload, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.auth.login(payload)
            if (!response.success) {
                return rejectWithValue(response.message);
            }
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An error occurred');
        }
    },
);