package auth

import (
	"encoding/json"
	"net/http"
)

type loginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Error string `json:"error,omitempty"`
}

func (router *Router) login(w http.ResponseWriter, r *http.Request) {
	payload := loginPayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// TODO Implement auth here

	w.WriteHeader(http.StatusNoContent)
}
