#!/usr/bin/env bash
echo "Setting up CXO-Friend..."
npm install --prefix app/backend
npm install --prefix app/frontend
npx prisma generate --schema app/backend/prisma/schema.prisma
echo "Setup complete!"
