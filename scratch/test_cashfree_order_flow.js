const https = require('https');

const appId = process.env.CASHFREE_APP_ID;
const secretKey = process.env.CASHFREE_SECRET_KEY;

if (!appId || !secretKey) {
  console.log("Environment keys missing");
  process.exit(0);
}

const testOrder = {
  order_id: `BM-2026-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
  order_amount: 200,
  order_currency: 'INR',
  customer_details: {
    customer_id: `CUST_TEST_${Date.now()}`,
    customer_name: 'Cashfree Production Tester',
    customer_email: 'devibe70@gmail.com',
    customer_phone: '7922134099'
  },
  order_meta: {
    return_url: 'https://bahamut.in/api/cashfree/verify?order_id={order_id}&payment_type=PARTIAL_COD&total_amount=1499'
  },
  order_note: 'BAHAMUT Live Order Flow Test'
};

const data = JSON.stringify(testOrder);

const options = {
  hostname: 'api.cashfree.com',
  path: '/pg/orders',
  method: 'POST',
  headers: {
    'x-client-id': appId,
    'x-client-secret': secretKey,
    'x-api-version': '2023-08-01',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', chunk => responseData += chunk);
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
  });
});

req.write(data);
req.end();
