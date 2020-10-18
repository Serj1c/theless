package main

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/varkadov/theless/api/routes/auth"
	"github.com/varkadov/theless/api/routes/events"
	"github.com/varkadov/theless/api/routes/locations"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.SetHeader("Content-Type", "application/json"))

	r.Mount("/auth", auth.Router())
	r.Mount("/locations", locations.Router())
	r.Mount("/events", events.Router())

	err := http.ListenAndServe(":"+port, r)

	if err != nil {
		log.Fatal(err)
	}
}
