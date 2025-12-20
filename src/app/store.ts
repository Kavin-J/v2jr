// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import type { AuthState } from './features/auth/auth.type'
import { api, mockApi } from './services'

/* ----------------------------------
   localStorage helpers (ใช้เฉพาะ prod)
----------------------------------- */
function saveAuthToLocalStorage(auth: AuthState) {
    try {
        localStorage.setItem('auth', JSON.stringify(auth))
    } catch (e) {
        console.error(e)
    }
}

function loadAuthFromLocalStorage(): AuthState | undefined {
    try {
        const serialized = localStorage.getItem('auth')
        if (!serialized) return undefined
        return JSON.parse(serialized)
    } catch (e) {
        console.error(e)
        return undefined
    }
}

/* ----------------------------------
   1️⃣ setupStore (หัวใจของการ test)
----------------------------------- */
export const setupStore = (
    preloadedState?: Partial<RootState>,
    options?: {
        api?: typeof api
    }
) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    // 👈 inject api เข้า thunk
                    extraArgument: {
                        api: options?.api ?? mockApi,
                    },
                },
            }),
    })
}

/* ----------------------------------
   2️⃣ store สำหรับ production จริง
----------------------------------- */
const preloadedState = {
    auth: loadAuthFromLocalStorage(),
}

export const store = setupStore(preloadedState, {
    api: mockApi, // 👈 ใช้ mockApi แทน api
})

/* ----------------------------------
   3️⃣ subscribe เฉพาะ prod
----------------------------------- */
store.subscribe(() => {
    const state = store.getState()
    saveAuthToLocalStorage(state.auth)
})

/* ----------------------------------
   4️⃣ Types (สำคัญมาก)
----------------------------------- */
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
