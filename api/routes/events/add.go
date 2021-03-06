package events

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/varkadov/theless/api/config"
	"github.com/varkadov/theless/api/libs/slack"
	"gopkg.in/go-playground/validator.v9"
)

type addPayload struct {
	Name        string    `json:"name" bson:"name" validate:"required"`
	Date        string    `json:"date" bson:"date" validate:"required"`
	Address     string    `json:"address" bson:"address" validate:"required"`
	Contacts    string    `json:"contacts" bson:"contacts" validate:"required"`
	Description string    `json:"description" bson:"description" validate:"required"`
	Notes       string    `json:"notes" bson:"note"`
	Added       time.Time `bson:"added"`
}

type AddV1Reply struct{}

var errorMessages = map[string]map[string]string{
	"Name": {
		"required": "Введите название события",
	},
	"Date": {
		"required": "Введите дату события",
	},
	"Address": {
		"required": "Введите адрес проведения события",
	},
	"Contacts": {
		"required": "Введите контакты ответственного лица",
	},
	"Description": {
		"required": "Введите краткое описание события",
	},
}

func (router *Router) add(w http.ResponseWriter, r *http.Request) {
	payload := addPayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	// Request decoding error
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	validate := validator.New()

	err = validate.Struct(payload)

	// Form validation failure
	if err != nil {
		// Common validation error
		if _, ok := err.(*validator.InvalidValidationError); ok {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Fields validation error
		data := map[string]string{}

		for _, err := range err.(validator.ValidationErrors) {
			data[strings.ToLower(err.Field())] = errorMessages[err.Field()][err.Tag()]
		}

		str, err := json.Marshal(data)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		_, _ = fmt.Fprintf(w, "%s", str)
		return
	}

	// Saving to the DB
	payload.Added = time.Now()

	err = config.NewEventCollection.Insert(payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if os.Getenv("ENV") != "development" {
		// Send notification to the Slack
		slack.SendMessage("New event added \"" + payload.Name + "\"")
	}

	w.WriteHeader(http.StatusNoContent)
}
