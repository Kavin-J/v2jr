import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, LanguageType } from "./auth.type";
import { ApiClient } from "../../services/apiClient";

export interface LoginPayload {
    email: string;
    password: string;
}

export const loginCredentials = createAsyncThunk<{ user: User; token: string, language: LanguageType, permission: string[] }, LoginPayload, { extra: { api: ApiClient }, rejectValue: string }>(
    'auth/loginCredentials',
    async (payload, { extra, rejectWithValue }) => {
        try {
            const response = await extra.api.auth.login(payload)
            if (!response.success || !response.data) {
                throw new Error(response.message);
            }
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An error occurred');
        }
    },
);