export enum UserRole {
    ADMIN = 'ADMIN',
    SALES = 'SALES'
}

export interface IUser {
    id: number;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    create(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
}
