# House of Rhody - Premium Fashion Ecommerce

> A complete, production-ready clothing store with admin dashboard, SMS OTP verification, and multi-payment integration.

## 🎨 Features

### Customer Storefront
- ✨ Luxury brand design (gold, cream, navy, blush)
- 🛍️ Product catalog with filtering by category
- 👤 User signup with SMS OTP verification
- 🛒 Shopping cart with persistent storage
- 💳 Secure checkout with multiple payment methods
- 📦 Order tracking and status updates
- 📱 Mobile-responsive design
- ⚡ PWA installable app support

### Admin Dashboard
- 📊 Sales analytics and KPIs
- 📦 Product management (CRUD)
- 📋 Order management and tracking
- 👥 Customer management
- ⚙️ Payment settings (Paystack, Stripe, Flutterwave)
- 📈 Real-time statistics

### Payment Integration
- 💳 Paystack (primary)
- 🏦 Stripe
- 🌊 Flutterwave
- 💰 PayPal
- 🏧 Bank transfer

### Authentication
- 📱 SMS OTP verification via Twilio
- 🔐 JWT-based authentication
- 🔑 Secure password hashing
- 👨‍💼 Role-based access control (Admin/User)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Twilio account (for SMS)
- Paystack account (for payments)

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/yourusername/house-of-rhody.git
   cd house-of-rhody
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your credentials:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/house_of_rhody"
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_..."
   PAYSTACK_SECRET_KEY="sk_test_..."
   TWILIO_ACCOUNT_SID="your_sid"
   TWILIO_AUTH_TOKEN="your_token"
   JWT_SECRET="your_secret_key"
   ```

3. **Setup database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start development**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## 📂 Project Structure

```
house-of-rhody/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── shop/             # Product listing
│   ├── product/          # Product detail
│   ├── checkout/         # Checkout flow
│   ├── cart/             # Shopping cart
│   ├── signup/           # User registration
│   ├── login/            # User login
│   └── context/          # React context (cart)
├── components/           # Reusable components
├── lib/
│   ├── prisma.ts        # Database client
│   ├── auth.ts          # Auth utilities
│   ├── payments.ts      # Payment utilities
│   └── twilio.ts        # SMS utilities
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── public/              # Static assets
└── DEPLOYMENT.md        # Deployment guide
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify SMS OTP
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create order
- `GET /api/admin/orders` - List all orders (admin)

### Payments
- `POST /api/payments/paystack` - Initialize Paystack payment
- `POST /api/payments/paystack/verify` - Verify payment

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/settings` - Update settings

## 🎯 Default Credentials

**Admin Account:**
- Phone: `+2348000000000`
- Password: `admin123`

**Demo Customer:**
- Phone: `+2348123456789`
- Password: `demo123`

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Vercel + EdgeOne setup
- Railway deployment
- Docker containerization
- Environment configuration
- Production checklist

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: JWT, Twilio SMS
- **Payments**: Paystack, Stripe, Flutterwave
- **Styling**: Tailwind CSS with custom brand colors
- **PWA**: Web App Manifest, Service Worker ready

## 📱 Brand Colors

```css
--gold: #C9A227
--yellow: #F4D35E
--cream: #F7F1E7
--blush: #EFC9D1
--brown: #4A2E1F
--navy: #0E1B2A
```

## 🔐 Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ Environment variables for secrets
- ✅ SQL injection prevention (Prisma)
- ✅ CORS configured
- ✅ Rate limiting ready
- ✅ OTP expiry (5 minutes)

## 📊 Database Schema

- **User**: Customers and admin
- **Product**: Clothing items
- **Category**: Product categories
- **Order**: Customer orders
- **OrderItem**: Items in each order
- **Payment**: Payment records
- **Address**: Delivery addresses

## 🚀 Performance

- Next.js server-side rendering
- Image optimization with Next.js Image
- Database query optimization with Prisma
- Redis-ready session storage
- CDN-compatible asset structure
- PWA for offline capability

## 📝 License

MIT License - feel free to use for commercial projects.

## 🤝 Support

For issues or questions:
1. Check DEPLOYMENT.md
2. Review API documentation in code
3. Check Twilio, Paystack, and Prisma docs

## 🎉 Ready to Launch

Your House of Rhody store is production-ready. Deploy to Vercel, Railway, or your preferred host and start selling!
