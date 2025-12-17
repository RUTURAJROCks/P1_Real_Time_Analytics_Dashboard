from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from segment_tree import MetricsEngine
import random
import asyncio

app = FastAPI(title="Segment Tree Metrics API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines for different metrics
cpu_engine = MetricsEngine(3600)
memory_engine = MetricsEngine(3600)
requests_engine = MetricsEngine(3600)

@app.get("/api/metrics")
def get_metrics(
    metric: str = Query(..., description="cpu, memory, or requests"),
    start: int = Query(60, description="Start offset in seconds"),
    end: int = Query(0, description="End offset in seconds")
):
    """Query metrics for a time range."""
    engines = {
        'cpu': cpu_engine,
        'memory': memory_engine,
        'requests': requests_engine
    }
    engine = engines.get(metric)
    if not engine:
        return {"error": "Unknown metric"}
    
    return engine.query_range(start, end)

@app.get("/api/health")
def health():
    return {"status": "healthy", "tree_type": "segment_tree"}

# Background task to simulate metrics
async def generate_metrics():
    while True:
        cpu_engine.add_metric(random.uniform(20, 80))
        memory_engine.add_metric(random.uniform(30, 90))
        requests_engine.add_metric(random.randint(100, 1000))
        await asyncio.sleep(1)

@app.on_event("startup")
async def startup():
    asyncio.create_task(generate_metrics())
