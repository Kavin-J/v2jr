import { api } from './api'

import { User } from '../features/auth/auth.type'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            transformResponse: (response: User[]) => response,
            transformErrorResponse: (response) => response.data,
        }),
    }),
})

export const { useGetUsersQuery } = userApi