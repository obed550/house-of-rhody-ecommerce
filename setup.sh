#!/bin/bash

# 🚀 House of Rhody - Local Setup Script

echo "🏠 House of Rhody E-Commerce Setup"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js 18+ from nodejs.org"
  exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Failed to install dependencies"
  exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "📝 Creating .env.local from .env.example..."
  cp .env.example .env.local
  echo "⚠️  Please update .env.local with your database connection string"
else
  echo "✅ .env.local already exists"
fi

echo ""
echo "🗄️  Setting up database..."
echo ""
echo "Make sure PostgreSQL is running, then run:"
echo ""
echo "  npm run db:migrate"
echo "  npm run db:seed"
echo ""
echo "✅ Setup complete! Ready to run:"
echo ""
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
