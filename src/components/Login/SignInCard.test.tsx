
import { createMemoryRouter, RouterProvider } from 'react-router';
import { getUser } from '../../app/features/auth/__mock__/user';
import { renderWithProviders } from '../../utils/test-utils';
import SignInCard from './SignInCard';
import { fireEvent, screen } from '@testing-library/react';
import { routerConfig } from '../../App';

describe('SignInCard', () => {
  it('should render correctly', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/login']
    });
    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        }
      }
    });
    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument();
  });

  it('should render error message when email is invalid', () => {
    renderWithProviders(<SignInCard />, {
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        }
      }
    });

    const emailInput = screen.getByLabelText('อีเมล');
    const passwordInput = screen.getByLabelText('รหัสผ่าน');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('กรุณากรอกอีเมลให้ถูกต้อง')).toBeInTheDocument();
    expect(screen.getByText('รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร')).toBeInTheDocument();
  });

  it('should render error message when password is too short', () => {
    renderWithProviders(<SignInCard />, {
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        }
      }
    });

    const emailInput = screen.getByLabelText('อีเมล');
    const passwordInput = screen.getByLabelText('รหัสผ่าน');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 6 ตัวอักษร')).toBeInTheDocument();
  });

  it('should render dashboard when login success', async () => {
    const userAdmin = getUser('admin');
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/login']
    });
    if (userAdmin) {
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: {
          auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
            loading: false,
          }
        }
      });

      const emailInput = screen.getByLabelText('อีเมล');
      const passwordInput = screen.getByLabelText('รหัสผ่าน');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.change(emailInput, { target: { value: userAdmin.email } });
      fireEvent.change(passwordInput, { target: { value: userAdmin.password } });
      fireEvent.click(submitButton);
      expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    }
  });



}); 