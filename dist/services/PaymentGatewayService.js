"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPaymentGateway = exports.PaymentGatewayService = void 0;
/**
 * Abstract Payment Gateway Service.
 * Defines the contract that Moyasar, PayTabs, or any other provider must implement.
 */
class PaymentGatewayService {
}
exports.PaymentGatewayService = PaymentGatewayService;
/**
 * Mock Implementation for Phase 1
 */
class MockPaymentGateway extends PaymentGatewayService {
    async initializePayment(details) {
        console.log(`[MOCK] Initializing payment for ${details.amount} ${details.currency}...`);
        return `https://mock.payment.gateway/checkout?contract=${details.contractId}`;
    }
    async verifyPayment(transactionId) {
        console.log(`[MOCK] Verifying payment ${transactionId}...`);
        return {
            success: true,
            transactionId
        };
    }
}
exports.MockPaymentGateway = MockPaymentGateway;
