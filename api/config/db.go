package config

import (
	"gopkg.in/mgo.v2"
)

var DB *mgo.Database

var EventsCollection *mgo.Collection
var ItemCollection *mgo.Collection
var LocationsCollection *mgo.Collection
var SubscriptionsCollection *mgo.Collection
var NewEventCollection *mgo.Collection

func init() {
	connectionString := "mongodb://db:27017/less"

	s, err := mgo.Dial(connectionString)

	if err != nil {
		panic(err)
	}

	DB = s.DB("less")

	EventsCollection = DB.C("events")
	ItemCollection = DB.C("items")
	LocationsCollection = DB.C("locations")
	SubscriptionsCollection = DB.C("subscriptions")
	NewEventCollection = DB.C("new-events")
}
