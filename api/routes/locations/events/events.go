package events

import (
	"github.com/globalsign/mgo/bson"
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/store"
	"time"
)

type Location struct {
	Name string `json:"name" bson:"name"`
	Slug string `json:"slug" bson:"slug"`
}

type EventItem struct {
	Id          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Slug        string        `json:"slug" bson:"slug"`
	Location    Location      `json:"location" bson:"location"`
	Name        string        `json:"name" bson:"name"`
	Address     string        `json:"address" bson:"address"`
	Description string        `json:"description,omitempty" bson:"description"`
	Coords      []float32     `json:"coordinates,omitempty" bson:"coordinates"`
	DateStart   time.Time     `json:"dateStart" bson:"dateStart"`
	DateEnd     time.Time     `json:"dateEnd" bson:"dateEnd"`
	Cover       string        `json:"cover" bson:"cover"`
	Link        string        `json:"link" bson:"link"`
	IsFavorite  bool          `json:"isFavorite" bson:"isFavorite"`
}

type Router struct {
	db *store.Store
}

func New(db *store.Store) *Router {
	return &Router{
		db: db,
	}
}

func (router *Router) Router() chi.Router {
	r := chi.NewRouter()

	r.Get("/{eventSlug}", router.getItem)

	return r
}
