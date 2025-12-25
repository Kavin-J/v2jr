
import { renderWithProviders } from '../utils/test-utils';
import Dashboard from './Dashboard';
import { PreloadedState } from '../utils/test-utils';
import { RoleType } from '../app/features/auth/auth.type';

describe('Dashboard', () => {
    const preloadedState: PreloadedState = {
        auth: {
            user: { id: '1', role: 'admin' as RoleType, name: 'Admin', email: 'admin@test.com', avatar: 'https://via.placeholder.com/150', },
            permissions: ['user.read'],
            isAuthenticated: true,
            language: 'en',
            token: 'test-token',
            error: null,
            loading: false
        }
    };

    it('should render dashboard', () => {
        const { getByText } = renderWithProviders(<Dashboard />, { preloadedState });
        expect(getByText(/Dashboard/i)).toBeInTheDocument();
    });



});