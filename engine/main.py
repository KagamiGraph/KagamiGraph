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

from clustering import PersonaClusterer

# Initialize the clustering engine (loads the local embedding model)
clusterer = PersonaClusterer()

class IngestionRequest(BaseModel):
    project_id: str
    documents: list[str]
    min_cluster_size: int = 3

@app.post("/api/v1/ai/ingest")
def ingest_data(request: IngestionRequest):
    """
    Ingests raw customer data (interviews, tickets) and automatically extracts Personas
    using Vector Embeddings + UMAP Dimensionality Reduction + HDBSCAN Clustering.
    """
    if not request.documents:
        return {"status": "error", "message": "No documents provided"}
        
    print(f"Ingesting project {request.project_id}...")
    
    # 1 & 2 & 3. Run the ML pipeline to discover personas
    results = clusterer.discover_personas(
        documents=request.documents, 
        min_cluster_size=request.min_cluster_size
    )
    
    # In a full implementation, we would now:
    # 1. Use an LLM to automatically generate a "Summary Description" of each persona cluster
    # 2. Store the embeddings in Qdrant for the LangGraph agents to query later
    
    return {
        "status": "success",
        "message": f"Successfully processed {len(request.documents)} documents.",
        "project_id": request.project_id,
        "discovered_personas_count": len(results["personas"]),
        "outliers_count": len(results["outliers"]),
        "personas": results["personas"]
    }

@app.post("/api/v1/ai/simulate")
def run_simulation(request: SimulationRequest):
    # This is where we will hook up LangGraph and our local LLM (e.g., Llama 3)
    # 1. Retrieve persona context from Qdrant
    # 2. Run LangGraph reflection agents
    # 3. Return grounded response
    
    return {
        "status": "success",
        "response": f"Simulated response for {request.persona_id} based on {len(request.context_data)} grounded data points.",
        "citations": []
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
