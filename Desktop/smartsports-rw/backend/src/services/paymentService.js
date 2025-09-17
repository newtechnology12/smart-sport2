const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../config/database');
const { cache } = require('../config/redis');
const logger = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');

class PaymentService {
  constructor() {
    this.mtnConfig = {
      baseURL: process.env.MTN_MOMO_API_URL,
      subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY,
      apiUserId: process.env.MTN_MOMO_API_USER_ID,
      apiKey: process.env.MTN_MOMO_API_KEY,
      callbackUrl: process.env.MTN_MOMO_CALLBACK_URL
    };

    this.airtelConfig = {
      baseURL: process.env.AIRTEL_MONEY_API_URL,
      clientId: process.env.AIRTEL_MONEY_CLIENT_ID,
      clientSecret: process.env.AIRTEL_MONEY_CLIENT_SECRET,
      callbackUrl: process.env.AIRTEL_MONEY_CALLBACK_URL
    };

    this.rswitchConfig = {
      baseURL: process.env.RSWITCH_API_URL,
      merchantId: process.env.RSWITCH_MERCHANT_ID,
      apiKey: process.env.RSWITCH_API_KEY,
      secretKey: process.env.RSWITCH_SECRET_KEY,
      callbackUrl: process.env.RSWITCH_CALLBACK_URL
    };
  }

  // Initialize payment
  async initiatePayment(paymentData) {
    try {
      const {
        user_id,
        event_id,
        ticket_ids,
        amount,
        payment_method,
        customer_phone,
        customer_email,
        customer_name
      } = paymentData;

      // Generate payment reference
      const paymentReference = `SSR${Date.now()}${Math.floor(Math.random() * 1000)}`;

      // Create payment record
      const [payment] = await db('payments').insert({
        payment_reference: paymentReference,
        user_id,
        event_id,
        ticket_ids: JSON.stringify(ticket_ids || []),
        subtotal: amount,
        total_amount: amount,
        payment_method,
        customer_name,
        customer_email,
        customer_phone: customer_phone,
        status: 'pending',
        initiated_at: new Date(),
        expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
      }).returning('*');

      let paymentResponse;

      // Route to appropriate payment provider
      switch (payment_method) {
        case 'mtn_momo':
          paymentResponse = await this.processMTNMoMoPayment(payment, customer_phone);
          break;
        case 'airtel_money':
          paymentResponse = await this.processAirtelMoneyPayment(payment, customer_phone);
          break;
        case 'bank_transfer':
        case 'credit_card':
        case 'debit_card':
          paymentResponse = await this.processRSwitchPayment(payment);
          break;
        case 'wallet':
          paymentResponse = await this.processWalletPayment(payment);
          break;
        default:
          throw new AppError('Unsupported payment method', 400);
      }

      // Update payment with external reference
      await db('payments')
        .where({ id: payment.id })
        .update({
          external_reference: paymentResponse.externalReference,
          status: paymentResponse.status,
          provider_response: JSON.stringify(paymentResponse.providerData)
        });

      logger.logPayment('Payment Initiated', {
        ...payment,
        external_reference: paymentResponse.externalReference
      });

      return {
        payment_id: payment.id,
        payment_reference: paymentReference,
        status: paymentResponse.status,
        external_reference: paymentResponse.externalReference,
        payment_url: paymentResponse.paymentUrl,
        expires_at: payment.expires_at
      };

    } catch (error) {
      logger.error('Payment initiation failed:', error);
      throw error;
    }
  }

  // MTN MoMo payment processing
  async processMTNMoMoPayment(payment, phoneNumber) {
    try {
      // Get access token
      const accessToken = await this.getMTNAccessToken();

      const requestId = uuidv4();
      const requestData = {
        amount: payment.total_amount.toString(),
        currency: 'RWF',
        externalId: payment.payment_reference,
        payer: {
          partyIdType: 'MSISDN',
          partyId: phoneNumber.replace('+', '').replace(/\s/g, '')
        },
        payerMessage: `Payment for SmartSports Rwanda - ${payment.payment_reference}`,
        payeeNote: `Ticket payment - ${payment.payment_reference}`
      };

      const response = await axios.post(
        `${this.mtnConfig.baseURL}/collection/v1_0/requesttopay`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Reference-Id': requestId,
            'X-Target-Environment': process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
            'Ocp-Apim-Subscription-Key': this.mtnConfig.subscriptionKey,
            'Content-Type': 'application/json'
          }
        }
      );

      // Store request ID for status checking
      await cache.set(`mtn_request:${payment.id}`, requestId, 600); // 10 minutes

      return {
        externalReference: requestId,
        status: 'processing',
        paymentUrl: null,
        providerData: response.data
      };

    } catch (error) {
      logger.error('MTN MoMo payment failed:', error);
      throw new AppError('MTN MoMo payment processing failed', 500);
    }
  }

  // Get MTN access token
  async getMTNAccessToken() {
    try {
      // Check cache first
      const cachedToken = await cache.get('mtn_access_token');
      if (cachedToken) {
        return cachedToken;
      }

      const response = await axios.post(
        `${this.mtnConfig.baseURL}/collection/token/`,
        {},
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.mtnConfig.subscriptionKey,
            'Authorization': `Basic ${Buffer.from(`${this.mtnConfig.apiUserId}:${this.mtnConfig.apiKey}`).toString('base64')}`
          }
        }
      );

      const { access_token, expires_in } = response.data;

      // Cache token with expiry
      await cache.set('mtn_access_token', access_token, expires_in - 60); // 1 minute buffer

      return access_token;

    } catch (error) {
      logger.error('MTN access token failed:', error);
      throw new AppError('Failed to get MTN access token', 500);
    }
  }

  // Airtel Money payment processing
  async processAirtelMoneyPayment(payment, phoneNumber) {
    try {
      // Get access token
      const accessToken = await this.getAirtelAccessToken();

      const requestData = {
        reference: payment.payment_reference,
        subscriber: {
          country: 'RW',
          currency: 'RWF',
          msisdn: phoneNumber.replace('+', '').replace(/\s/g, '')
        },
        transaction: {
          amount: payment.total_amount,
          country: 'RW',
          currency: 'RWF',
          id: payment.payment_reference
        }
      };

      const response = await axios.post(
        `${this.airtelConfig.baseURL}/merchant/v1/payments/`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'X-Country': 'RW',
            'X-Currency': 'RWF'
          }
        }
      );

      return {
        externalReference: response.data.data?.transaction?.id || payment.payment_reference,
        status: 'processing',
        paymentUrl: null,
        providerData: response.data
      };

    } catch (error) {
      logger.error('Airtel Money payment failed:', error);
      throw new AppError('Airtel Money payment processing failed', 500);
    }
  }

  // Get Airtel access token
  async getAirtelAccessToken() {
    try {
      const cachedToken = await cache.get('airtel_access_token');
      if (cachedToken) {
        return cachedToken;
      }

      const response = await axios.post(
        `${this.airtelConfig.baseURL}/auth/oauth2/token`,
        {
          client_id: this.airtelConfig.clientId,
          client_secret: this.airtelConfig.clientSecret,
          grant_type: 'client_credentials'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { access_token, expires_in } = response.data;
      await cache.set('airtel_access_token', access_token, expires_in - 60);

      return access_token;

    } catch (error) {
      logger.error('Airtel access token failed:', error);
      throw new AppError('Failed to get Airtel access token', 500);
    }
  }

  // RSwitch payment processing (for cards and bank transfers)
  async processRSwitchPayment(payment) {
    try {
      const requestData = {
        merchantId: this.rswitchConfig.merchantId,
        amount: payment.total_amount,
        currency: 'RWF',
        reference: payment.payment_reference,
        description: `SmartSports Rwanda - Ticket Payment`,
        callbackUrl: this.rswitchConfig.callbackUrl,
        customerEmail: payment.customer_email,
        customerPhone: payment.customer_phone
      };

      // Generate signature
      const signature = this.generateRSwitchSignature(requestData);
      requestData.signature = signature;

      const response = await axios.post(
        `${this.rswitchConfig.baseURL}/api/v1/payments/initiate`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.rswitchConfig.apiKey}`
          }
        }
      );

      return {
        externalReference: response.data.transactionId,
        status: 'processing',
        paymentUrl: response.data.paymentUrl,
        providerData: response.data
      };

    } catch (error) {
      logger.error('RSwitch payment failed:', error);
      throw new AppError('Card/Bank payment processing failed', 500);
    }
  }

  // Generate RSwitch signature
  generateRSwitchSignature(data) {
    const crypto = require('crypto');
    const sortedKeys = Object.keys(data).sort();
    const signatureString = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
    return crypto.createHmac('sha256', this.rswitchConfig.secretKey).update(signatureString).digest('hex');
  }

  // Wallet payment processing
  async processWalletPayment(payment) {
    try {
      // Get user's wallet
      const wallet = await db('wallets')
        .where({ user_id: payment.user_id, status: 'active' })
        .first();

      if (!wallet) {
        throw new AppError('Wallet not found', 404);
      }

      if (wallet.balance < payment.total_amount) {
        throw new AppError('Insufficient wallet balance', 400);
      }

      // Create wallet transaction
      const [walletTransaction] = await db('wallet_transactions').insert({
        wallet_id: wallet.id,
        user_id: payment.user_id,
        transaction_reference: `WTX${Date.now()}${Math.floor(Math.random() * 1000)}`,
        type: 'payment',
        amount: -payment.total_amount,
        balance_before: wallet.balance,
        balance_after: wallet.balance - payment.total_amount,
        status: 'completed',
        payment_id: payment.id,
        event_id: payment.event_id,
        description: `Payment for tickets - ${payment.payment_reference}`,
        initiated_at: new Date(),
        completed_at: new Date()
      }).returning('*');

      // Update wallet balance
      await db('wallets')
        .where({ id: wallet.id })
        .update({
          balance: wallet.balance - payment.total_amount,
          lifetime_spent: wallet.lifetime_spent + payment.total_amount,
          total_transactions: wallet.total_transactions + 1,
          last_transaction_at: new Date()
        });

      return {
        externalReference: walletTransaction.transaction_reference,
        status: 'completed',
        paymentUrl: null,
        providerData: { wallet_transaction_id: walletTransaction.id }
      };

    } catch (error) {
      logger.error('Wallet payment failed:', error);
      throw error;
    }
  }

  // Check payment status
  async checkPaymentStatus(paymentId) {
    try {
      const payment = await db('payments').where({ id: paymentId }).first();
      
      if (!payment) {
        throw new AppError('Payment not found', 404);
      }

      if (payment.status === 'completed' || payment.status === 'failed') {
        return payment;
      }

      let updatedStatus = payment.status;

      // Check status based on payment method
      switch (payment.payment_method) {
        case 'mtn_momo':
          updatedStatus = await this.checkMTNPaymentStatus(payment);
          break;
        case 'airtel_money':
          updatedStatus = await this.checkAirtelPaymentStatus(payment);
          break;
        case 'wallet':
          // Wallet payments are instant
          break;
        default:
          // For other methods, status is updated via webhooks
          break;
      }

      // Update payment status if changed
      if (updatedStatus !== payment.status) {
        await db('payments')
          .where({ id: paymentId })
          .update({ 
            status: updatedStatus,
            completed_at: updatedStatus === 'completed' ? new Date() : null,
            failed_at: updatedStatus === 'failed' ? new Date() : null
          });
      }

      return { ...payment, status: updatedStatus };

    } catch (error) {
      logger.error('Payment status check failed:', error);
      throw error;
    }
  }

  // Check MTN payment status
  async checkMTNPaymentStatus(payment) {
    try {
      const requestId = await cache.get(`mtn_request:${payment.id}`);
      if (!requestId) {
        return 'failed';
      }

      const accessToken = await this.getMTNAccessToken();

      const response = await axios.get(
        `${this.mtnConfig.baseURL}/collection/v1_0/requesttopay/${requestId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Target-Environment': process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
            'Ocp-Apim-Subscription-Key': this.mtnConfig.subscriptionKey
          }
        }
      );

      const status = response.data.status;
      
      switch (status) {
        case 'SUCCESSFUL':
          return 'completed';
        case 'FAILED':
          return 'failed';
        case 'PENDING':
          return 'processing';
        default:
          return 'processing';
      }

    } catch (error) {
      logger.error('MTN status check failed:', error);
      return 'failed';
    }
  }

  // Check Airtel payment status
  async checkAirtelPaymentStatus(payment) {
    try {
      const accessToken = await this.getAirtelAccessToken();

      const response = await axios.get(
        `${this.airtelConfig.baseURL}/standard/v1/payments/${payment.external_reference}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Country': 'RW',
            'X-Currency': 'RWF'
          }
        }
      );

      const status = response.data.data?.transaction?.status;
      
      switch (status) {
        case 'TS':
          return 'completed';
        case 'TF':
          return 'failed';
        case 'TA':
          return 'processing';
        default:
          return 'processing';
      }

    } catch (error) {
      logger.error('Airtel status check failed:', error);
      return 'failed';
    }
  }
}

module.exports = new PaymentService();
