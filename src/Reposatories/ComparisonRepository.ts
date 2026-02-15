import prisma from "../DB/connection";

export class ComparisonRepository {
    async log(data: { type: string; inputData: any; resultData: any; fileUrl?: string }) {
        return await prisma.comparisonLog.create({ data });
    }

    async findAll() {
        return await prisma.comparisonLog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
