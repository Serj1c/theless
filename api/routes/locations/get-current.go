package locations

import (
	"encoding/json"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"github.com/varkadov/theless/api/config"
	"net/http"
)

// getCurrent return current user position
func (router *Router) getCurrent(w http.ResponseWriter, _ *http.Request) {
	location := Location{}

	err := config.LocationsCollection.Find(bson.M{}).One(&location)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	str, err := json.Marshal(location)

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	_, _ = fmt.Fprintf(w, string(str))
}
