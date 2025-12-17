# Tech Stack

This document explains the technology choices for the **Real-Time Analytics Dashboard** project.

---

## Frontend

### React (via Vite)
**Why React?**
- Component-based architecture for reusable UI elements
- Virtual DOM for efficient re-renders (critical for real-time updates)
- Large ecosystem and community support

**Why Vite?**
- Lightning-fast Hot Module Replacement (HMR)
- Native ES modules for instant dev server startup
- Optimized production builds with Rollup

### Tailwind CSS (CDN)
**Why Tailwind?**
- Utility-first approach for rapid prototyping
- Consistent design system out of the box
- Easy dark mode implementation with `dark:` variants

**Why CDN?**
- Zero configuration needed
- Ideal for learning projects and quick demos
- No build step required for styling

### Recharts
**Why Recharts?**
- Built specifically for React (declarative components)
- Responsive charts with `ResponsiveContainer`
- Smooth animations and transitions
- Lightweight compared to D3.js for common use cases

---

## Backend

### Python + FastAPI
**Why Python?**
- Clean, readable syntax ideal for data structures
- Rich ecosystem for data processing
- Excellent for implementing algorithms (Segment Trees)

**Why FastAPI?**
- Async support for handling concurrent requests
- Automatic OpenAPI documentation
- Type hints with Pydantic validation
- Modern Python 3.6+ features

### Uvicorn
**Why Uvicorn?**
- ASGI server for async Python apps
- High performance with uvloop
- Hot-reload for development (`--reload` flag)

---

## Core Data Structure

### Segment Tree
**Why Segment Tree?**

| Operation | Naive Array | Segment Tree |
|-----------|-------------|--------------|
| Range Query | O(n) | **O(log n)** |
| Point Update | O(1) | O(log n) |
| Range Update | O(n) | **O(log n)** with lazy propagation |

**Use Case in This Project:**
- Real-time aggregation of time-series metrics
- Instant computation of `sum`, `max`, `min`, `avg` over arbitrary time ranges
- Efficient updates as new data arrives every second

```
Example: 3600 data points (1 hour of second-level metrics)

Naive approach: 3600 operations per query
Segment Tree:   ~12 operations per query (log₂ 3600 ≈ 12)

Result: 300x faster queries!
```

---

## Project Structure

```
P1TAD/
├── backend/
│   ├── .venv/              # Python virtual environment
│   ├── segment_tree.py     # Segment Tree implementation
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main application
│   │   ├── MetricsDashboard.jsx  # Dashboard component
│   │   └── DocumentationPage.jsx # Documentation component
│   ├── public/
│   │   └── sounds/         # Sound effect files
│   └── index.html          # Entry point with Tailwind CDN
│
└── Techstack.md            # This file
```

---

## Why This Stack?

1. **Learning-Focused**: Technologies chosen to demonstrate real-world patterns
2. **Performance**: Segment Trees + async backend = efficient real-time system
3. **Modern Practices**: React hooks, FastAPI async, Tailwind utility classes
4. **Minimal Setup**: CDN-based styling, Vite scaffolding, virtual environments
