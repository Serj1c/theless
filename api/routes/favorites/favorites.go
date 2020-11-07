package favorites

import "github.com/go-chi/chi"

func Router() chi.Router {
	r := chi.NewRouter()

	r.Post("/", favoriteAdd)

	return r
}
