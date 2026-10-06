# House of Rhody - Deployment Guide

## Deployment Options

### Option 1: Vercel + EdgeOne (Recommended)

#### Frontend (Vercel)

1. **Connect GitHub**
   - Push your code to GitHub
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Import the project

2. **Configure environment variables**
   In Vercel dashboard, go to Settings > Environment Variables and add:
   ```
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx
   PAYSTACK_SECRET_KEY=sk_live_xxx
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_FROM_NUMBER=+your_number
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys on every push

#### Database (PostgreSQL)

1. **Use Vercel Postgres** or **Railway**

   **Railway option:**
   - Go to https://railway.app
   - Create new PostgreSQL database
   - Copy DATABASE_URL
   - Add to Vercel environment variables

2. **Run migrations**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

#### EdgeOne CDN

1. **Connect domain to EdgeOne**
   - Register domain or transfer existing
   - Configure DNS to point to EdgeOne
   - EdgeOne automatically caches images and assets

2. **Cache rules**
   - Cache static images: `/public/*`
   - Cache product images: `/uploads/*`
   - Bypass cache for API: `/api/*`

### Option 2: Docker + AWS/Google Cloud

1. **Build Docker image**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY . .
   RUN npm install
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy to AWS ECS or Google Cloud Run**
   - Push Docker image to container registry
   - Deploy to ECS/Cloud Run
   - Connect to RDS PostgreSQL or Cloud SQL

### Option 3: Railway (Simplified)

1. **Connect GitHub**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"

2. **Add PostgreSQL**
   - Add PostgreSQL plugin
   - Railway auto-connects DATABASE_URL

3. **Deploy**
   - Push to GitHub
   - Railway auto-deploys

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Prisma seed data loaded
- [ ] Twilio SMS enabled and tested
- [ ] Paystack live keys configured
- [ ] SSL certificate installed
- [ ] CORS configured for API
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Error monitoring (Sentry) setup
- [ ] Domain configured
- [ ] Email notifications setup
- [ ] Admin user created
- [ ] PWA manifest updated with production URL

## Quick Start Commands

```bash
# Install dependencies
npm install

# Setup database
DATABASE_URL=postgresql://user:pass@host/db npx prisma migrate dev

# Seed database
DATABASE_URL=postgresql://user:pass@host/db npx prisma db seed

# Build
npm run build

# Start production
NODE_ENV=production npm start

# Development
npm run dev
```

## Environment Variables (Production)

Create `.env.production.local`:

```env
NEXT_PUBLIC_APP_NAME="House of Rhody"
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"

DATABASE_URL="postgresql://user:pass@host:5432/db"

JWT_SECRET="your_super_secure_secret_key_min_32_chars"
JWT_EXPIRES_IN="7d"

TWILIO_ACCOUNT_SID="your_sid"
TWILIO_AUTH_TOKEN="your_token"
TWILIO_FROM_NUMBER="+1234567890"

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_xxx"
PAYSTACK_SECRET_KEY="sk_live_xxx"

NODE_ENV="production"
```

## Troubleshooting

### Database connection fails
- Check DATABASE_URL format
- Verify firewall allows connections
- Test with: `psql $DATABASE_URL`

### SMS not sending
- Verify Twilio credentials
- Check phone number format (+country_code)
- View Twilio logs

### Paystack payment fails
- Use test keys first
- Check amount is in kobo (multiply by 100)
- Verify email is valid

## Performance Optimization

1. **Enable caching**
   - Set Cache-Control headers
   - Use Redis for sessions
   - Cache product data

2. **Image optimization**
   - Use Next.js Image component
   - Compress images with ImageMagick
   - Serve via CDN

3. **Database optimization**
   - Add indexes on frequently queried fields
   - Use connection pooling
   - Monitor slow queries

## Monitoring

- **Error tracking**: Sentry
- **Performance**: Vercel Analytics
- **Logs**: Vercel Logs or CloudWatch
- **Uptime**: Pingdom or UptimeRobot
