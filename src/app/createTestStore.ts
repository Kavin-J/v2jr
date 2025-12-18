import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";

export const createTestStore = <S, A>(reducer: ReducersMapObject<S> | Reducer<S>, api: A) => {
    return configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: { api },
            },
        })
    });
};  