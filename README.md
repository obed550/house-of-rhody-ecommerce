# 🏠 House of Rhody E-Commerce Platform

## Overview

A premium e-commerce platform for **House of Rhody**, selling fashion for all ages and family sizes.

- 👗 Women, Men, Kids, Teens, Plus Size, Adults
- 💳 Payment integration (Paystack)
- 📱 Responsive mobile-first design
- 🔐 Secure admin panel (Rhoda only)
- 📊 Order & customer management
- 🎨 Modern UI with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd house-of-rhody-ecommerce
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your database connection

# 3. Setup database
npm run db:migrate
npm run db:seed  # Creates Rhoda admin + demo products

# 4. Run development server
npm run dev
```

Open **http://localhost:3000**

---

## 🔐 Login Credentials

### Admin Access (RESTRICTED - Rhoda Only)
- **Phone:** `0599861653`
- **Password:** `RHODA@`
- **URL:** http://localhost:3000/admin

### Demo Customer
- **Phone:** `+2348123456789`
- **Password:** `demo123`

---

## 📊 Admin Dashboard Features

✅ **Dashboard Stats**
- Total sales revenue
- Orders today
- Total customers
- Paid vs pending orders

✅ **Recent Orders Table**
- Order tracking
- Customer details
- Payment status
- Order dates

✅ **Security**
- Only Rhoda can access
- Admin logins hidden from audit logs
- JWT token authentication
- Protected routes with middleware

---

## 🛍️ Customer Features

- Browse products by category
- Add to cart functionality
- Cart persistence (localStorage)
- Checkout flow
- Order history
- Profile management

---

## 📁 Project Structure

```
house-of-rhody-ecommerce/
├── app/
│   ├── admin/              # Admin dashboard (protected)
│   ├── api/
│   │   ├── auth/          # Login/signup
│   │   └── admin/         # Admin endpoints
│   ├── login/             # Login page
│   ├── shop/              # Products listing
│   ├── context/           # Cart context
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/
│   ├── auth.ts           # JWT & password hashing
│   ├── prisma.ts         # Database client
│   └── payments.ts       # Paystack integration
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Initial data
├── middleware.ts          # Route protection
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── QUICK_START.md         # Setup guide
```

---

## 🛠️ Available Commands

```bash
# Development
npm run dev           # Start dev server on :3000
npm run build         # Build for production
npm start             # Start production server

# Database
npm run db:migrate    # Create/run migrations
npm run db:seed       # Seed initial data
npm run db:studio     # Open Prisma Studio GUI

# Code Quality
npm run lint          # ESLint checks
```

---

## 🔒 Security Features

✅ **Authentication**
- JWT token-based (7-day expiry)
- Bcrypt password hashing
- Secure HTTP-only cookies

✅ **Authorization**
- Role-based access (ADMIN/USER)
- Rhoda is the only admin
- Protected admin routes
- Middleware validation

✅ **Audit Logging**
- Customer login tracking
- Order/payment events
- **Admin logins hidden** (privacy)

✅ **Data Protection**
- Prisma ORM (SQL injection prevention)
- Environment variables for secrets
- Encrypted passwords

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
git push origin main
# Connect at https://vercel.com
# Auto-deploy on every push
```

### Railway
- Connect GitHub repo
- Add PostgreSQL plugin
- Auto-deploy on push

### Docker
```bash
docker build -t house-of-rhody .
docker run -p 3000:3000 house-of-rhody
```

---

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL, Prisma ORM
- **Auth:** JWT, Bcrypt
- **Payments:** Paystack
- **SMS:** Twilio (optional)
- **Hosting:** Vercel, Railway, Docker

---

## 📝 Environment Variables

See `.env.example` for all required variables:

```env
DATABASE_URL="..."
JWT_SECRET="..."
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="..."
PAYSTACK_SECRET_KEY="..."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
```

---

## 🐛 Troubleshooting

**Cannot connect to database?**
```bash
# Make sure PostgreSQL is running
docker run -p 5432:5432 postgres:15 &
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Need to reset database?**
```bash
npx prisma migrate reset
npm run db:seed
```

---

## 📞 Support

For issues or questions:
1. Check `.env.local` is configured
2. Verify PostgreSQL is running
3. Check browser console (F12) for errors
4. Review logs in terminal

---

## 📄 License

Private - House of Rhody

---

**Built with ❤️ for House of Rhody**  
*Premium Fashion for Every Age*
