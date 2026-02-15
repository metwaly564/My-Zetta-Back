export interface IService {
    id: number;
    nameEn: string;
    nameAr: string;
    shortName: string;
    descriptionEn: string;
    descriptionAr: string;
    icon: string;
    taglineEn: string;
    taglineAr: string;
    savingsMultiplier: number;
    monthlyRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IServiceRepository {
    findAll(): Promise<IService[]>;
    findById(id: number): Promise<IService | null>;
    create(data: Omit<IService, 'id' | 'createdAt' | 'updatedAt'>): Promise<IService>;
    update(id: number, data: Partial<IService>): Promise<IService>;
    delete(id: number): Promise<void>;
}
