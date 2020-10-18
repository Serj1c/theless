package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type loginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Email   string `json:"email"`
	Message string `json:"message,omitempty"`
}

func login(w http.ResponseWriter, r *http.Request) {
	payload := loginPayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res := loginResponse{
		Email:   payload.Email,
		Message: "Hello, world!",
	}

	str, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, _ = fmt.Fprintf(w, string(str))
}
