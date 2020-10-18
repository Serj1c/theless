package events

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// getItem return list of events for the location
func getItem(w http.ResponseWriter, r *http.Request) {
	locationSlug := chi.URLParam(r, "locationSlug")
	eventSlug := chi.URLParam(r, "eventSlug")

	event := &EventItem{}

	query := bson.M{"slug": eventSlug, "location.slug": locationSlug}
	selector := bson.M{
		"address": 1, "cover": 1, "dateStart": 1, "dateEnd": 1, "name": 1,
		"slug": 1, "location": 1, "description": 1, "coordinates": 1, "link": 1,
	}

	err := config.EventsCollection.Find(query).Select(selector).One(event)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	str, err := json.Marshal(event)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	_, _ = fmt.Fprintf(w, string(str))
}
