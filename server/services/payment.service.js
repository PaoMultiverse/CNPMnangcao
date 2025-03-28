class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  executePayment(amount, orderInfo) {
    return this.strategy.pay(amount, orderInfo);
  }
}

module.exports = PaymentContext;
