export interface IPartner {
    id: number;
    name: string;
    logoUrl: string;
    websiteUrl?: string | null;
    rank: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPartnerRepository {
    findAll(): Promise<IPartner[]>;
    findById(id: number): Promise<IPartner | null>;
    create(data: Omit<IPartner, 'id' | 'createdAt' | 'updatedAt'>): Promise<IPartner>;
    update(id: number, data: Partial<IPartner>): Promise<IPartner>;
    delete(id: number): Promise<void>;
}
