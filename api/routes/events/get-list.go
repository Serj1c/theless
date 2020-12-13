package events

import (
	"encoding/json"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"github.com/varkadov/theless/api/config"
	"net/http"
	"strconv"
	"time"
)

func (router *Router) getList(w http.ResponseWriter, r *http.Request) {
	from := r.URL.Query().Get("from")
	to := r.URL.Query().Get("to")
	limit := r.URL.Query().Get("limit")
	userId := r.Context().Value("userId")

	l, err := strconv.Atoi(limit)
	if err != nil {
		l = 10
	}

	// TODO add validation fields

	events := make([]EventItem, 0)
	match := bson.M{}

	if from == "" {
		match["dateEnd"] = bson.M{"$gte": time.Now()}
	} else {
		match["dateEnd"] = bson.M{"$gte": from}
	}

	if to != "" {
		match["dateStart"] = bson.M{"$lte": to}
	}

	stageMatch := bson.M{
		"$match": match,
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

	// https://stackoverrun.com/ru/q/11086567
	stageSort := bson.M{
		"$sort": bson.M{
			"dateStart": 1,
		},
	}

	stageLimit := bson.M{
		"$limit": l,
	}

	stageProject := bson.M{
		"$project": bson.M{
			"address":    1,
			"cover":      1,
			"dateEnd":    1,
			"dateStart":  1,
			"name":       1,
			"slug":       1,
			"location":   1,
			"isFavorite": 1,
		},
	}

	pipe := []bson.M{
		stageMatch,
		stageSort,
		stageLimit,
		stageLookup,
		stageAddFields,
		stageProject,
	}

	// TODO Replace with Repository
	if err := config.EventsCollection.Pipe(pipe).All(&events); err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	if err := json.NewEncoder(w).Encode(&events); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func getUserId(userId interface{}) bson.ObjectId {
	if userId == nil {
		return bson.NewObjectId()
	}

	return bson.ObjectIdHex(fmt.Sprintf("%s", userId))
}
