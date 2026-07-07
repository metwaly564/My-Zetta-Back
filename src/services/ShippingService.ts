export interface ShippingDetails {
    customerName: string;
    address: string;
    phone: string;
    deviceCount: number;
}

export interface ShippingStatus {
    trackingNumber: string;
    status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    carrier: 'SMSA' | 'ARAMEX';
}

export class ShippingService {
    async createShipment(details: ShippingDetails, carrier: 'SMSA' | 'ARAMEX'): Promise<ShippingStatus> {
        // Mock API Call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock tracking number
        const trackingNumber = `${carrier === 'SMSA' ? 'SA' : 'AR'}-${Math.floor(Math.random() * 1000000000)}`;
        
        console.log(`[MOCK] Created ${carrier} shipment for ${details.customerName}. Tracking: ${trackingNumber}`);
        
        return {
            trackingNumber,
            status: 'PENDING',
            carrier
        };
    }

    async getShipmentStatus(trackingNumber: string): Promise<ShippingStatus> {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`[MOCK] Checking status for ${trackingNumber}`);
        
        // Simulate a status randomly progressing
        const statuses: ShippingStatus['status'][] = ['PENDING', 'SHIPPED', 'DELIVERED'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        return {
            trackingNumber,
            status: randomStatus,
            carrier: trackingNumber.startsWith('SA') ? 'SMSA' : 'ARAMEX'
        };
    }
}
