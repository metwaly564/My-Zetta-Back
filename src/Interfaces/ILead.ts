export enum LeadType {
    CONTACT = 'CONTACT',
    ROI = 'ROI'
}

export enum LeadStatus {
    NEW = 'NEW',
    CONTACTED = 'CONTACTED',
    QUALIFIED = 'QUALIFIED',
    CLOSED = 'CLOSED'
}

export interface ILead {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    jobTitle?: string | null;
    industry?: string | null;
    serviceId?: number | null;
    deviceItems?: any;
    calculationResults?: any;
    type: LeadType;
    status: LeadStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILeadRepository {
    findAll(): Promise<ILead[]>;
    create(data: Omit<ILead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ILead>;
    update(id: number, data: Partial<ILead>): Promise<ILead>;
}
