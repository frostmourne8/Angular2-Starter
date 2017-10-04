export interface UserInfo {
    name: string;
    birthday: Date;
    email: string;
}

export interface User extends UserInfo {
    id: string;
}
