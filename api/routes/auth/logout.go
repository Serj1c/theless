package auth

import (
	"fmt"
	"net/http"
)

func logout(w http.ResponseWriter, _ *http.Request) {
	_, _ = fmt.Fprintf(w, "Logout endpoint")
}
