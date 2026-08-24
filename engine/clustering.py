import numpy as np
import umap
import hdbscan
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any

class PersonaClusterer:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        """
        Initializes the clustering engine. 
        Loads a lightweight, fast sentence-transformer for generating document embeddings.
        """
        self.model = SentenceTransformer(model_name)

    def discover_personas(self, documents: List[str], min_cluster_size: int = 3) -> Dict[str, Any]:
        """
        Takes raw documents (e.g. Zendesk tickets, interview transcripts), embeds them, 
        reduces dimensionality, and automatically groups them into distinct 'Personas'.
        """
        if not documents:
            return {"personas": [], "outliers": []}
            
        if len(documents) < min_cluster_size:
            # Not enough data to form meaningful clusters
            return {
                "personas": [{"id": "p0", "size": len(documents), "docs": documents}],
                "outliers": []
            }

        # 1. Generate Embeddings (High-dimensional space, e.g., 384 dims)
        print(f"Embedding {len(documents)} documents...")
        embeddings = self.model.encode(documents)

        # 2. Dimensionality Reduction (UMAP)
        # Reduce to a lower dimensional space (e.g. 5D) to help HDBSCAN find dense clusters
        print("Running UMAP dimensionality reduction...")
        n_neighbors = min(15, max(len(documents) - 1, 2))
        reducer = umap.UMAP(
            n_neighbors=n_neighbors, 
            n_components=5, 
            metric='cosine',
            random_state=42
        )
        reduced_embeddings = reducer.fit_transform(embeddings)

        # 3. Density-Based Clustering (HDBSCAN)
        # Does not force every point into a cluster; identifies noise/outliers (-1)
        print("Running HDBSCAN clustering...")
        clusterer = hdbscan.HDBSCAN(
            min_cluster_size=min_cluster_size,
            min_samples=1,
            metric='euclidean'
        )
        labels = clusterer.fit_predict(reduced_embeddings)

        # 4. Group documents by their discovered cluster
        clusters = {}
        outliers = []

        for i, label in enumerate(labels):
            doc = documents[i]
            if label == -1:
                outliers.append(doc)
            else:
                cluster_id = f"persona_{label}"
                if cluster_id not in clusters:
                    clusters[cluster_id] = []
                clusters[cluster_id].append(doc)

        # Format output
        personas = []
        for p_id, docs in clusters.items():
            personas.append({
                "id": p_id,
                "size": len(docs),
                "docs": docs
            })

        print(f"Discovered {len(personas)} personas. {len(outliers)} documents marked as noise.")

        return {
            "personas": personas,
            "outliers": outliers
        }
