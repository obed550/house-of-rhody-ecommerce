FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build app
RUN npm run build

EXPOSE 3000

# Start
CMD ["npm", "start"]
