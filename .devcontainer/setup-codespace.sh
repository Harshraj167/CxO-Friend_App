#!/bin/bash
# ============================================
# 🧩 CxO-Friend Codespaces Automated Setup
# ============================================

echo "🚀 Booting up PostgreSQL container in Codespaces..."
docker run --name cxo-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cxofriend -p 5432:5432 -d postgres:15

# Wait for Postgres to initialize
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "📦 Installing core Monorepo dependencies..."
npm install -g pnpm
pnpm install

echo "🗄️ Setting up database schemas and seeds..."
# Generate Prisma Client
pnpm db:generate

# Execute migration (resetting db safely if dev container restarts)
pnpm db:migrate

# Seed demo organizations and default keys
pnpm db:seed

echo "🐍 Setting up Python AI Orchestrator environment..."
cd services/ai-orchestrator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../..

echo "✅ Codespaces setup complete! Run 'pnpm dev' to start all services concurrently."
