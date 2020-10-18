package locations

import (
	"encoding/json"
	"fmt"
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

// getCurrent return current user position
func getCurrent(w http.ResponseWriter, r *http.Request) {
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
