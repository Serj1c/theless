package auth

import (
	"github.com/go-chi/chi"
	"github.com/varkadov/theless/api/store"
)

type Router struct {
	db *store.Store
}

func New(db *store.Store) *Router {
	return &Router{
		db: db,
	}
}

func (router *Router) Router() chi.Router {
	r := chi.NewRouter()

	r.Post("/login", router.login)
	r.Post("/logout", router.logout)
	r.Post("/signup", router.signup)
	r.Post("/reset-password", router.resetPassword)

	return r
}
