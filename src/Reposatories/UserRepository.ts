import { IUser, IUserRepository } from "../Interfaces/IUser";
import prisma from "../DB/connection";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await prisma.user.findUnique({ where: { email } }) as IUser | null;
    }

    async create(data: any): Promise<IUser> {
        return await prisma.user.create({ data }) as IUser;
    }
}
