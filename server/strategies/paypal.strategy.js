const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const { paypalClient } = require("../configs/paypal");
const PaymentStrategy = require("./payment.strategy");

class PayPalPayment extends PaymentStrategy {
  async createPayment(req, res) {
    const { rentFee, electricityFee, waterFee, serviceFee, billId } = req.body;
    const totalAmount = rentFee + electricityFee + waterFee + (serviceFee || 0);
    const amountUSD = (totalAmount / 24000).toFixed(2);

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amountUSD,
          },
          description: `Thanh toán hóa đơn #${billId}`,
        },
      ],
      application_context: {
        return_url: `${process.env.REACT_APP_API_URL}/payment/paypal/success?billId=${billId}`,
        cancel_url: `${process.env.CLIENT_URL}/tenant/bills?payment=cancelled`,
      },
    });

    try {
      const response = await paypalClient.execute(request);
      res.json({ success: true, links: response.result.links });
    } catch (error) {
      console.error("Lỗi PayPal:", error);
      res
        .status(500)
        .json({ success: false, message: "Lỗi khi tạo thanh toán PayPal" });
    }
  }

  async executePayment(req, res) {
    const { token, billId } = req.query;

    try {
      if (!token || !billId) {
        return res
          .status(400)
          .json({ success: false, message: "Thiếu thông tin thanh toán" });
      }

      const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(token);
      request.requestBody({});
      const capture = await paypalClient.execute(request);

      if (capture.result.status === "COMPLETED") {
        res.json({ success: true, message: "Thanh toán thành công" });
      }
    } catch (error) {
      console.error("Lỗi xử lý thanh toán PayPal:", error);
      res.status(500).json({ success: false, message: "Lỗi xử lý thanh toán" });
    }
  }
}

module.exports = PayPalPayment;
