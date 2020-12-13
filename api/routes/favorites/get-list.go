package favorites

import (
	"encoding/json"
	"net/http"
)

func (router *Router) getList(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId")

	list, err := router.db.Favorites().GetList(userId)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(list); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
