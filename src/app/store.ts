// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import type { LanguageType } from './features/auth/auth.type'
import { api, apiClient, mockApiClient } from './services'

/* ----------------------------------
   localStorage helpers (ใช้เฉพาะ prod)
----------------------------------- */
function saveAuthToLocalStorage(token: string) {
    try {
        localStorage.setItem('token', token)
    } catch (e) {
        console.error(e)
    }
}

function saveAuthLangToLocalStorage(language: LanguageType) {
    try {
        localStorage.setItem('lang', language)
    } catch (e) {
        console.error(e)
    }
}

function loadAuthTokenFromLocalStorage(): string | null {
    try {
        const serialized = localStorage.getItem('token')
        if (!serialized) return null
        return serialized
    } catch (e) {
        console.error(e)
        return null
    }
}

function loadAuthLangFromLocalStorage(): LanguageType {
    try {
        const serialized = localStorage.getItem('lang')
        if (!serialized) return 'th'
        const lang = serialized
        return (lang === 'th' || lang === 'en') ? lang : 'th'
    } catch (e) {
        console.error(e)
        return 'th'
    }
}
/* ----------------------------------
   1️⃣ setupStore (หัวใจของการ test)
----------------------------------- */
export const setupStore = (
    preloadedState?: Partial<RootState>,
    options?: {
        api?: typeof apiClient
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
                        api: options?.api ?? mockApiClient,
                    },
                },
            }).concat(api.middleware)
    })
}

/* ----------------------------------
   2️⃣ store สำหรับ production จริง
----------------------------------- */
import { initialState as authInitialState } from './features/auth/auth.slice'


const preloadedState = {
    auth: {
        ...authInitialState,
        token: loadAuthTokenFromLocalStorage(),
        language: loadAuthLangFromLocalStorage(),
    }
}

export const store = setupStore(preloadedState, {
    api: mockApiClient, // 👈 ใช้ mockApi แทน api
})

/* ----------------------------------
   3️⃣ subscribe เฉพาะ prod
----------------------------------- */
store.subscribe(() => {
    const state = store.getState()
    if (state.auth.token) {
        saveAuthToLocalStorage(state.auth.token)
    } else {
        localStorage.removeItem('token')
    }
    if (state.auth.language) {
        saveAuthLangToLocalStorage(state.auth.language)
    }
})

/* ----------------------------------
   4️⃣ Types (สำคัญมาก)
----------------------------------- */
export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
