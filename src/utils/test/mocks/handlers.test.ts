import { http, HttpResponse } from 'msw'
import { baseResponse } from '../../../../src/app/services/types';
import { MOCK_USERS } from '../../../app/features/auth/__mock__/user';
import { LoginPayload } from '../../../app/features/auth/auth.thunks';
import { handlers } from './handlers';
import axios from 'axios';

describe('handlers', async () => {
    it('should return a valid response', async () => {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
            email: MOCK_USERS[0].email,
            password: MOCK_USERS[0].password
        })
        expect(response.data).toEqual({
            success: true,
            message: 'Login successful',
            data: {
                token: MOCK_USERS[0].token
            },
            status: 200
        })
    })
    it('should return a invalid response', async () => {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
            email: MOCK_USERS[0].email,
            password: 'password'
        })
        expect(response.data).toEqual({
            success: false,
            message: 'Invalid credentials',
            status: 401
        })
    })
    it('should return a user info', async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/auth/user-info', {
            headers: {
                Authorization: 'Bearer ' + MOCK_USERS[0].token
            }
        })
        expect(response.data).toEqual({
            success: true,
            message: 'User info retrieved',
            data: {
                user: {
                    id: MOCK_USERS[0].id,
                    email: MOCK_USERS[0].email,
                    role: MOCK_USERS[0].role,
                    name: MOCK_USERS[0].name,
                    avatar: MOCK_USERS[0].avatar,
                    permissions: MOCK_USERS[0].permissions,
                    language: MOCK_USERS[0].language
                }
            },
            status: 200
        })
    })
    it('should return a user info', async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/auth/user-info', {
            headers: {
                Authorization: 'Bearer ' + "1234"
            }
        })
        expect(response.data).toEqual({
            success: false,
            message: 'Unauthorized',
            status: 401
        })
    })
    it('should return a users', async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/users', {
            headers: {
                Authorization: 'Bearer ' + MOCK_USERS[0].token
            }
        })
        expect(response.data).toEqual({
            success: true,
            message: 'Users retrieved',
            data: {
                users: MOCK_USERS.map((user) => ({
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    avatar: user.avatar,
                })),
                total: MOCK_USERS.length
            },
            status: 200
        })
    })
    it('should return a users', async () => {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/users', {
            headers: {
                Authorization: 'Bearer ' + "1234"
            }
        })
        expect(response.data).toEqual({
            success: false,
            message: 'Unauthorized',
            status: 401
        })
    })
})
