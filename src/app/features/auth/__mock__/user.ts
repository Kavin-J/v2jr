import { LoginPayload } from "../auth.thunks";
import { RoleType, LanguageType, User } from "../auth.type";
import { baseResponse } from "../../../services/types";

export interface UserMock extends User {
    password: string;
    token: string;
    language: LanguageType;
    permissions: string[];
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
        permissions: ['*']
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
        permissions: ['*']
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
        permissions: ['*']
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
        permissions: ['*']
    },
    {
        id: '5',
        name: 'supapohn jp',
        email: 'wiriyamu98@gmail.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        password: 'test123',
        token: 'admin_test_token1234',
        language: 'th',
        permissions: ['*']
    }
]
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (payload: LoginPayload): Promise<baseResponse<{ token: string; }>> => {
    const user = MOCK_USERS.find((user) => user.email === payload.email);
    await delay(1000);
    if (!user) {
        return Promise.resolve<baseResponse<{ token: string; }>>({
            success: false,
            message: 'ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่พบผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
            status: 404,
        });
    }
    if (user.password !== payload.password) {
        return Promise.resolve<baseResponse<{ token: string; }>>({
            success: false,
            message: 'ไม่สามารถเข้าสู่ระบบได้เนื่องจากไม่พบผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง',
            status: 401,
        });
    }
    return Promise.resolve<baseResponse<{ token: string; }>>({
        success: true,
        data: {
            token: user.token,
        },
        message: 'เข้าสู่ระบบสำเร็จ',
        status: 200,
    });
}
export const mockUserInfo = async (): Promise<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>> => {
    console.log();
    console.log(MOCK_USERS);
    const token = localStorage.getItem('token')
    const user = MOCK_USERS.find((u) => {
        console.log(u.token);
        console.log(token);
        return u.token === token
    })
    console.log(user);

    await delay(1000);
    if (!user) {
        console.log('ไม่สามารถเข้าสู่ระบบได้เนื่องจากโทนหมดอายุ');
        return Promise.resolve<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>>({
            success: false,
            message: 'ไม่สามารถเข้าสู่ระบบได้เนื่องจากโทนหมดอายุ',
            status: 401,
        });
    }
    console.log('เข้าสู่ระบบสำเร็จ');
    return Promise.resolve<baseResponse<{ user: User & { permissions: string[], language: LanguageType } }>>({
        success: true,
        data: {
            user: { id: user.id, email: user.email, role: user.role, avatar: user.avatar, name: user.name, permissions: user.permissions, language: user.language },
        },
        message: 'เข้าสู่ระบบสำเร็จ',
        status: 200,
    });
}

export const getUser = (role: RoleType) => {
    return MOCK_USERS.find((user) => user.role === role);
}



