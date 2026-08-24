package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
)

// corsMiddleware adds headers to allow Next.js studio to communicate with Go API
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Next.js port
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// proxyRequest creates a reverse proxy to the Python Engine
func proxyRequest(w http.ResponseWriter, r *http.Request, pythonEndpoint string) {
	// Read original request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}

	// Create new request to Python Worker
	proxyReq, err := http.NewRequest(r.Method, pythonEndpoint, bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Failed to create proxy request", http.StatusInternalServerError)
		return
	}

	// Copy headers
	proxyReq.Header.Set("Content-Type", r.Header.Get("Content-Type"))

	// Send request
	client := &http.Client{}
	resp, err := client.Do(proxyReq)
	if err != nil {
		http.Error(w, "Failed to reach Python AI Engine", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Copy Python response headers back to Next.js
	for k, v := range resp.Header {
		w.Header()[k] = v
	}
	w.WriteHeader(resp.StatusCode)

	// Stream Python response body back to Next.js
	io.Copy(w, resp.Body)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok","message":"KagamiGraph Go API Gateway is running"}`))
	})

	// Route to Python Data Ingestion & Clustering
	mux.HandleFunc("/api/v1/ingest", func(w http.ResponseWriter, r *http.Request) {
		proxyRequest(w, r, "http://localhost:8000/api/v1/ai/ingest")
	})

	// Route to Python LangGraph Simulation
	mux.HandleFunc("/api/v1/simulate", func(w http.ResponseWriter, r *http.Request) {
		proxyRequest(w, r, "http://localhost:8000/api/v1/ai/simulate")
	})

	// Wrap mux with CORS middleware
	handler := corsMiddleware(mux)

	port := ":8080"
	fmt.Printf("Starting KagamiGraph Go API Gateway on port %s\n", port)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
