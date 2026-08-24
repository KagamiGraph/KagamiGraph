from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="KagamiGraph AI Worker",
    description="Python microservice for heavy AI computation, UMAP clustering, and LangGraph orchestration.",
    version="0.1.0"
)

class SimulationRequest(BaseModel):
    persona_id: str
    prompt: str
    context_data: list[str]

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "KagamiGraph Python AI Worker is running"}

class IngestionRequest(BaseModel):
    project_id: str
    documents: list[str]

@app.post("/api/v1/ai/ingest")
def ingest_data(request: IngestionRequest):
    # 1. Embed documents using SentenceTransformers
    # 2. Store in Qdrant Vector DB
    # 3. Run UMAP + HDBSCAN to discover personas
    return {
        "status": "success",
        "message": f"Ingested {len(request.documents)} documents. Discovered 3 personas.",
        "personas": [
            {"id": "p1", "description": "Frustrated Enterprise Admins"},
            {"id": "p2", "description": "Confused New Users"},
            {"id": "p3", "description": "Power Users Requesting Features"}
        ]
    }

@app.post("/api/v1/ai/simulate")
async def run_simulation(request: SimulationRequest):
    from agent import agent_app
    
    # Initialize the LangGraph state
    initial_state = {
        "persona_id": request.persona_id,
        "question": request.prompt,
        "persona_context": "",
        "reflection": "",
        "response": "",
        "messages": []
    }
    
    # Run the graph (this triggers retrieve -> reflect -> respond)
    final_state = await agent_app.ainvoke(initial_state)
    
    return {
        "status": "success",
        "response": final_state["response"],
        "reflection": final_state["reflection"],
        "citations": ["Mock DB Row #1"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
