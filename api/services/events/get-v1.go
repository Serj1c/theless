package events

import (
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

type GetV1Params struct {
	Id        string `json:"id,omitempty"`
	EventSlug string `json:"eventSlug,omitempty"`
}

type GetV1Reply struct {
	Item EventItem   `json:"item"`
	List []EventItem `json:"list"`
}

func (e *EventService) GetV1(_ *http.Request, params *GetV1Params, reply *GetV1Reply) error {
	id := params.Id
	eventSlug := params.EventSlug

	// Find by id
	if bson.IsObjectIdHex(id) {
		return config.EventsCollection.FindId(bson.ObjectIdHex(id)).One(reply)
	}

	fields := bson.M{
		"address": 1, "cover": 1, "dateStart": 1, "dateEnd": 1, "name": 1,
		"slug": 1, "location": 1, "description": 1,
		"coordinates": 1, "link": 1,
	}

	// Getting event item
	err := config.EventsCollection.Find(
		FindQuery{Slug: eventSlug},
	).Select(fields).One(&reply.Item)

	if err != nil {
		return err
	}

	// Getting list of other events
	query := bson.M{
		"date": bson.M{"$gte": time.Now()}, "slug": bson.M{"$ne": reply.Item.Slug},
	}
	fields = bson.M{
		"address": 1, "cover": 1, "dateStart": 1, "dateEnd": 1, "name": 1,
		"slug": 1, "location": 1,
	}

	// Getting other events
	return config.EventsCollection.Find(query).Select(fields).Limit(3).Sort("dateStart").All(&reply.List)
}

type FindQuery struct {
	Slug string `bson:"slug"`
}
