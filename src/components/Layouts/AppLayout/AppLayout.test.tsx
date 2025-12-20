import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, it, expect } from 'vitest';
import { User } from '../../../app/features/auth/auth.type';
import { routerConfig } from '../../../App';

describe('AppLayout', () => {
  it('should redirect to login when unauthenticated', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/']
    });

    renderWithProviders(
      <RouterProvider router={router} />,
      {
        preloadedState: {
          auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
            loading: false,
          }
        }
      }
    );

    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument();
  });

  it('should render layout when authenticated', () => {
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'staff',
      avatar: 'avatar-url'
    };

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/']
    });

    renderWithProviders(
      <RouterProvider router={router} />,
      {
        preloadedState: {
          auth: {
            user: mockUser,
            token: 'valid-token',
            isAuthenticated: true,
            error: null,
            loading: false,
          }
        }
      }
    );

    // Check for Sidebar elements - duplicate elements due to responsive drawers
    const mainItems = screen.getAllByText('Main items');
    expect(mainItems.length).toBeGreaterThan(0);
    expect(mainItems[0]).toBeInTheDocument();

    const employeesItems = screen.getAllByText('Employees');
    expect(employeesItems.length).toBeGreaterThan(0);
    expect(employeesItems[0]).toBeInTheDocument();
  });

  it('should handle logout', async () => {
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'staff',
      avatar: 'avatar-url'
    };

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/']
    });

    const { store } = renderWithProviders(
      <RouterProvider router={router} />,
      {
        preloadedState: {
          auth: {
            user: mockUser,
            token: 'valid-token',
            isAuthenticated: true,
            error: null,
            loading: false,
          }
        }
      }
    );

    // Verify initially authenticated
    expect(store.getState().auth.isAuthenticated).toBe(true);

    const logoutButtons = screen.getAllByTestId('logout-button');
    expect(logoutButtons.length).toBeGreaterThan(0);
    fireEvent.click(logoutButtons[0]);

    // Verify state changed to unauthenticated
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(store.getState().auth.user).toBeNull();
    expect(store.getState().auth.token).toBeNull();
  });
});
