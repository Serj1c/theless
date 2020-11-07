package favorites

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type addPayload struct {
	Id     string `json:"id"`
	Type   string `json:"type"`
	Action string `json:"action"`
}

type addData struct {
	IsFavorite bool `json:"isFavorite"`
}

func favoriteAdd(w http.ResponseWriter, r *http.Request) {
	payload := addPayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	data := addData{IsFavorite: true}

	if payload.Action == "remove" {
		data.IsFavorite = false
	}

	str, err := json.Marshal(data)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	_, _ = fmt.Fprintf(w, string(str))
}
