package locations

import (
	"github.com/globalsign/mgo/bson"
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/routes/locations/events"
	"github.com/varkadov/theless/api/store"
)

type Location struct {
	Id           bson.ObjectId `json:"id" bson:"_id"`
	Name         string        `json:"name" bson:"name"`
	NameLocative string        `json:"nameLocative" bson:"nameLocative"`
	Slug         string        `json:"slug" bson:"slug"`
}

type Router struct {
	db *store.Store
}

func New(db *store.Store) *Router {
	return &Router{db: db}
}

func (router *Router) Router() chi.Router {
	r := chi.NewRouter()

	r.Get("/current", router.getCurrent)

	r.Mount("/{locationSlug}/events", events.New(router.db).Router())

	return r
}
