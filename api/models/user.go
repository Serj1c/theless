package models

import (
	"github.com/globalsign/mgo/bson"
	"time"
)

type User struct {
	Id      bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Email   string        `bson:"email"`
	Created time.Time     `bson:"create"`
}
