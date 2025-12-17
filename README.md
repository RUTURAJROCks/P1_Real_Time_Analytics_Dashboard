# 🌲 Real-Time Analytics Dashboard

A **Segment Tree-powered** analytics dashboard for real-time server metrics monitoring.

![Dashboard Preview](/Users/ruturaj/.gemini/antigravity/brain/176ce32c-a73f-4175-94d2-e5bfe6202466/dashboard_light_mode_1765947320827.png)

## 🚀 Live Demo

- **Frontend**: [your-app.vercel.app](https://your-app.vercel.app) *(update after deployment)*
- **Backend API**: [your-api.onrender.com](https://your-api.onrender.com) *(update after deployment)*

---

## ✨ Features

- **Real-time metrics** — CPU, Memory, Request tracking
- **O(log n) queries** — Powered by Segment Trees
- **Time range slider** — 1 to 60 minutes
- **Dark mode** — Toggle between light/dark themes
- **Sound effects** — Audio feedback on interactions
- **Documentation page** — Learn about Segment Trees

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS (CDN) |
| Charts | Recharts |
| Backend | FastAPI (Python) |
| Data Structure | Segment Tree |

See [Techstack.md](./Techstack.md) for detailed explanations.

---

## 📦 Local Development

### Prerequisites
- Node.js 18+
- Python 3.10+

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

### Backend (Render)
1. Push to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service → Connect repo
4. Root directory: `backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Root directory: `frontend`
4. Add environment variable:
   - `VITE_API_URL` = `https://your-api.onrender.com`
5. Deploy

---

## 📖 How It Works

### Segment Tree Performance
| Operation | Naive Array | Segment Tree |
|-----------|-------------|--------------|
| Range Sum | O(n) | **O(log n)** |
| Range Max/Min | O(n) | **O(log n)** |
| Point Update | O(1) | O(log n) |

For 3600 data points (1 hour):
- Naive: 3600 operations per query
- Segment Tree: ~12 operations per query

---

## 📁 Project Structure

```
P1TAD/
├── backend/
│   ├── segment_tree.py    # Segment Tree implementation
│   ├── main.py            # FastAPI application
│   ├── Dockerfile         # Container config
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── MetricsDashboard.jsx
│   │   └── DocumentationPage.jsx
│   └── index.html
├── render.yaml            # Render blueprint
├── Techstack.md           # Tech explanations
└── README.md              # This file
```

---

## 📄 License

MIT License - feel free to use for learning!

---

## 🙏 Acknowledgments

Built as part of a deep-dive into Segment Trees for real-world applications.
