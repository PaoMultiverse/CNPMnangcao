const { createPaymentUrl } = require("../configs/vnpay");
const PaymentStrategy = require("./payment.strategy");

class VNPayPayment extends PaymentStrategy {
  async createPayment(req, res) {
    const { billId, totalAmount } = req.body;

    try {
      const paymentUrl = createPaymentUrl(
        billId,
        totalAmount,
        `Thanh toán hóa đơn ${billId}`
      );
      res.json({ success: true, paymentUrl });
    } catch (error) {
      console.error("Lỗi VNPAY:", error);
      res
        .status(500)
        .json({ success: false, message: "Lỗi xử lý thanh toán VNPAY" });
    }
  }

  async executePayment(req, res) {
    const { vnp_ResponseCode, vnp_TxnRef } = req.query;

    if (vnp_ResponseCode === "00") {
      res.redirect(
        `${process.env.CLIENT_URL}/tenant/bills/payment-result?vnp_TxnRef=${vnp_TxnRef}`
      );
    } else {
      res.redirect(
        `${process.env.CLIENT_URL}/tenant/bills/payment-result?payment=failed&code=${vnp_ResponseCode}`
      );
    }
  }
}

module.exports = VNPayPayment;
