# 🏠 House of Rhody - Quick Start Guide

## ✅ Verified Setup Checklist

### Prerequisites
- ✅ Node.js 18+
- ✅ PostgreSQL 12+
- ✅ Git

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

**Update `.env.local` with:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/house_of_rhody"
JWT_SECRET="your_super_secret_key_at_least_32_characters_long_here"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Step 3: Setup Database
```bash
# Run migrations
npm run db:migrate

# Seed with Rhoda admin account
npm run db:seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🔐 Admin Login (RESTRICTED)

**Only Rhoda can access admin panel:**

- **Phone:** `0599861653`
- **Password:** `RHODA@`
- **Access:** http://localhost:3000/login → http://localhost:3000/admin

**Security Features:**
- ✅ Single authorized admin (Rhoda only)
- ✅ Admin login hidden from audit logs
- ✅ JWT token authentication
- ✅ Protected routes with middleware
- ✅ Password hashed with bcrypt

---

## 🛍️ Demo Customer Login

**For testing customer features:**

- **Phone:** `+2348123456789`
- **Password:** `demo123`
- **Access:** Browse products → Add to cart → Checkout

---

## 📱 Available Pages

- **Home:** http://localhost:3000
- **Shop:** http://localhost:3000/shop
- **Login:** http://localhost:3000/login
- **Admin Dashboard:** http://localhost:3000/admin (Rhoda only)
- **Prisma Studio:** `npx prisma studio`

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:migrate      # Create database migration
npm run db:seed         # Seed initial data (Rhoda admin + products)
npm run db:studio       # Open Prisma Studio GUI

# Production
npm run build           # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list                 # macOS

# Or use Docker
docker run --name house-of-rhody-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=house_of_rhody \
  -p 5432:5432 -d postgres:15
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Port 3000 already in use"
```bash
PORT=3001 npm run dev
```

### "Prisma migration failed"
```bash
npx prisma migrate reset  # Reset database (deletes data!)
npm run db:seed            # Re-seed
```

---

## 🔒 Production Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string (32+ chars)
- [ ] Update `DATABASE_URL` to production database
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (required for secure cookies)
- [ ] Configure domain name
- [ ] Setup email notifications (optional)
- [ ] Enable rate limiting on API routes
- [ ] Setup monitoring/error tracking (Sentry)
- [ ] Regular database backups enabled
- [ ] CORS configured correctly

---

## 📊 Database Schema

**Users**
- Rhoda (Admin)
- Demo customers
- Production customers

**Products**
- Kids, Women, Men, Teens, Plus Size, Adults categories
- 10+ seed products with images & pricing

**Orders**
- Customer orders
- Order items (product + quantity)
- Payment tracking
- Status management (PENDING → PAID → SHIPPED → DELIVERED)

**Audit Logs**
- ✅ Customer login tracking
- ❌ Admin login tracking (HIDDEN)
- Product/order changes

---

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
git push origin main
# Then connect at https://vercel.com
```

### Railway
```bash
# Connect GitHub repo at https://railway.app
# Add PostgreSQL plugin
# Deploy automatically on push
```

### Docker + Custom Server
```bash
docker build -t house-of-rhody .
docker run -p 3000:3000 house-of-rhody
```

---

## 💡 Tips

- Admin dashboard refreshes automatically
- Cart persists in localStorage
- All passwords are hashed with bcrypt
- Demo mode works without Paystack/Twilio keys
- Environment variables are required (check .env.example)

---

## 📞 Support

If something breaks:
1. Check error message in terminal
2. Verify `.env.local` is correct
3. Ensure PostgreSQL is running
4. Run `npm install` again
5. Check logs in browser console (F12)

---

**Ready to launch? Run `npm run dev` now!** 🚀
