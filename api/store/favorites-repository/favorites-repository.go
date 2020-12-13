package favoritesRepository

import (
	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

const (
	collectionName = "favorites"
)

type FavoritesRepository struct {
	db         *mgo.Database
	collection *mgo.Collection
}

func New(db *mgo.Database) *FavoritesRepository {
	return &FavoritesRepository{
		db:         db,
		collection: db.C(collectionName),
	}
}

func (r *FavoritesRepository) Add(userId bson.ObjectId, entityId bson.ObjectId, entityType string) error {
	selector := bson.M{
		"userId": userId,
	}
	update := bson.M{
		"$addToSet": bson.M{
			"entities": bson.M{
				"id":   entityId,
				"type": entityType,
			},
		},
	}
	_, err := r.collection.Upsert(selector, update)

	return err
}

func (r *FavoritesRepository) Remove(userId bson.ObjectId, entityId bson.ObjectId, entityType string) error {
	selector := bson.M{
		"userId": userId,
	}
	update := bson.M{
		"$pull": bson.M{
			"entities": bson.M{
				"id":   entityId,
				"type": entityType,
			},
		},
	}

	_, err := r.collection.Upsert(selector, update)

	return err
}
