package middlewares

import (
	"context"
	"github.com/gorilla/sessions"
	"net/http"
)

const (
	sessionName = "session_id"
)

func Session(sessionStore sessions.Store) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			session, err := sessionStore.Get(r, sessionName)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			userId := session.Values["userId"]
			if userId != nil {
				r = r.WithContext(context.WithValue(r.Context(), "userId", userId))
			}

			next.ServeHTTP(w, r)
		})
	}
}
