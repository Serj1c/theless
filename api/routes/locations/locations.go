package locations

import (
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/routes/locations/events"
	"gopkg.in/mgo.v2/bson"
)

type Location struct {
	Id           bson.ObjectId `json:"id" bson:"_id"`
	Name         string        `json:"name" bson:"name"`
	NameLocative string        `json:"nameLocative" bson:"nameLocative"`
	Slug         string        `json:"slug" bson:"slug"`
}

func Router() chi.Router {
	r := chi.NewRouter()

	r.Get("/current", getCurrent)

	r.Mount("/{locationSlug}/events", events.Router())

	return r
}
