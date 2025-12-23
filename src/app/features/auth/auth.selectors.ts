import { RootState } from "../../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthRole = (state: RootState) => state.auth.user?.role;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthLanguage = (state: RootState) => state.auth.language;
