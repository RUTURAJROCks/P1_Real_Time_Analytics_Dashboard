# 🚀 Deployment Guide: Render + Vercel

This guide walks you through deploying the Real-Time Analytics Dashboard.

---

## Prerequisites

1. **GitHub account** with repository pushed
2. **Render account** — [render.com](https://render.com) (free)
3. **Vercel account** — [vercel.com](https://vercel.com) (free)

---

## Step 1: Push to GitHub

First, ensure your code is on GitHub:

```bash
cd /Users/ruturaj/Desktop/Deccpprev/Projects_DEC/P1TAD
git init
git add .
git commit -m "Initial commit: Real-Time Analytics Dashboard"
git branch -M main
git remote add origin https://github.com/RUTURAJROCks/P1_Real_Time_Analytics_Dashboard.git
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

### 2.1 Create Account & Login
1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended for easy repo access)

### 2.2 Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### 2.3 Connect Repository
1. Click **"Connect a repository"**
2. If prompted, authorize Render to access your GitHub
3. Find and select **`P1_Real_Time_Analytics_Dashboard`**
4. Click **"Connect"**

### 2.4 Configure Service
Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | `segment-tree-api` (or any name) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Docker` (auto-detected from Dockerfile) |

### 2.5 Instance Type
- Select **"Free"** tier (0.5 CPU, 512 MB RAM)
- ⚠️ Free tier sleeps after 15 min inactivity

### 2.6 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for build
3. Once deployed, copy your URL:
   - Example: `https://segment-tree-api.onrender.com`

### 2.7 Test API
Open in browser:
```
https://segment-tree-api.onrender.com/api/health
```
Should return: `{"status":"healthy","tree_type":"segment_tree"}`

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Create Account & Login
1. Go to [vercel.com](https://vercel.com)
2. Click **"Start Deploying"**
3. Sign up with GitHub

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **`P1_Real_Time_Analytics_Dashboard`** in the list
3. Click **"Import"**

### 3.3 Configure Project
| Field | Value |
|-------|-------|
| **Project Name** | `segment-tree-dashboard` |
| **Framework Preset** | `Vite` (auto-detected) |
| **Root Directory** | Click "Edit" → enter `frontend` |

### 3.4 Environment Variables (IMPORTANT!)
1. Expand **"Environment Variables"**
2. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://segment-tree-api.onrender.com` (your Render URL)
3. Click **"Add"**

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Get your live URL:
   - Example: `https://segment-tree-dashboard.vercel.app`

---

## Step 4: Update CORS (Optional but Recommended)

If you get CORS errors, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://segment-tree-dashboard.vercel.app",  # Add your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Then push to GitHub — Render will auto-redeploy.

---

## Step 5: Update README with Live URLs

Edit `README.md`:

```markdown
## 🚀 Live Demo

- **Frontend**: [segment-tree-dashboard.vercel.app](https://segment-tree-dashboard.vercel.app)
- **Backend API**: [segment-tree-api.onrender.com](https://segment-tree-api.onrender.com)
```

---

## Troubleshooting

### "Disconnected" in Dashboard
- Render free tier sleeps after 15 min
- First request after sleep takes ~30 seconds
- Solution: Wait or upgrade to paid tier

### CORS Errors
- Add your Vercel URL to `allow_origins` in `main.py`
- Push changes to GitHub

### Build Failed on Render
- Check logs in Render dashboard
- Ensure `Dockerfile` and `requirements.txt` are in `backend/`

### Build Failed on Vercel
- Ensure `Root Directory` is set to `frontend`
- Check if `VITE_API_URL` is set correctly

---

## Summary

| Platform | What | URL Pattern |
|----------|------|-------------|
| **Render** | FastAPI Backend | `https://your-app.onrender.com` |
| **Vercel** | React Frontend | `https://your-app.vercel.app` |

🎉 **Congratulations!** Your Segment Tree Dashboard is now live!
