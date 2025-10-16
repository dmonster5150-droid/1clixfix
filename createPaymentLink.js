const { Client, Environment } = require("square");
const admin = require("firebase-admin");

function initAdmin() {
  if (admin.apps && admin.apps.length) return;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || "";
  if (!base64) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_BASE64");
  const svc = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

exports.handler = async function(event) {
  try {
    if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
    initAdmin();
    const body = JSON.parse(event.body || '{}');
    const providerId = body.providerId || ('prov_' + Date.now());
    const amount = Number(body.amountCents || process.env.SUBSCRIPTION_PRICE_CENTS || 2099);
    const env = (process.env.SQUARE_ENV === 'production') ? Environment.Production : Environment.Sandbox;
    const client = new Client({ environment: env, accessToken: process.env.SQUARE_ACCESS_TOKEN });

    const idempotencyKey = 'link_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
    const createBody = {
      idempotency_key: idempotencyKey,
      order: {
        location_id: process.env.SQUARE_LOCATION_ID,
        line_items: [{ name: "1ClikFixx Provider Subscription", quantity: "1", base_price_money: { amount: amount, currency: process.env.CURRENCY || 'USD' } }]
      },
      checkout_options: {
        redirect_url: (process.env.SITE_URL || '') + '/receipt.html'
      },
      reference_id: providerId
    };
    const res = await client.checkoutApi.createPaymentLink(createBody);
    const url = res.result && res.result.payment_link && res.result.payment_link.url;
    return { statusCode: 200, body: JSON.stringify({ url }) };
  } catch(e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message || String(e) }) };
  }
};
