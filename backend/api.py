from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.agents.synthesis_agent import SynthesisAgent
from backend.memory.mem0 import Mem0

app = FastAPI()

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mem0 = Mem0()
agent = SynthesisAgent(mem0)

@app.get("/api/recommendations")
def get_recommendations():
    try:
        return agent.execute_task("synthesize")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommendations/{symbol}")
def get_recommendation(symbol: str):
    try:
        return agent.synthesize_data(symbol)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e)) 