const crypto = require('crypto');
const admin = require('firebase-admin');

function initAdmin() {
  if (admin.apps && admin.apps.length) return;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || "";
  const svc = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

function verifySignature(signatureKey, notificationUrl, body, header) {
  try {
    const hmac = crypto.createHmac('sha256', signatureKey);
    hmac.update(notificationUrl + body);
    const computed = hmac.digest('base64');
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(header));
  } catch(e) { return false; }
}

exports.handler = async function(event) {
  try {
    initAdmin();
    const body = event.body || '';
    const headers = event.headers || {};
    const sigHeader = headers['x-square-hmacsha256-signature'] || headers['X-Square-HmacSha256-Signature'] || '';
    const sigKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || '';
    const notificationUrl = (process.env.SITE_URL || '') + '/.netlify/functions/squareWebhook';
    if(!verifySignature(sigKey, notificationUrl, body, sigHeader)) {
      console.warn('invalid signature'); return { statusCode: 401, body: 'invalid signature' };
    }
    const payload = JSON.parse(body);
    const payment = payload?.data?.object?.payment || payload?.data?.object || payload?.data;
    const ref = payment?.reference_id || payment?.order_id || payment?.id;
    const db = admin.firestore();
    if(!ref) return { statusCode: 200, body: 'no reference' };
    const provRef = db.collection('providers').doc(ref);
    const provSnap = await provRef.get();
    if(provSnap.exists) {
      await provRef.update({ subscribed: true, paid: true, paidAt: admin.firestore.FieldValue.serverTimestamp(), paymentInfo: payment });
      return { statusCode: 200, body: 'provider updated' };
    }
    return { statusCode: 200, body: 'no provider doc found' };
  } catch(e) {
    console.error(e);
    return { statusCode: 500, body: 'error' };
  }
};
