package locations

import (
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

type Params interface{}

func (l *LocationService) GetCurrentV1(r *http.Request, params *Params, reply *Location) error {
	return config.LocationsCollection.Find(bson.M{}).One(reply)
}
