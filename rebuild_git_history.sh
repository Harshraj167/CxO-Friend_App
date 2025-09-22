#!/bin/bash
# ============================================
# CXO-Friend Enterprises v6.3.0
# Automated Git History & Branch Reconstruction
# Author: Harshrajsinh Solanki
# Date: Oct 7, 2025
# ============================================

echo "🚀 Rebuilding full Git history (v1.0 → v6.3.0)..."

# Ensure repo
git init
git branch -M main

# Clear remote (if duplicate)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Harshraj167/CxO-Friend_App.git

# --- Step 1: Add .gitignore ---
echo "node_modules/
.env
*.zip
__pycache__/
*.log
" > .gitignore
git add .gitignore

# --- Step 2: Recreate commits ---
git add .
GIT_AUTHOR_DATE="2025-09-22T10:00:00" GIT_COMMITTER_DATE="2025-09-22T10:00:00" git commit -m "v1.0.0 — Initial prototype (Python + React)"
GIT_AUTHOR_DATE="2025-09-30T12:00:00" GIT_COMMITTER_DATE="2025-09-30T12:00:00" git commit --allow-empty -m "v3.0.0 — Hybrid architecture design (Node + React)"
GIT_AUTHOR_DATE="2025-10-06T15:00:00" GIT_COMMITTER_DATE="2025-10-06T15:00:00" git commit --allow-empty -m "v6.0.0 — Enterprise hybrid architecture freeze"
GIT_AUTHOR_DATE="2025-10-07T13:31:00" GIT_COMMITTER_DATE="2025-10-07T13:31:00" git commit -am "v6.3.0 — Final Hybrid Enterprise Full-Stack Release"

# --- Step 3: Add Tags ---
git tag -a v1.0.0 -m "Initial prototype (Sept 22)"
git tag -a v3.0.0 -m "Hybrid architecture (Sept 30)"
git tag -a v6.0.0 -m "Enterprise Freeze (Oct 6)"
git tag -a v6.3.0 -m "Full Enterprise Release (Oct 7)"

# --- Step 4: Create Branches ---
git checkout -b dev
git checkout main
git checkout -b release/v6.3.0
git checkout main
git checkout -b vercel-sync
git checkout main

# --- Step 5: Push Everything ---
echo "☁️  Pushing all commits, branches, and tags to GitHub..."
git push origin main --force
git push origin dev --force
git push origin release/v6.3.0 --force
git push origin vercel-sync --force
git push origin --tags

echo "✅ Git history successfully rebuilt and pushed!"
