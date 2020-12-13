package events

import (
	"encoding/json"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/config"
	"net/http"
)

// getItem return list of events for the location
func (router *Router) getItem(w http.ResponseWriter, r *http.Request) {
	locationSlug := chi.URLParam(r, "locationSlug")
	eventSlug := chi.URLParam(r, "eventSlug")
	userId := r.Context().Value("userId")

	event := &EventItem{}

	fmt.Printf("user id: %+v\n", userId)

	stageMatch := bson.M{
		"$match": bson.M{
			"slug":          eventSlug,
			"location.slug": locationSlug,
		},
	}

	stageLookup := bson.M{
		"$lookup": bson.M{
			"from": "favorites",
			"let": bson.M{
				"eventId": "$_id",
			},
			"pipeline": []bson.M{
				{
					"$match": bson.M{
						// FIXME Improve implementation when there is not userId
						"userId": getUserId(userId),
						"entities": bson.M{
							"$elemMatch": bson.M{
								"type": "event",
							},
						},
						"$expr": bson.M{
							"$in": []string{"$$eventId", "$entities.id"},
						},
					},
				},
			},
			"as": "isFavorite",
		},
	}

	stageLimit := bson.M{
		"$limit": 1,
	}

	stageAddFields := bson.M{
		"$addFields": bson.M{
			"isFavorite": bson.M{
				"$cond": bson.M{
					"if": bson.M{
						"$size": "$isFavorite",
					},
					"then": true,
					"else": false,
				},
			},
		},
	}

	stageProject := bson.M{
		"$project": bson.M{
			"address":     1,
			"cover":       1,
			"dateStart":   1,
			"dateEnd":     1,
			"name":        1,
			"slug":        1,
			"location":    1,
			"description": 1,
			"coordinates": 1,
			"link":        1,
			"isFavorite":  1,
		},
	}

	pipe := []bson.M{
		stageMatch,
		stageLimit,
		stageLookup,
		stageAddFields,
		stageProject,
	}

	if err := config.EventsCollection.Pipe(pipe).One(&event); err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	fmt.Printf("%+v\n", event)

	if err := json.NewEncoder(w).Encode(&event); err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}

// FIXME Find and remove duplicates
func getUserId(userId interface{}) bson.ObjectId {
	if userId == nil {
		return bson.NewObjectId()
	}

	return bson.ObjectIdHex(fmt.Sprintf("%s", userId))
}
