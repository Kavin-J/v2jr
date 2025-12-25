import { http, HttpResponse } from 'msw'
import { baseResponse } from '../../../../src/app/services/types';
import { MOCK_USERS, mockLogin } from '../../../app/features/auth/__mock__/user';
import { LoginPayload } from '../../../app/features/auth/auth.thunks';
import { LanguageType, User } from '../../../app/features/auth/auth.type';

export const handlers = [
    http.post(import.meta.env.VITE_API_BASE_URL + '/auth/login', async ({ request }) => {
        const body = await request.json() as LoginPayload;
        const user = MOCK_USERS.find((user) => user.email === body.email);
        if (user && user.password === body.password) {
            return HttpResponse.json<baseResponse<{ token: string }>>({
                success: true,
                message: 'Login successful',
                data: {
                    token: user.token
                },
                status: 200
            })
        }

        return HttpResponse.json<baseResponse<{ token: string }>>({
            success: false,
            message: 'Invalid credentials',
            status: 401
        })
    }),

    http.get(import.meta.env.VITE_API_BASE_URL + '/auth/user-info', ({ request }) => {
        const token = request.headers.get('Authorization')?.split('Bearer ')[1];
        const user = MOCK_USERS.find((user) => user.token === token);
        if (!user) {
            return HttpResponse.json<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>>({
                success: false,
                message: 'User not found',
                status: 404
            })
        }
        return HttpResponse.json<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>>({
            success: true,
            message: 'User info retrieved',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    avatar: user.avatar,
                    permissions: user.permissions,
                    language: user.language
                }
            },
            status: 200
        })
    }),
]
