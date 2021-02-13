package auth

import (
	"encoding/json"
	"net/http"
)

type SignupPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Errors struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupResponse struct {
	Error  string `json:"error,omitempty"`
	Errors *Errors `json:"errors,omitempty"`
}

func (router *Router) signup(w http.ResponseWriter, r *http.Request) {
	payload := SignupPayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// TODO Implement sign up here

	w.WriteHeader(http.StatusNoContent)
}
