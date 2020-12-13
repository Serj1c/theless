package favorites

import (
	"encoding/json"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"github.com/varkadov/theless/api/models"
	"net/http"
)

type addPayload struct {
	Id     string `json:"id"`
	Type   string `json:"type"`
	Action string `json:"action"`
}

func (router *Router) add(w http.ResponseWriter, r *http.Request) {
	payload := &addPayload{}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// TODO Add validation

	userId := r.Context().Value("userId")
	var uid bson.ObjectId

	// Creating new user and session
	if userId == nil {
		u := &models.User{}

		if err := router.db.User().Create(u); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// FIXME Improve: start
		session, err := router.session.New(r, "session_id")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		session.Options.HttpOnly = true
		session.Options.Secure = true
		session.Options.SameSite = http.SameSiteStrictMode
		session.Values["userId"] = u.Id.Hex()

		if err := router.session.Save(r, w, session); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// FIXME Improve: end

		uid = u.Id
	} else {
		uid = bson.ObjectIdHex(fmt.Sprintf("%v", userId))
	}

	entityId := bson.ObjectIdHex(payload.Id)
	entityType := payload.Type
	action := payload.Action
	data := map[string]interface{}{}

	if action == "remove" {
		if err := router.db.Favorites().Remove(uid, entityId, entityType); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data["isFavorite"] = false
	} else {
		if err := router.db.Favorites().Add(uid, entityId, entityType); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data["isFavorite"] = true
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
