package main

import (
	"github.com/globalsign/mgo"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gorilla/sessions"
	"github.com/varkadov/theless/api/middlewares"
	"github.com/varkadov/theless/api/routes/auth"
	"github.com/varkadov/theless/api/routes/events"
	"github.com/varkadov/theless/api/routes/favorites"
	"github.com/varkadov/theless/api/routes/locations"
	"github.com/varkadov/theless/api/store"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	db, err := newDB()

	if err != nil {
		log.Fatal(err)
	}

	dbStore := store.New(db)

	// TODO Pass key
	sessionStore := sessions.NewCookieStore([]byte("xxx"))

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middlewares.Session(sessionStore))
	r.Use(middleware.SetHeader("Content-Type", "application/json"))

	r.Mount("/auth", auth.New(dbStore).Router())
	r.Mount("/events", events.New(dbStore).Router())
	r.Mount("/favorites", favorites.New(dbStore, sessionStore).Router())
	r.Mount("/locations", locations.New(dbStore).Router())

	err = http.ListenAndServe(":"+port, r)

	if err != nil {
		log.Fatal(err)
	}
}

func newDB() (*mgo.Database, error) {
	// TODO use connection string from config
	session, err := mgo.Dial("mongodb://db:27017")

	if err != nil {
		return nil, err
	}

	// TODO use db from config
	db := session.DB("less")

	return db, nil
}
