const { Client, Environment } = require("square");
const admin = require("firebase-admin");
async function initAdmin(){ if(admin.apps && admin.apps.length) return; const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || ""; if(!b64) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_BASE64"); const svc = JSON.parse(Buffer.from(b64,"base64").toString("utf8")); admin.initializeApp({ credential: admin.credential.cert(svc) }); }
exports.handler = async (event) => {
  try{
    await initAdmin();
    const body = JSON.parse(event.body||"{}");
    const providerId = body.providerId || "demo_provider";
    const isSubscription = body.type === "subscription";
    const subscriptionPrice = Number(process.env.SUBSCRIPTION_PRICE_CENTS || 2099);
    const bookingPrice = Number(process.env.BOOKING_PRICE_CENTS || 1000);
    const amount = isSubscription ? subscriptionPrice : bookingPrice;
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const env = (process.env.SQUARE_ENV === "production") ? Environment.Production : Environment.Sandbox;
    const client = new Client({ environment: env, accessToken });
    const idempotencyKey = 'link_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
    const bodyReq = {
      idempotency_key: idempotencyKey,
      order: { location_id: process.env.SQUARE_LOCATION_ID, line_items:[{ name: isSubscription? "Provider Subscription":"Booking Fee", quantity:"1", base_price_money:{ amount, currency: process.env.CURRENCY || "USD" } }] },
      checkout_options: { redirect_url: process.env.SITE_URL + "/src/pages/receipt.html" },
      reference_id: providerId
    };
    const res = await client.checkoutApi.createPaymentLink(bodyReq);
    const url = res.result && res.result.payment_link && res.result.payment_link.url;
    return { statusCode:200, body: JSON.stringify({ url }) };
  }catch(e){ console.error(e); return { statusCode:500, body: JSON.stringify({error: e.message||e}) }; }
};