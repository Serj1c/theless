package events

import (
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

type GetListV1Params struct {
	From  time.Time `json:"from"`
	Till  time.Time `json:"till"`
	Limit int       `json:"limit"`
}

func (e *EventService) GetListV1(
	_ *http.Request,
	params *GetListV1Params,
	reply *[]EventItem,
) error {
	dateQuery := bson.M{}

	if params.From.IsZero() {
		dateQuery["$gte"] = time.Now()
	} else {
		dateQuery["$gte"] = params.From
	}

	if !params.Till.IsZero() {
		dateQuery["$lte"] = params.Till
	}

	query := bson.M{"dateEnd": dateQuery}
	fields := bson.M{
		"address":   1,
		"cover":     1,
		"dateStart": 1,
		"dateEnd":   1,
		"name":      1,
		"slug":      1,
		"location":  1,
	}

	return config.EventsCollection.Find(query).Select(fields).Limit(params.Limit).Sort("dateStart").All(reply)
}
