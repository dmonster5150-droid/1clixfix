
1ClikFix - Release ZIP (polished starter)

Contents:
- public/logo-full.svg      (placeholder - replace with your PNG if you have it)
- public/logo-small.svg
- public/favicon.png
- src/components/Header.html
- src/pages/Home.html
- src/pages/ClientRegister.html
- src/pages/ProviderSubscribe.html
- src/pages/Login.html
- functions/createPaymentLink.js
- functions/squareWebhook.js
- emails/confirmation.html
- .env.example
- netlify.toml
- package.json

Important:
1) Replace public/logo-full.svg and logo-small.svg with your real PNG/SVG (preferably logo-full.png with transparent background).
2) Add environment variables in Netlify (Site settings -> Build & deploy -> Environment variables) from .env.example
3) Connect this repo to Netlify (Import from GitHub -> choose main branch)
4) Ensure SQUARE_* keys are set and Square webhook configured to point to /.netlify/functions/squareWebhook
