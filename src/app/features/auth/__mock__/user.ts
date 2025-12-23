import { LoginPayload } from "../auth.thunks";
import { RoleType, LanguageType, User } from "../auth.type";
import { baseResponse } from "../../../services/types";

export interface UserMock extends User {
    password: string;
    token: string;
    language: LanguageType;
    permission: string[];
}
export const MOCK_USERS: UserMock[] = [
    {
        id: '1',
        name: 'Test Admin',
        email: 'test_admin@example.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'admin_test_token123',
        language: 'th',
        permission: ['*']
    },
    {
        id: '2',
        name: 'Test Staff',
        email: 'test_staff@example.com',
        role: 'staff',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'staff_test_token123',
        language: 'th',
        permission: ['*']
    },
    {
        id: '3',
        name: 'Test Supervisor',
        email: 'test_supervisor@example.com',
        role: 'supervisor',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'supervisor_test_token123',
        language: 'th',
        permission: ['*']
    },
    {
        id: '4',
        name: 'Test Staff2',
        email: 'test_staff2@example.com',
        role: 'staff',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'staff_test_token123',
        language: 'th',
        permission: ['*']
    },
    {
        id: '5',
        name: 'supapohn jp',
        email: 'wiriyamu98@gmail.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'admin_test_token123',
        language: 'th',
        permission: ['*']
    }
]
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (payload: LoginPayload): Promise<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>> => {
    const user = MOCK_USERS.find((user) => user.email === payload.email);
    await delay(1000);
    if (!user) {
        return Promise.resolve<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>>({
            success: false,
            message: 'ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่พบผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
            status: 404,
        });
    }
    if (user.password !== payload.password) {
        return Promise.resolve<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>>({
            success: false,
            message: 'ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่พบผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
            status: 401,
        });
    }
    return Promise.resolve<baseResponse<{ user: User; token: string; language: LanguageType; permission: string[]; }>>({
        success: true,
        data: {
            user,
            token: user.token,
            language: user.language,
            permission: user.permission,
        },
        message: 'เข้าสู่ระบบสำเร็จ',
        status: 200,
    });
}

export const getUser = (role: RoleType) => {
    return MOCK_USERS.find((user) => user.role === role);
}



