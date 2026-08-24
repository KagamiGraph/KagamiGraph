# KagamiGraph (鏡)

**KagamiGraph** is a high-fidelity, open-source Bring-Your-Own-Data (BYOD) synthetic persona engine.

It allows you to instantly generate highly accurate, simulated human focus groups grounded strictly in your own proprietary behavioral data (Zendesk tickets, Gong transcripts, Mixpanel events). By leveraging **Graph-RAG** and Multi-Agent Reflection, KagamiGraph eliminates LLM "hallucinations" by perfectly mirroring the true sentiment of your user base and providing transparent, clickable citations for every synthetic response.

## 🏗 Architecture

KagamiGraph is built as a polyglot monorepo optimized for extreme scale and AI performance:

*   **`studio/`** (Frontend): Next.js web dashboard for a seamless "no-code" persona building experience.
*   **`api/`** (Gateway): High-throughput Go API gateway handling authentication, routing, and real-time streaming.
*   **`engine/`** (AI Worker): Python microservice running FastAPI, LangGraph for agent orchestration, and UMAP/HDBSCAN for automatic persona clustering.
*   **Database:** PostgreSQL (Relational) + Qdrant (Vector DB/Graph-RAG).

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Compose
*   Go 1.21+
*   Python 3.10+
*   Node.js 18+

### Running Locally

1. **Start the Databases**
   ```bash
   docker-compose up -d
   ```

2. **Start the Engine (Python)**
   ```bash
   cd engine
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

3. **Start the API (Go)**
   ```bash
   cd api
   go run main.go
   ```

4. **Start the Studio (Next.js)**
   ```bash
   cd studio
   npm install
   npm run dev
   ```

## 📜 License

KagamiGraph is open-source and licensed under the [GNU Affero General Public License v3.0 (AGPLv3)](LICENSE). 

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our feature workflow, branching strategies, and codebase standards.
