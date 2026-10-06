# House of Rhody - Setup & Deployment Guide

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (download from nodejs.org)
- PostgreSQL 12+ (download from postgresql.org or use Docker)
- Git
- A code editor (VSCode recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/obed550/house-of-rhody-ecommerce.git
cd house-of-rhody-ecommerce
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Create database
psql -U postgres
CREATE DATABASE house_of_rhody;
\q
```

**Option B: Docker (Recommended)**
```bash
docker run --name house-of-rhody-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=house_of_rhody -p 5432:5432 -d postgres:15
```

### Step 4: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/house_of_rhody"

# JWT
JWT_SECRET="your_super_secret_jwt_key_at_least_32_characters"
JWT_EXPIRES_IN="7d"

# Twilio (Optional - SMS OTP)
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
TWILIO_FROM_NUMBER="+1234567890"

# Paystack (Optional - Payments)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_your_key"
PAYSTACK_SECRET_KEY="sk_test_your_key"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Step 5: Setup Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed demo data
npx prisma db seed
```

### Step 6: Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 👤 Admin & Demo Credentials

### Admin Account (Full Access)
- **Phone**: `+2348000000000`
- **Password**: `admin123`
- **Access**: Dashboard, products, orders, payments

### Demo Customer Account
- **Phone**: `+2348123456789`
- **Password**: `demo123`
- **Access**: Browse, shop, checkout

### Second Demo Customer
- **Phone**: `+2348034567890`
- **Password**: `demo123`

---

## 🌐 Deployment to Production

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Setup Database (Railway)**
   - Go to https://railway.app
   - Create new PostgreSQL database
   - Copy DATABASE_URL

4. **Add Environment Variables in Vercel**
   - Go to your Vercel project Settings
   - Click Environment Variables
   - Add all variables from `.env.example`
   - Use production keys (Paystack live keys, etc.)

5. **Run Migrations**
   ```bash
   # In Vercel dashboard, go to Functions and add a one-time migration
   # Or run locally:
   VERCEL=true DATABASE_URL="your_prod_db" npx prisma migrate deploy
   VERCEL=true DATABASE_URL="your_prod_db" npx prisma db seed
   ```

### Option 2: Railway (Database + Hosting)

1. **Connect GitHub**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select this repository

2. **Add PostgreSQL Plugin**
   - Click "Add Plugin"
   - Select "PostgreSQL"
   - Railway auto-connects DATABASE_URL

3. **Add Environment Variables**
   - Click on your app
   - Go to Variables
   - Add all from `.env.example`

4. **Deploy**
   - Railway auto-deploys on every push
   - Database migrations run automatically

### Option 3: Docker + Render/Fly.io

**Build Docker Image**
```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

**Deploy to Render:**
1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repo
5. Add environment variables
6. Deploy

---

## 🔧 Useful Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npx prisma migrate dev        # Create new migration
npx prisma migrate deploy     # Deploy migrations (production)
npx prisma db seed            # Seed data
npx prisma studio             # Open database GUI

# Build & Production
npm run build                  # Build for production
npm start                      # Start production server

# Type checking
npx tsc --noEmit              # Check TypeScript errors

# Linting
npm run lint                   # Run ESLint
```

---

## 🔗 Important Links

**Local Development:**
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- Prisma Studio: http://localhost:5555 (when running `npx prisma studio`)

**External Services:**
- Paystack Dashboard: https://dashboard.paystack.com
- Twilio Console: https://www.twilio.com/console
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Prisma Docs: https://www.prisma.io/docs/

---

## 🐛 Troubleshooting

### "database error" on startup
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # macOS

# Or use Docker
docker ps  # See running containers
```

### "Cannot find module 'next'"
```bash
npm install  # Reinstall dependencies
```

### Prisma migration errors
```bash
npx prisma migrate reset  # Reset database (warning: deletes data)
npx prisma generate       # Regenerate Prisma client
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### SMS/Payments not working
- Check `.env.local` has correct credentials
- Verify Twilio/Paystack accounts are active
- Check Twilio logs at https://www.twilio.com/console
- Check Paystack logs at https://dashboard.paystack.com

---

## 📱 Testing Paystack in Test Mode

**Test Card Numbers:**
- Visa: `4111 1111 1111 1111`
- Mastercard: `5399 8101 9000 0000`
- Expiry: Any future date
- CVV: Any 3 digits

**Test OTP:** `123456` (when SMS is in demo mode)

---

## 🎯 Production Checklist

Before going live:

- [ ] Environment variables configured (production keys)
- [ ] Database migrations deployed
- [ ] Admin account created (not default)
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email notifications setup
- [ ] Error tracking (Sentry) enabled
- [ ] Analytics configured
- [ ] Backup strategy in place
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] Security headers added

---

## 📧 Support

For issues:
1. Check this guide
2. Check error logs in development
3. Review Prisma/Next.js documentation
4. Check Paystack/Twilio status pages

---

## 🚀 You're Ready!

Your House of Rhody store is ready to launch. Deploy confidently with:

```bash
# Final production build
npm run build
npm start
```

Happy selling! 🎉
