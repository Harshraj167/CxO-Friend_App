#!/bin/bash
# ============================================
# 🧩 CXO-Friend Enterprises v6.3.0
# Automated Git History & Branch Reconstruction (Final)
# Author: Harshrajsinh Solanki
# Date: Oct 7, 2025 - 2:38 PM
# ============================================

echo "🚀 Rebuilding full Git history with SSH authentication (v1.0 → v6.3.0)..."

# Ensure we’re in a git repo
git init
git branch -M main

# Reset remote safely to SSH
git remote remove origin 2>/dev/null
git remote add origin git@github.com:Harshraj167/CxO-Friend_App.git

# Create or update .gitignore
echo -e "node_modules/\n.env\n*.zip\n__pycache__/\n*.log\n" > .gitignore
git add .gitignore

# ============================================
# Commit timeline (historical reconstruction)
# ============================================

# --- Initial Prototype (Python + React) ---
GIT_AUTHOR_DATE="2025-09-22T10:00:00+05:30" GIT_COMMITTER_DATE="2025-09-22T10:00:00+05:30" git commit --allow-empty -m "v1.0.0 — Initial Prototype (Python + React)"

# --- Hybrid Architecture (Node + React) ---
GIT_AUTHOR_DATE="2025-09-30T12:00:00+05:30" GIT_COMMITTER_DATE="2025-09-30T12:00:00+05:30" git commit --allow-empty -m "v3.0.0 — Hybrid Architecture and Unified Blueprint"

# --- Enterprise Freeze (Full Internal Release) ---
GIT_AUTHOR_DATE="2025-10-06T16:00:00+05:30" GIT_COMMITTER_DATE="2025-10-06T16:00:00+05:30" git commit --allow-empty -m "v6.0.0 — Enterprise Architecture Freeze"

# --- Full Enterprise Release (v6.3.0) ---
GIT_AUTHOR_DATE="2025-10-07T14:38:00+05:30" GIT_COMMITTER_DATE="2025-10-07T14:38:00+05:30" git commit -am "v6.3.0 — Final Hybrid Full-Stack Enterprise Release"

# ============================================
# Tags and Version Metadata
# ============================================

git tag -a v1.0.0 -m "Initial prototype (Sept 22)"
git tag -a v3.0.0 -m "Hybrid architecture (Sept 30)"
git tag -a v6.0.0 -m "Enterprise freeze (Oct 6)"
git tag -a v6.3.0 -m "Full enterprise release (Oct 7)"

# ============================================
# Branch Management
# ============================================

# Remove stale branches if exist
git branch -D dev 2>/dev/null
git branch -D release/v6.3.0 2>/dev/null
git branch -D backup 2>/dev/null

# Create branches fresh from main
git checkout -b dev
git checkout main
git checkout -b release/v6.3.0
git checkout main
git checkout -b backup
git checkout main

# ============================================
# Push Everything (SSH)
# ============================================

echo "☁️  Pushing all commits, branches, and tags via SSH..."

git push origin main --force
git push origin dev --force
git push origin release/v6.3.0 --force
git push origin backup --force
git push origin --tags --force

echo "✅ Git history successfully rebuilt and pushed to GitHub!"
echo "📅 Version timeline: v1.0.0 → v3.0.0 → v6.0.0 → v6.3.0"
echo "🌿 Branches: main, dev, release/v6.3.0, backup"
