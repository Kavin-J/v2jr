
import AppSidebarProfile from "./AppSidebarProfile";
import { renderWithProviders } from "../../../utils/test-utils";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppSidebarContext from "../../../context/AppSidebarContext";
import { AuthState } from "../../../app/features/auth/auth.type";
import { RootState } from "../../../app/store";
import { AppSidebarContextType } from "../../../context/AppSidebarContext";

describe('AppSidebarProfile', () => {
    const renderRouterWithAuth = (initialEntries = ['/'], authStateOverrides: Partial<AuthState> = {}, ui: React.ReactElement, valueOverrides: Partial<AppSidebarContextType> = {}) => {
        const preloadedState: RootState = {
            auth: {
                user: null,
                token: null,
                isAuthenticated: true,
                error: null,
                loading: false,
                language: 'en',
                ...authStateOverrides
            }
        };
        const value = {
            onPageItemClick: () => { },
            mini: false,
            fullyExpanded: true,
            fullyCollapsed: false,
            hasDrawerTransitions: true,
            ...valueOverrides
        };

        return renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <AppSidebarContext.Provider value={value}>

                    {ui}
                </AppSidebarContext.Provider>
            </MemoryRouter>,
            { preloadedState }
        );
    };

    it('renders AppSidebarProfile with auth expanded', () => {
        renderRouterWithAuth(
            ['/'],
            {
                user: {
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/150',
                    role: 'admin',
                    email: 'john.doe@example.com',
                    id: '1',
                },
                isAuthenticated: true,
                loading: false,
                error: null,
                token: 'token',
                language: 'th',
            },

            <AppSidebarProfile mini={false} />
        );

        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        expect(screen.getByText(/admin/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /John Doe/ })).toBeInTheDocument();

    });
    it('renders AppSidebarProfile with auth collapsed', () => {
        renderRouterWithAuth(
            ['/'],
            {
                user: {
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/150',
                    role: 'admin',
                    email: 'john.doe@example.com',
                    id: '1',
                },
                isAuthenticated: true,
                loading: false,
                error: null,
                token: 'token',
                language: 'th',
            },

            <AppSidebarProfile mini={true} />
        );

        expect(screen.getByRole('button', { name: /John Doe/ })).toBeInTheDocument();

    });
    it('renders AppSidebarProfile with auth mini', () => {
        renderRouterWithAuth(
            ['/'],
            {
                user: {
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/150',
                    role: 'admin',
                    email: 'john.doe@example.com',
                    id: '1',
                },
                isAuthenticated: true,
                loading: false,
                error: null,
                token: 'token',
                language: 'th',
            },

            <AppSidebarProfile mini={true} />
        );

        expect(screen.getByRole('button', { name: /John Doe/ })).toBeInTheDocument();

    });
    it('renders AppSidebarProfile with auth mini expanded', () => {
        renderRouterWithAuth(
            ['/'],
            {
                user: {
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/150',
                    role: 'admin',
                    email: 'john.doe@example.com',
                    id: '1',
                },
                isAuthenticated: true,
                loading: false,
                error: null,
                token: 'token',
                language: 'th',
            },

            <AppSidebarProfile mini={true} />
        );

        expect(screen.getByRole('button', { name: /John Doe/ })).toBeInTheDocument();

    });

});