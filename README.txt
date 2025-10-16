1ClikFix - Polished Core Release

Contents:
- index.html (landing)
- src/pages/ClientRegister.html (post a job)
- src/pages/ProviderSubscribe.html (subscribe + payment)
- src/pages/ProviderCalendar.html (provider calendar - requires providerId input for demo)
- src/pages/receipt.html (payment receipt)
- src/pages/terms.html, privacy.html, disclaimer.html
- functions/*.js (createPaymentLink, getOpenJobs, assignJob, getProvider, squareWebhook)
- src/firebase/firebaseConfig.js (paste your web config here)
- .env.example (env vars for Netlify)
- netlify.toml, package.json, README.txt

Quick deploy:
1. Upload files to GitHub repo and connect to Netlify (publish directory = /)
2. Add env vars from .env.example in Netlify site settings
3. Create Firebase service account JSON and base64-encode it, paste into FIREBASE_SERVICE_ACCOUNT_BASE64
4. Deploy and test.
