import { IPartner, IPartnerRepository } from "../Interfaces/IPartner";
import prisma from "../DB/connection";

export class PartnerRepository implements IPartnerRepository {
    async findAll(): Promise<IPartner[]> {
        return await prisma.partner.findMany({
            orderBy: { rank: 'asc' },
        });
    }

    async findById(id: number): Promise<IPartner | null> {
        return await prisma.partner.findUnique({ where: { id } });
    }

    async create(data: Omit<IPartner, 'id' | 'createdAt' | 'updatedAt'>): Promise<IPartner> {
        return await prisma.partner.create({ data });
    }

    async update(id: number, data: Partial<IPartner>): Promise<IPartner> {
        return await prisma.partner.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await prisma.partner.delete({ where: { id } });
    }
}
