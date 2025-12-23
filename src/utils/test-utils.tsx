import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from '../app/store'
import { setupStore } from '../app/store'
import CssBaseline from '@mui/material/CssBaseline';
import NotificationsProvider from '../hooks/useNotifications/NotificationsProvider';
import DialogsProvider from '../hooks/useDialogs/DialogsProvider';
import AppTheme from '../theme/AppTheme';
import {
    dataGridCustomizations,
    datePickersCustomizations,
    sidebarCustomizations,
    formInputCustomizations,
} from '../theme/customizations';
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore

}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const themeComponents = {
        ...dataGridCustomizations,
        ...datePickersCustomizations,
        ...sidebarCustomizations,
        ...formInputCustomizations,
    };
    const Wrapper = ({ children }: PropsWithChildren) => (

        <Provider store={store}>
            <AppTheme themeComponents={themeComponents}>
                <CssBaseline enableColorScheme />
                <NotificationsProvider>
                    <DialogsProvider>
                        {children}
                    </DialogsProvider>
                </NotificationsProvider>
            </AppTheme>

        </Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}