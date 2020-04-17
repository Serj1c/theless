package main

import (
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	"github.com/varkadov/theless/api/services/events"
	"github.com/varkadov/theless/api/services/locations"
	"log"
	"net/http"
	"os"
)

func init() {
	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCodec(), "application/json")
	_ = s.RegisterService(new(locations.LocationService), "Locations")
	_ = s.RegisterService(new(events.EventService), "Events")
	http.Handle("/", s)
}

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	err := http.ListenAndServe(":"+port, nil)

	if err != nil {
		log.Fatal(err)
	}
}
