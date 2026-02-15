import { ILead, ILeadRepository } from "../Interfaces/ILead";
import prisma from "../DB/connection";

export class LeadRepository implements ILeadRepository {
    async findAll(): Promise<ILead[]> {
        return await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
            include: { service: true }
        }) as unknown as ILead[];
    }

    async create(data: any): Promise<ILead> {
        return await prisma.lead.create({ data }) as unknown as ILead;
    }

    async update(id: number, data: any): Promise<ILead> {
        return await prisma.lead.update({ where: { id }, data }) as unknown as ILead;
    }
}
