export interface PaymentDetails {
    amount: number;
    currency: string;
    contractId: number;
    customerEmail: string;
}

export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}

/**
 * Abstract Payment Gateway Service.
 * Defines the contract that Moyasar, PayTabs, or any other provider must implement.
 */
export abstract class PaymentGatewayService {
    abstract initializePayment(details: PaymentDetails): Promise<string>; // Returns payment URL
    abstract verifyPayment(transactionId: string): Promise<PaymentResult>;
}

/**
 * Mock Implementation for Phase 1
 */
export class MockPaymentGateway extends PaymentGatewayService {
    async initializePayment(details: PaymentDetails): Promise<string> {
        console.log(`[MOCK] Initializing payment for ${details.amount} ${details.currency}...`);
        return `https://mock.payment.gateway/checkout?contract=${details.contractId}`;
    }

    async verifyPayment(transactionId: string): Promise<PaymentResult> {
        console.log(`[MOCK] Verifying payment ${transactionId}...`);
        return {
            success: true,
            transactionId
        };
    }
}
