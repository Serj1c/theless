package auth

import (
	"fmt"
	"net/http"
)

func resetPassword(w http.ResponseWriter, _ *http.Request) {
	_, _ = fmt.Fprintf(w, "Reset password endpoint")
}
