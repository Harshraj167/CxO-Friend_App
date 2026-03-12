# CxO-Friend Production Deployment Guide

To deploy the Anti-Gravity Edition (v6.5.1), you need to set up the following environment variables in your hosting providers.

## 1. Vercel (Frontend)
When importing the repository into Vercel, it should automatically detect the `vercel.json` and `app/frontend/dist` output directory. 

**Required Environment Variables in Vercel:**
- `VITE_API_URL`: The public URL of your Render backend (e.g., `https://cxo-api-gateway.onrender.com/api`)
- `VITE_SOCKET_URL`: The public URL of your Render backend (same as above but without `/api`)

## 2. Render (Backend & Python Orchestrator)
Inside the Render dashboard, click "New -> Blueprint" and connect this GitHub repository. Render will read the `render.yaml` file and automatically provision the Node.js Gateway, Python Orchestrator, and a PostgreSQL database.

**Required Environment Variables in Render (Environment Group):**
- `PERPLEXITY_API_KEY`: Your paid Perplexity API key.
- `OPENROUTER_KEY_1`: Your primary OpenRouter API Key (e.g., Mistral/Mixtral).
- `OPENROUTER_KEY_2`: A secondary OpenRouter API key for the 0-1-0-1 load balancer fallback.
- `FRONTEND_URL`: The public URL given to you by Vercel for CORS validation.

*(Note: `DATABASE_URL`, `INTERNAL_SERVICE_KEY`, and internal networking configurations are automatically handled by the `render.yaml` bindings).*
