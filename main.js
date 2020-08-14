const axios = require("axios").default;

const ENVIRENMENT = {
  production: "https://www.instamojo.com/api/1.1/",
  sandbox: "https://test.instamojo.com/api/1.1/",
};

axios.defaults.baseURL = ENVIRENMENT["production"];

const ENDPOINT = {
  createPayment: "payment-requests/",
  requestLinks: "links/",
  paymentStatus: "payment-requests/",
  refunds: "refunds/",
};

const isSandboxMode = isSandbox => {
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

const PaymentData = options => {
  const { purpose, amount } = options;
  if (!purpose || !amount) {
    console.error(
      new Error(
        `Purpose and Amount are mandatory fields. And Amount can't be 0.
         Try something like:
         Instamojo.PaymentData({
           purpose: 'Product name',
           amount: 20
         });`
      )
    );
    process.exit(1);
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

const createNewPaymentRequest = async data => {
  const createPaymentRequest = axios.create();
  try {
    const response = await createPaymentRequest.post(
      ENDPOINT.createPayment,
      data
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }

    return error.response;
  }
};

module.exports = {
  isSandboxMode,
  setKeys,
  PaymentData,
  createNewPaymentRequest,
};
