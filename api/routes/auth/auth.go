package auth

import "github.com/go-chi/chi"

func Router() chi.Router {
	r := chi.NewRouter()

	r.Post("/login", login)
	r.Post("/logout", logout)
	r.Post("/signup", signup)
	r.Post("/reset-password", resetPassword)

	return r
}
