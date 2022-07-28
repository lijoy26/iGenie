export interface CreateUserDto {
    id: string | any;
    email: string;
    password: string;
    type: string;
    disabled?: boolean;
}
export interface LoginUserT {
    email: string;
    password: string;
}