
export type baseResponse<T> = {
    success: boolean;
    data?: T;
    message: string;
    status: number;
}