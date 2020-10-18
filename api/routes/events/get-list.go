package events

import (
	"encoding/json"
	"fmt"
	"github.com/varkadov/theless/api/config"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strconv"
	"time"
)

func getList(w http.ResponseWriter, r *http.Request) {
	from := r.URL.Query().Get("from")
	to := r.URL.Query().Get("to")
	limit := r.URL.Query().Get("limit")

	// TODO add validation fields

	event := make([]EventItem, 0)
	query := bson.M{}

	if from == "" {
		query["dateEnd"] = bson.M{"$gte": time.Now()}
	} else {
		query["dateEnd"] = bson.M{"$gte": from}
	}

	if to != "" {
		query["dateStart"] = bson.M{"$lte": to}
	}

	fields := bson.M{"address": 1, "cover": 1, "dateEnd": 1, "dateStart": 1, "name": 1, "slug": 1, "location": 1}

	l, err := strconv.Atoi(limit)

	if err != nil {
		l = 10
	}

	err = config.EventsCollection.Find(query).Select(fields).Limit(l).Sort("dateStart").All(&event)

	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	str, err := json.Marshal(event)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, _ = fmt.Fprintf(w, string(str))
}
