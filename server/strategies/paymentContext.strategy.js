class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async createPayment(req, res) {
    return this.strategy.createPayment(req, res);
  }

  async executePayment(req, res) {
    return this.strategy.executePayment(req, res);
  }
}

module.exports = PaymentContext;
