# Promise based Instamojo NodeJs integrator

**Promise based Instamojo payment gateway integrator for NodeJS based projects**

## Installation

```sh
npm i instamojo-payment-nodejs
```

OR

```sh
yarn add instamojo-payment-nodejs
```

## Setup

```js
const Instamojo = require("instamojo-payment-nodejs");

Instamojo.isSandboxMode(true);

Instamojo.setKeys(API_KEY, AUTH_KEY);
```

## APIs Available

1. [Create a new payment request](#create-new-payment-request)

### Create new payment request

```js
const options = {
  purpose: "Product name", // REQUIRED
  amount: 20, // REQUIRED and must be > ₹3 (3 INR)
  currency: "INR",
  buyer_name: "",
  email: "",
  phone: null,
  send_email: false,
  send_sms: false,
  allow_repeated_payments: false,
  webhook: "",
  redirect_url: "",
};

const paymentData = Instamojo.PaymentData(options);

async function pay() {
  const response = await Instamojo.createNewPaymentRequest(paymentData);
  console.log(response);
}

pay();
```

---

## Road map:

1. Create package with:
   1. ✅ Implement Sandbox mode for developers
   1. ✅ Create a payment request
   1. 📈 Write easy-to-follow docs for package consumers
   1. Get all payment links
   1. Get all payments
   1. Get payment request details
   1. Get payment details
   1. Initiate refund
   1. Get refund details
   1. Get all refunds

## Far

1. Create GH Pages for usage Docs
1. Implement TypeScript
1. Build SWAGGER Docs for API testing or quick preview
