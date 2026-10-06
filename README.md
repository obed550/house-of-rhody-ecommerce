# House of Rhody Ecommerce

A fashion storefront and admin dashboard for a clothing business with a premium gold, cream, navy and brown aesthetic.

## Features
- Elegant storefront for clothing products
- Signup with full name, phone contact and password
- SMS OTP verification flow
- Admin dashboard with payment settings and sales overview
- Product catalog with kids, women, men, teens, and adults
- Payment method area for Paystack, Stripe, Flutterwave, PayPal and bank transfer
- Installable PWA support via web manifest

## Tech Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting started

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env.local` and fill in your keys.
3. Run the app:
   npm run dev
4. Open http://localhost:3000

## Notes
- The signup and OTP flows are demo-ready and can be replaced with real database + SMS provider logic.
- For production, connect your real payment keys and a real SMS provider like Twilio.
- The installation experience is enabled using the web app manifest for install-on-device support.
