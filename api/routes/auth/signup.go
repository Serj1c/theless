package auth

import (
	"fmt"
	"net/http"
)

func signup(w http.ResponseWriter, _ *http.Request) {
	_, _ = fmt.Fprintf(w, "Signup endpoint")
}