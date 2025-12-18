import { RootState } from "../../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectRole = (state: RootState) => state.auth.user?.role;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectError = (state: RootState) => state.auth.error;
export const selectLoading = (state: RootState) => state.auth.loading;
