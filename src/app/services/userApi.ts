import { api } from './api'

import { User } from '../features/auth/auth.type'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<{ users: User[], total: number }, void>({
            query: () => '/users',
            transformResponse: (response: any) => response.data,
            transformErrorResponse: (response: any) => response.data,
        }),
    }),
})

export const { useGetUsersQuery } = userApi