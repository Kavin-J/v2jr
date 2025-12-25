import { screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from './router';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../utils/test-utils';
import { RoleType, LanguageType } from '../app/features/auth/auth.type';
import { RootState } from '../app/store';
import { AuthState } from '../app/features/auth/auth.type';

describe('Router Configuration', () => {
  // Helper to render router using test-utils with preloaded state
  const renderRouter = (initialEntries = ['/'], authStateOverrides: Partial<AuthState> = {}) => {
    const router = createMemoryRouter(routes, {
      initialEntries: initialEntries,
    });

    const preloadedState: RootState = {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        loading: false,
        language: 'en',
        permission: [],
        ...authStateOverrides
      }
    };

    return renderWithProviders(
      <RouterProvider router={router} />,
      { preloadedState }
    );
  };


  it('renders Login Page at /login', () => {
    renderRouter(['/login']);
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
  });
  it('renders Login Page at /login with th language', () => {
    renderRouter(['/login'], { language: 'th' });
    expect(screen.getByRole('heading', { name: /เข้าสู่ระบบ/i })).toBeInTheDocument();
  });

  it('redirects unauthenticated user from / (Dashboard) to /login', async () => {
    renderRouter(['/'], { isAuthenticated: false });

    // AppLayout checks auth and redirects to /login
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    });
  });

  it('renders Dashboard for authenticated user at /', () => {
    renderRouter(['/'], {
      isAuthenticated: true,
      user: { id: '1', name: 'User Test', email: 'user@test.com', role: 'staff' as RoleType },
      language: 'en',
      token: 'test-token'
    });

    // Regex handles possible missing space in the component text "Dashboard(All..."
    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('renders Admin Page for admin user', () => {
    renderRouter(['/admin'], {
      isAuthenticated: true,
      user: { id: '1', name: 'Admin', email: 'admin@test.com', role: 'admin' as RoleType },
      language: 'en',
      token: 'test-token'
    });

    expect(screen.getByRole('heading', { name: /Admin/i })).toBeInTheDocument();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

});
