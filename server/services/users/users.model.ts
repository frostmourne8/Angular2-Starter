export interface UserInfo {
    name: string;
    birthday: Date;
    email: string;
    balance?: number;
}

export interface User extends UserInfo {
    _id: string;
}
