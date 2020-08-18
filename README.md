# Promise based Instamojo NodeJs integrator

**Promise based Instamojo payment gateway integrator for NodeJS based projects**

- No callback hell ✅
- Clean, readable code with async-await 💖

![Coverage](https://img.shields.io/badge/Code_Coverage-100%25-brightgreen.svg)

> If you face any problems using this package, please create an issue on this repo OR even better, create a PR! 🙂

## Installation

```sh
npm i instamojo-payment-nodejs // OR yarn add instamojo-payment-nodejs
```

## APIs Available

1. [Setup keys](#setup-keys)
1. [Create a new payment request](#create-new-payment-request)
1. [Get single payment request details](#Get-single-payment-request-details)
1. [Get single payment details](#Get-single-payment-details)
1. [Get all payment requests](#Get-all-payment-requests)
1. [Initiate refund](#Initiate-refund)
1. [Get all refund requests](#Get-all-refund-requests)
1. [Get single refund details with `refundId`](#Get-single-refund-details-with-refundId)

### **Setup keys**

```js
const Instamojo = require("instamojo-payment-nodejs");

Instamojo.isSandboxMode(true); // For testing

Instamojo.setKeys(API_KEY, AUTH_KEY);
```

### **Create new payment request**

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

const response = await Instamojo.createNewPaymentRequest(paymentData);
```

<details><summary>Response from <b>createNewPaymentRequest</b></summary>

```json
{
  "success": true,
  "payment_request": {
    "id": 0cb066f9d3764c2fab6da469d8f613ss,
    "phone": null,
    "email": "",
    "buyer_name": "",
    "amount": "20.00",
    "purpose": "Product name",
    "expires_at": null,
    "status": "Pending",
    "send_sms": false,
    "send_email": false,
    "sms_status": null,
    "email_status": null,
    "shorturl": null,
    "longurl": "https://test.instamojo.com/@user/0cb066f9d3764c2fab6da469d8f613ss",
    "redirect_url": "",
    "webhook": "",
    "allow_repeated_payments": false,
    "customer_id": null,
    "created_at": "2020-08-16T08:26:26.382335Z",
    "modified_at": "2020-08-16T08:26:26.382353Z"
  }
}
```

</details>

<br />

### **Get single payment request details**

```js
const PAYMENT_REQUEST_ID = "0cb066f9d3764c2fab6da469d8f613ss";
const status = await Instamojo.getPaymentRequestStatus(PAYMENT_REQUEST_ID);
```

<details><summary>Status from <b>getPaymentRequestStatus</b></summary>

```json
{
  "success": true,
  "payment_request": {
    "id": "0cb066f9d3764c2fab6da469d8f613ss",
    "phone": null,
    "email": "",
    "buyer_name": "",
    "amount": "20.00",
    "purpose": "Product name",
    "expires_at": null,
    "status": "Completed",
    "send_sms": false,
    "send_email": false,
    "sms_status": null,
    "email_status": null,
    "shorturl": null,
    "longurl": "https://test.instamojo.com/@USER/0cb066f9d3764c2fab6da469d8f613ss",
    "redirect_url": "",
    "webhook": "",
    "payments": [
      {
        "payment_id": "MOJO0816705N15845280",
        "status": "Credit",
        "currency": "INR",
        "amount": "20.00",
        "buyer_name": "John Doe",
        "buyer_phone": "+919900000000",
        "buyer_email": "john@doe.com",
        "shipping_address": null,
        "shipping_city": null,
        "shipping_state": null,
        "shipping_zip": null,
        "shipping_country": null,
        "quantity": 1,
        "unit_price": "20.00",
        "fees": "0.38",
        "variants": [],
        "custom_fields": {},
        "affiliate_commission": "0",
        "payment_request": "https://test.instamojo.com/api/1.1/payment-requests/0cb066f9d3764c2fab6da469d8f613ss/",
        "instrument_type": "NETBANKING",
        "billing_instrument": "Domestic Netbanking Regular",
        "tax_invoice_id": "",
        "failure": null,
        "payout": null,
        "created_at": "2020-08-16T08:34:29.939734Z"
      }
    ],
    "allow_repeated_payments": false,
    "customer_id": null,
    "created_at": "2020-08-16T08:26:26.382335Z",
    "modified_at": "2020-08-16T08:34:40.470238Z"
  }
}
```

</details>

<br />

### **Get single payment details**

```js
const PAYMENT_REQUEST_ID = "0cb066f9d3764c2fab6da469d8f613ss";
const PAYMENT_ID = "MOJO0816705N15845280";
const paymentDetails = await Instamojo.getOnePayedPaymentDetails(
  PAYMENT_REQUEST_ID,
  PAYMENT_ID
);
```

<details><summary>paymentDetails from <b>getOnePayedPaymentDetails</b></summary>

```json
{
  "success": true,
  "payment_request": {
    "id": "0cb066f9d3764c2fab6da469d8f613ss",
    "phone": null,
    "email": "",
    "buyer_name": "",
    "amount": "20.00",
    "purpose": "Product name",
    "expires_at": null,
    "status": "Completed",
    "send_sms": false,
    "send_email": false,
    "sms_status": null,
    "email_status": null,
    "shorturl": null,
    "longurl": "https://test.instamojo.com/@USER/0cb066f9d3764c2fab6da469d8f613ss",
    "redirect_url": "",
    "webhook": "",
    "payment": {
      "payment_id": "MOJO0816705N15845280",
      "status": "Credit",
      "currency": "INR",
      "amount": "20.00",
      "buyer_name": "John Doe",
      "buyer_phone": "+919900000000",
      "buyer_email": "john@doe.com",
      "shipping_address": null,
      "shipping_city": null,
      "shipping_state": null,
      "shipping_zip": null,
      "shipping_country": null,
      "quantity": 1,
      "unit_price": "20.00",
      "fees": "0.38",
      "variants": [],
      "custom_fields": {},
      "affiliate_commission": "0",
      "payment_request": "https://test.instamojo.com/api/1.1/payment-requests/0cb066f9d3764c2fab6da469d8f613ss/",
      "instrument_type": "NETBANKING",
      "billing_instrument": "Domestic Netbanking Regular",
      "tax_invoice_id": "",
      "failure": null,
      "payout": null,
      "created_at": "2020-08-16T08:34:29.939734Z"
    },
    "allow_repeated_payments": false,
    "customer_id": null,
    "created_at": "2020-08-16T08:26:26.382335Z",
    "modified_at": "2020-08-16T08:34:40.470238Z"
  }
}
```

</details>

<br />

### **Get all payment requests**

```js
const response = await Instamojo.getAllPaymentRequests();
```

<details><summary>Response from <b>getAllPaymentRequests</b></summary>

```json
{}
```

</details>

<br />

### **Initiate refund**

```js
const refundInstance = new Instamojo.RefundRequestOptions({
  payment_id: "MOJO0816705N15845280",
  type: "RFD", // Refer below section
  body: "Reason for refund",
});

refundInstance.setOptionalRefundAmount(99);

const refundResponse = await Instamojo.initiateRefund(
  refundInstance.getObject()
);
```

**Valid values for type parameter:**

- `RFD`: Duplicate/delayed payment.
- `TNR`: Product/service no longer available.
- `QFL`: Customer not satisfied.
- `QNR`: Product lost/damaged.
- `EWN`: Digital download issue.
- `TAN`: Event was canceled/changed.
- `PTH`: Problem not described above.

For more, refer: https://docs.instamojo.com/docs/creating-a-refund,

<details><summary>Response from <b>initiateRefund</b></summary>

```json
{
  "refund": {
    "id": "C5c0751269",
    "payment_id": "MOJO5a06005J21512197",
    "status": "Refunded",
    "type": "QFL",
    "body": "Customer isn't satisfied with the quality",
    "refund_amount": "2500.00",
    "total_amount": "2500.00",
    "created_at": "2015-12-07T11:01:37.640Z"
  },
  "success": true
}
```

</details>

<br />

### **Get all refund requests**

```js
const response = await Instamojo.getAllRefunds();
```

<details><summary>Response from <b>getAllRefunds</b></summary>

```json
{
  "refunds": [
    {
      "id": "C5c0751269",
      "payment_id": "MOJO5a06005J21512197",
      "status": "Refunded",
      "type": "QFL",
      "body": "Customer isn't satisfied with the quality",
      "refund_amount": "2500.00",
      "total_amount": "2500.00",
      "created_at": "2015-12-07T11:01:37.640Z"
    }
  ],
  "success": true
}
```

</details>

<br />

### **Get single refund details with refundId**

```js
const response = await Instamojo.getRefundDetails("C5c0751272");
```

<details><summary>Response from <b>getRefundDetails</b></summary>

```json
{
  "refund": {
    "id": "C5c0751272",
    "payment_id": "MOJO5a06005J21512197",
    "status": "Refunded",
    "type": "QFL",
    "body": "Customer isn't satisfied with the quality",
    "refund_amount": "2500.00",
    "total_amount": "2500.00",
    "created_at": "2015-12-07T11:04:09.500Z"
  },
  "success": true
}
```

</details>

<br />

---

## Road map:

1. Create package with:

   1. ✅ Implement Sandbox mode for developers
   1. ✅ Create a payment request
   1. ✅ Write an easy-to-follow docs for package consumers
   1. ✅ Get Single payment request details
   1. ✅ Get Single payment details
   1. ✅ Get all payment requests
   1. ✅ Get all payments

1. Refund

   1. ✅ Initiate refund
   1. ✅ Get all refund requests
   1. ✅ Get single refund details with refundId

1. ✅ Reach code test coverage threshold 60%
1. ✅ Reach code test coverage threshold 100%

## Far

1. Create GH Pages for usage Docs
1. Implement TypeScript
1. Build SWAGGER Docs for API testing or quick preview
