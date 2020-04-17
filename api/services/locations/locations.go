package locations

import "gopkg.in/mgo.v2/bson"

type Location struct {
	Id           bson.ObjectId `json:"id" bson:"_id"`
	Name         string        `json:"name" bson:"name"`
	NameLocative string        `json:"nameLocative" bson:"nameLocative"`
	Slug         string        `json:"slug" bson:"slug"`
}

type LocationService struct {}
