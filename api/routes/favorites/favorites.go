package favorites

import (
	"github.com/go-chi/chi"
	"github.com/gorilla/sessions"
	"github.com/varkadov/theless/api/store"
)

type Router struct {
	db      *store.Store
	session *sessions.CookieStore
}

func New(db *store.Store, session *sessions.CookieStore) *Router {
	return &Router{
		db: db,
		session: session,
	}
}

func (router *Router) Router() chi.Router {
	r := chi.NewRouter()

	r.Post("/", router.add)
	r.Get("/", router.getList)

	return r
}
