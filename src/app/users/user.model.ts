export interface IUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    phone?: string;
    department?: string;
}

export interface IUserCredential {
    username?: string;
    password?: string;
}
