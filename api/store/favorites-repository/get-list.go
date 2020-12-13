package favoritesRepository

import (
	"fmt"
	"github.com/globalsign/mgo/bson"
	"time"
)

type Location struct {
	Name string `json:"name" bson:"name"`
	Slug string `json:"slug" bso:"slug"`
}

type ListItem struct {
	Id         bson.ObjectId `json:"id" bson:"_id"`
	Slug       string        `json:"slug" bson:"slug"`
	Location   Location      `json:"location" bson:"location"`
	Name       string        `json:"name" bson:"name"`
	Address    string        `json:"address" bson:"address"`
	Cover      string        `json:"cover" bson:"cover"`
	DateStart  time.Time     `json:"dateStart" bson:"dateStart"`
	DateEnd    time.Time     `json:"dateEnd" bson:"dateEnd"`
	IsFavorite bool          `json:"isFavorite" bson:"isFavorite"`
}

func (r *FavoritesRepository) GetList(userId interface{}) (*[]ListItem, error) {
	list := make([]ListItem, 0)

	if userId == nil {
		return &list, nil
	}

	pipe := []bson.M{
		{
			"$match": bson.M{
				"userId": bson.ObjectIdHex(fmt.Sprintf("%v", userId)),
				"entities": bson.M{
					"$elemMatch": bson.M{
						"type": "event",
					},
				},
			},
		},
		{
			"$lookup": bson.M{
				"from":         "events",
				"localField":   "entities.id",
				"foreignField": "_id",
				"as":           "events",
			},
		},
		{
			"$unwind": bson.M{
				"path": "$events",
			},
		},
		{
			"$replaceRoot": bson.M{
				"newRoot": "$events",
			},
		},
		{
			"$addFields": bson.M{
				"isFavorite": true,
			},
		},
		{
			"$sort": bson.M{
				"dateStart": 1,
			},
		},
	}

	if err := r.collection.Pipe(pipe).All(&list); err != nil {
		// TODO Do it better
		return &list, nil
	}

	return &list, nil
}
