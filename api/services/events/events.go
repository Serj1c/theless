package events

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type EventItem struct {
	Id           bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Slug         string        `json:"slug" bson:"slug"`
	Location     Location      `json:"location" bson:"location"`
	Name         string        `json:"name" bson:"name"`
	Address      string        `json:"address" bson:"address"`
	Description  string        `json:"description,omitempty" bson:"description"`
	Coords       []float32     `json:"coordinates,omitempty" bson:"coordinates"`
	Date         time.Time     `json:"date" bson:"date"`
	Cover        string        `json:"cover" bson:"cover"`
}

type Location struct {
	Name string `json:"name" bson:"name"`
	Slug string `json:"slug" bson:"slug"`
}

type EventService struct{}
