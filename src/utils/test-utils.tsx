import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import PermissionProvider from '../hooks/usePermission/PermissionProvider';
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
import { MemoryRouter } from 'react-router';
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
export type PreloadedState = Partial<RootState>
export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState
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
                <PermissionProvider>
                    <NotificationsProvider>
                        <DialogsProvider>
                            {children}
                        </DialogsProvider>
                    </NotificationsProvider>
                </PermissionProvider>
            </AppTheme>

        </Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}
export function renderWithProviderMemoryRouter(
    initialEntries = ['/'],
    stateOverrides: Partial<RootState> = {},
    ui: React.ReactNode,

) {
    return renderWithProviders(
        <MemoryRouter initialEntries={initialEntries}>
            {ui}
        </MemoryRouter>,
        { preloadedState: { ...stateOverrides } }
    );
}

