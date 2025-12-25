import { configureStore, Reducer, ReducersMapObject, Store, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export const createTestStore = <S, A>(reducer: ReducersMapObject<S> | Reducer<S>, api: A, apiOverride?: Partial<A>): Store<S, UnknownAction> & { dispatch: ThunkDispatch<S, { api: A }, UnknownAction> } => {
    const apiOverrided = apiOverride || {};
    const apix = { ...api, ...apiOverrided };
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: { api: apix },
            },
        })
    }) as Store<S, UnknownAction> & { dispatch: ThunkDispatch<S, { api: A }, UnknownAction> };
};  