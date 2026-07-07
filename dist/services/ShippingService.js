"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
class ShippingService {
    async createShipment(details, carrier) {
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
    async getShipmentStatus(trackingNumber) {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`[MOCK] Checking status for ${trackingNumber}`);
        // Simulate a status randomly progressing
        const statuses = ['PENDING', 'SHIPPED', 'DELIVERED'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return {
            trackingNumber,
            status: randomStatus,
            carrier: trackingNumber.startsWith('SA') ? 'SMSA' : 'ARAMEX'
        };
    }
}
exports.ShippingService = ShippingService;
