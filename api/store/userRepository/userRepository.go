package userRepository

import (
	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/varkadov/theless/api/models"
	"time"
)

const (
	collectionName = "users"
)

type UserRepository struct {
	db         *mgo.Database
	collection *mgo.Collection
}

// New create new user repository
func New(db *mgo.Database) *UserRepository {
	return &UserRepository{
		db:         db,
		collection: db.C(collectionName),
	}
}

// Create new user in DB
func (r *UserRepository) Create(u *models.User) error {
	if u.Id == "" {
		u.Id = bson.NewObjectId()
	}

	u.Created = time.Now()

	return r.collection.Insert(u)
}

// FindById user by id
func (r *UserRepository) FindById(id int) (*models.User, error) {
	u := &models.User{}
	query := bson.M{"_id": id}
	selector := bson.M{"_id": 1, "email": 1}

	err := r.collection.Find(query).Select(selector).One(u)
	if err != nil {
		return nil, err
	}

	return u, nil
}
