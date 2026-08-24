package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Response standard API response
type Response struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func main() {
	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{
			Message: "KagamiGraph API Gateway is running",
			Status:  "ok",
		})
	})

	// Placeholder for AI routing
	mux.HandleFunc("/api/v1/simulate", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		// Here we would make a gRPC or HTTP call to the Python AI worker
		json.NewEncoder(w).Encode(Response{
			Message: "Simulation request received. Routing to Python AI Worker...",
			Status:  "processing",
		})
	})

	port := ":8080"
	fmt.Printf("Starting KagamiGraph Go API Gateway on port %s\n", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
