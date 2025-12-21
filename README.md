# Real-Time Analytics Dashboard

A **Segment Tree-powered** analytics dashboard demonstrating O(log n) range queries for real-time server metrics monitoring. This project showcases how data structures from competitive programming can solve real-world problems in monitoring systems, similar to those used by Google Analytics, Cloudflare, and Bloomberg Terminal.

---

## Features

- **Real-time metrics** — CPU, Memory, Request tracking
- **O(log n) queries** — Powered by Segment Trees
- **Time range slider** — 1 to 60 minutes
- **Dark mode** — Toggle between light/dark themes
- **Sound effects** — Audio feedback on interactions
- **Documentation page** — Learn about Segment Trees

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS (CDN) |
| Charts | Recharts |
| Backend | FastAPI (Python) |
| Data Structure | Segment Tree |

See [Techstack.md](./Techstack.md) for detailed explanations.

---

## Local Development

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



## How It Works

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

## Project Structure

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

## License

MIT License - feel free to use for learning!

---

## Acknowledgments

Built as part of a deep-dive into Segment Trees for real-world applications.
