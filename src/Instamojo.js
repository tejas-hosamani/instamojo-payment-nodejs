const axios = require("axios").default;

const ENVIRENMENT = {
  production: "https://www.instamojo.com/api/1.1",
  sandbox: "https://test.instamojo.com/api/1.1",
};

axios.defaults.baseURL = ENVIRENMENT["production"];

const ENDPOINT = {
  createPayment: "/payment-requests",
  paymentStatus: "/payment-requests",
  requestLinks: "/links",
  refunds: "/refunds",
};

const isSandboxMode = (isSandbox) => {
  if (isSandbox) {
    axios.defaults.baseURL = ENVIRENMENT["sandbox"];
  } else {
    axios.defaults.baseURL = ENVIRENMENT["production"];
  }
};

const setKeys = (apiKey, authKey) => {
  axios.defaults.headers.common["X-Api-Key"] = apiKey;
  axios.defaults.headers.common["X-Auth-Token"] = authKey;
};

const PaymentData = (options) => {
  const { purpose, amount } = options;
  if (!purpose || !amount) {
    return new Error(
      `Purpose and Amount are mandatory fields. And Amount can't be 0.
       Try something like:
       Instamojo.PaymentData({
         purpose: 'Product name',
         amount: 20
       });`
    );
  }
  return {
    purpose: "", // REQUIRED
    amount: 0, // REQUIRED
    currency: "INR",
    buyer_name: "",
    email: "",
    phone: null,
    send_email: false,
    send_sms: false,
    allow_repeated_payments: false,
    webhook: "",
    redirect_url: "",
    ...options,
  };
};

const createNewPaymentRequest = async (data) => {
  try {
    const response = await axios.post(ENDPOINT.createPayment, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getPaymentRequestStatus = async (paymentRequestId) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.paymentStatus}/${paymentRequestId}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getOnePayedPaymentDetails = async (paymentRequestId, paymentId) => {
  try {
    const response = await axios.get(
      `${ENDPOINT.paymentStatus}/${paymentRequestId}/${paymentId}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getAllPaymentRequests = async () => {
  try {
    const response = await axios.get(ENDPOINT.paymentStatus);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getAllPaymentLinksCreatedOnInstamojo = async () => {
  try {
    const response = await axios.get(ENDPOINT.requestLinks);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

class RefundRequestOptions {
  constructor({ payment_id, type, body }) {
    this.payment_id = payment_id;
    this.type = type;
    this.body = body;
  }
  setOptionalRefundAmount(refundAmount) {
    this.refund_amount = refundAmount;
  }

  getObject() {
    return {
      payment_id: this.payment_id,
      type: this.type,
      body: this.body,
      refund_amount: this.refund_amount,
    };
  }
}

const initiateRefund = async (refundRequest) => {
  try {
    const response = await axios.post(ENDPOINT.refunds, refundRequest);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getAllRefunds = async () => {
  try {
    const response = await axios.get(ENDPOINT.refunds);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getRefundDetails = async (refundId) => {
  try {
    const response = await axios.get(`${ENDPOINT.refunds}/${refundId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

module.exports = {
  isSandboxMode,
  setKeys,
  PaymentData,
  createNewPaymentRequest,
  getPaymentRequestStatus,
  getOnePayedPaymentDetails,
  getAllPaymentRequests,
  getAllPaymentLinksCreatedOnInstamojo,
  RefundRequestOptions,
  initiateRefund,
  getAllRefunds,
  getRefundDetails,
};
