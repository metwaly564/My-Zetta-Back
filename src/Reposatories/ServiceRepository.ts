import { IService, IServiceRepository } from "../Interfaces/IService";
import prisma from "../DB/connection";

export class ServiceRepository implements IServiceRepository {
    async findAll(): Promise<IService[]> {
        return await prisma.service.findMany({
            include: {
                features: true,
                benefits: true,
            },
        }) as unknown as IService[];
    }

    async findById(id: number): Promise<IService | null> {
        return await prisma.service.findUnique({
            where: { id },
            include: {
                features: true,
                benefits: true,
            },
        }) as unknown as IService;
    }

    async create(data: any): Promise<IService> {
        const { features, benefits, ...serviceData } = data;
        return await prisma.service.create({
            data: {
                ...serviceData,
                features: {
                    create: features,
                },
                benefits: {
                    create: benefits,
                },
            },
            include: {
                features: true,
                benefits: true,
            },
        }) as unknown as IService;
    }

    async update(id: number, data: any): Promise<IService> {
        const { features, benefits, ...serviceData } = data;
        return await prisma.service.update({
            where: { id },
            data: {
                ...serviceData,
                // For simplicity in this initial implementation, we're not handling complex feature/benefit updates
            },
            include: {
                features: true,
                benefits: true,
            },
        }) as unknown as IService;
    }

    async delete(id: number): Promise<void> {
        await prisma.service.delete({ where: { id } });
    }
}
