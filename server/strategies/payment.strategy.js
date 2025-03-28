class PaymentStrategy {
  async createPayment(req, res) {
    throw new Error("Phương thức createPayment chưa được triển khai");
  }

  async executePayment(req, res) {
    throw new Error("Phương thức executePayment chưa được triển khai");
  }
}

module.exports = PaymentStrategy;
